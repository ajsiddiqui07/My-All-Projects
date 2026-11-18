import os
import json
import platform
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login as auth_login, logout as auth_logout, update_session_auth_hash
from django.contrib.auth.models import User
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib import messages
from django.db.models import Count, Sum, Q
from django.core.paginator import Paginator
from django.core.management import call_command
from django.utils.http import url_has_allowed_host_and_scheme
from django.conf import settings
import django

from netflix_lite.models import Movie, MovieList
from .forms import (
    AdminLoginForm,
    MovieForm,
    UserCreateForm,
    UserEditForm,
    AdminUserPasswordForm,
    AdminProfileForm
)
from .decorators import superuser_required


# ==========================================
# 1. AUTHENTICATION VIEWS
# ==========================================

def admin_login(request):
    """
    Dedicated Admin Login view.
    Only allows active superusers to authenticate and enter the admin dashboard.
    """
    if request.user.is_authenticated and request.user.is_superuser:
        return redirect('admin_panel:dashboard')

    next_url = request.GET.get('next') or request.POST.get('next') or ''

    if request.method == 'POST':
        form = AdminLoginForm(request=request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user)

            # Handle Remember Me securely
            if form.cleaned_data.get('remember_me'):
                # 2 weeks session expiry
                request.session.set_expiry(1209600)
            else:
                # Browser close session expiry
                request.session.set_expiry(0)

            # Prevent open redirect vulnerabilities
            if next_url and url_has_allowed_host_and_scheme(url=next_url, allowed_hosts={request.get_host()}):
                messages.success(request, f"Welcome back, Administrator {user.username}!")
                return redirect(next_url)

            messages.success(request, f"Welcome to the Netflix Admin Dashboard, {user.username}!")
            return redirect('admin_panel:dashboard')
        else:
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, error)
    else:
        form = AdminLoginForm(request=request)

    context = {
        'form': form,
        'next': next_url,
    }
    return render(request, 'admin_panel/login.html', context)


@superuser_required
def admin_logout(request):
    """
    Safely terminates the administrator session and redirects to admin login.
    """
    auth_logout(request)
    messages.info(request, "You have been safely signed out of the Administrator Panel.")
    return redirect('admin_panel:login')


# ==========================================
# 2. DASHBOARD VIEW
# ==========================================

@superuser_required
def admin_dashboard(request):
    """
    Main Admin Dashboard displaying real-time metrics, analytics charts,
    recent items, and quick management shortcuts.
    """
    # Real metrics from Django DB
    total_movies = Movie.objects.count()
    total_users = User.objects.count()
    active_users = User.objects.filter(is_active=True).count()
    inactive_users = total_users - active_users
    total_views = Movie.objects.aggregate(t=Sum('movie_views'))['t'] or 0
    total_my_list = MovieList.objects.count()
    total_superusers = User.objects.filter(is_superuser=True).count()

    # Recent and Top records
    recent_movies = Movie.objects.order_by('-id')[:5]
    top_movies = Movie.objects.order_by('-movie_views')[:5]
    recent_users = User.objects.order_by('-date_joined')[:5]

    # Chart 1: Top 5 Movies by Views
    top_movies_labels = [m.title for m in top_movies]
    top_movies_views = [m.movie_views for m in top_movies]

    # Chart 2: Movies Count & Views by Genre
    genre_data = Movie.objects.values('genre').annotate(
        count=Count('id'),
        views=Sum('movie_views')
    ).order_by('-count')

    genre_dict = dict(Movie.GENRE_CHOICES)
    genre_labels = [genre_dict.get(g['genre'], g['genre'].title()) for g in genre_data]
    genre_counts = [g['count'] for g in genre_data]
    genre_views = [g['views'] or 0 for g in genre_data]

    # Serialize chart payload cleanly
    charts_json = json.dumps({
        'topMovies': {
            'labels': top_movies_labels,
            'views': top_movies_views
        },
        'genres': {
            'labels': genre_labels,
            'counts': genre_counts,
            'views': genre_views
        },
        'users': {
            'labels': ['Active Users', 'Inactive Users'],
            'data': [active_users, inactive_users]
        }
    })

    context = {
        'page_title': 'Dashboard Overview',
        'active_menu': 'dashboard',
        'total_movies': total_movies,
        'total_users': total_users,
        'active_users': active_users,
        'inactive_users': inactive_users,
        'total_views': total_views,
        'total_my_list': total_my_list,
        'total_superusers': total_superusers,
        'recent_movies': recent_movies,
        'top_movies': top_movies,
        'recent_users': recent_users,
        'charts_json': charts_json,
    }
    return render(request, 'admin_panel/dashboard.html', context)


# ==========================================
# 3. MOVIE MANAGEMENT VIEWS
# ==========================================

@superuser_required
def movie_list(request):
    """
    Displays paginated movies with search by title/synopsis, filter by genre,
    and sorting by title, views, length, or release date.
    """
    movies_qs = Movie.objects.all()

    # Search filter
    q = request.GET.get('q', '').strip()
    if q:
        movies_qs = movies_qs.filter(
            Q(title__icontains=q) | Q(description__icontains=q)
        )

    # Genre filter
    genre = request.GET.get('genre', '').strip()
    if genre:
        movies_qs = movies_qs.filter(genre=genre)

    # Sorting
    sort = request.GET.get('sort', '-id')
    valid_sorts = {
        'id_desc': '-id',
        'id_asc': 'id',
        'title_asc': 'title',
        'title_desc': '-title',
        'views_desc': '-movie_views',
        'views_asc': 'movie_views',
        'date_desc': '-release_date',
        'date_asc': 'release_date',
        'length_desc': '-length',
        'length_asc': 'length',
    }
    order_by = valid_sorts.get(sort, '-id')
    movies_qs = movies_qs.order_by(order_by)

    # Pagination: 8 per page
    paginator = Paginator(movies_qs, 8)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        'page_title': 'Movie Catalog Management',
        'active_menu': 'movies',
        'movies': page_obj,
        'q': q,
        'current_genre': genre,
        'current_sort': sort,
        'genre_choices': Movie.GENRE_CHOICES,
        'total_count': movies_qs.count(),
    }
    return render(request, 'admin_panel/movies/list.html', context)


@superuser_required
def movie_add(request):
    """
    Adds a new movie entry with card, cover, and video uploads.
    """
    if request.method == 'POST':
        form = MovieForm(request.POST, request.FILES)
        if form.is_valid():
            movie = form.save()
            messages.success(request, f"Movie '{movie.title}' created and published successfully!")
            return redirect('admin_panel:movie_list')
        else:
            messages.error(request, "Please resolve the validation errors shown below.")
    else:
        form = MovieForm()

    context = {
        'page_title': 'Add New Movie',
        'active_menu': 'movies_add',
        'form': form,
        'is_edit': False,
    }
    return render(request, 'admin_panel/movies/form.html', context)


@superuser_required
def movie_edit(request, pk):
    """
    Edits existing movie details and allows replacing card, cover, or video files.
    """
    movie = get_object_or_404(Movie, uu_id=pk)

    if request.method == 'POST':
        form = MovieForm(request.POST, request.FILES, instance=movie)
        if form.is_valid():
            movie = form.save()
            messages.success(request, f"Movie '{movie.title}' updated successfully!")
            return redirect('admin_panel:movie_list')
        else:
            messages.error(request, "Please resolve the validation errors shown below.")
    else:
        form = MovieForm(instance=movie)

    context = {
        'page_title': f"Edit Movie: {movie.title}",
        'active_menu': 'movies',
        'form': form,
        'movie': movie,
        'is_edit': True,
    }
    return render(request, 'admin_panel/movies/form.html', context)


@superuser_required
def movie_delete(request, pk):
    """
    Permanently deletes a movie entry after post confirmation.
    """
    movie = get_object_or_404(Movie, uu_id=pk)

    if request.method == 'POST':
        title = movie.title
        movie.delete()
        messages.success(request, f"Movie '{title}' was permanently deleted.")
        return redirect('admin_panel:movie_list')

    context = {
        'page_title': f"Confirm Deletion: {movie.title}",
        'active_menu': 'movies',
        'movie': movie,
    }
    return render(request, 'admin_panel/movies/delete_confirm.html', context)


@superuser_required
def movie_preview(request, pk):
    """
    Admin preview page showing full movie information, video playback,
    and cover art.
    """
    movie = get_object_or_404(Movie, uu_id=pk)
    saved_count = MovieList.objects.filter(movie=movie).count()

    context = {
        'page_title': f"Preview: {movie.title}",
        'active_menu': 'movies',
        'movie': movie,
        'saved_count': saved_count,
    }
    return render(request, 'admin_panel/movies/preview.html', context)


# ==========================================
# 4. USER MANAGEMENT VIEWS
# ==========================================

@superuser_required
def user_list(request):
    """
    Displays registered users with search, role filters, status filters,
    and sorting.
    """
    users_qs = User.objects.all()

    # Search
    q = request.GET.get('q', '').strip()
    if q:
        users_qs = users_qs.filter(
            Q(username__icontains=q) |
            Q(email__icontains=q) |
            Q(first_name__icontains=q) |
            Q(last_name__icontains=q)
        )

    # Filter by role
    role = request.GET.get('role', '').strip()
    if role == 'superuser':
        users_qs = users_qs.filter(is_superuser=True)
    elif role == 'staff':
        users_qs = users_qs.filter(is_staff=True, is_superuser=False)
    elif role == 'regular':
        users_qs = users_qs.filter(is_staff=False, is_superuser=False)

    # Filter by status
    status = request.GET.get('status', '').strip()
    if status == 'active':
        users_qs = users_qs.filter(is_active=True)
    elif status == 'inactive':
        users_qs = users_qs.filter(is_active=False)

    # Sort
    sort = request.GET.get('sort', '-date_joined')
    valid_sorts = {
        'date_desc': '-date_joined',
        'date_asc': 'date_joined',
        'login_desc': '-last_login',
        'login_asc': 'last_login',
        'username_asc': 'username',
        'username_desc': '-username',
    }
    order_by = valid_sorts.get(sort, '-date_joined')
    users_qs = users_qs.order_by(order_by)

    # Pagination: 10 per page
    paginator = Paginator(users_qs, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        'page_title': 'User Management',
        'active_menu': 'users',
        'users': page_obj,
        'q': q,
        'current_role': role,
        'current_status': status,
        'current_sort': sort,
        'total_count': users_qs.count(),
    }
    return render(request, 'admin_panel/users/list.html', context)


@superuser_required
def user_add(request):
    """
    Creates a new user account with secure password hashing.
    """
    if request.method == 'POST':
        form = UserCreateForm(request.POST)
        if form.is_valid():
            user = form.save()
            messages.success(request, f"User account '{user.username}' created successfully!")
            return redirect('admin_panel:user_list')
        else:
            messages.error(request, "Please fix the form errors below.")
    else:
        form = UserCreateForm()

    context = {
        'page_title': 'Add New User Account',
        'active_menu': 'users',
        'form': form,
        'is_edit': False,
    }
    return render(request, 'admin_panel/users/form.html', context)


@superuser_required
def user_edit(request, user_id):
    """
    Edits user details and permission flags with safeguards.
    """
    target_user = get_object_or_404(User, id=user_id)

    if request.method == 'POST':
        form = UserEditForm(
            request.POST,
            instance=target_user,
            current_admin=request.user
        )
        if form.is_valid():
            form.save()
            messages.success(request, f"User account '{target_user.username}' updated successfully.")
            return redirect('admin_panel:user_list')
        else:
            messages.error(request, "Please fix the validation errors below.")
    else:
        form = UserEditForm(instance=target_user, current_admin=request.user)

    context = {
        'page_title': f"Edit User: {target_user.username}",
        'active_menu': 'users',
        'form': form,
        'target_user': target_user,
        'is_edit': True,
    }
    return render(request, 'admin_panel/users/form.html', context)


@superuser_required
def user_change_password(request, user_id):
    """
    Resets a user's password using Django's password validation.
    """
    target_user = get_object_or_404(User, id=user_id)

    if request.method == 'POST':
        form = AdminUserPasswordForm(request.POST, user=target_user)
        if form.is_valid():
            target_user.set_password(form.cleaned_data['new_password'])
            target_user.save()

            # If admin changed their own password here, keep session active
            if target_user.pk == request.user.pk:
                update_session_auth_hash(request, target_user)

            messages.success(request, f"Password for '{target_user.username}' was reset successfully.")
            return redirect('admin_panel:user_list')
        else:
            messages.error(request, "Please correct the password errors.")
    else:
        form = AdminUserPasswordForm(user=target_user)

    context = {
        'page_title': f"Reset Password: {target_user.username}",
        'active_menu': 'users',
        'form': form,
        'target_user': target_user,
    }
    return render(request, 'admin_panel/users/password.html', context)


@superuser_required
def user_toggle_status(request, user_id):
    """
    Toggles user active / inactive status via POST with critical security checks.
    """
    if request.method != 'POST':
        return redirect('admin_panel:user_list')

    target_user = get_object_or_404(User, id=user_id)

    # Protect self-deactivation
    if target_user.pk == request.user.pk:
        messages.error(request, "Security Violation: You cannot deactivate your own active superuser account.")
        return redirect('admin_panel:user_list')

    # Protect last active superuser
    if target_user.is_superuser and target_user.is_active:
        remaining = User.objects.filter(is_superuser=True, is_active=True).exclude(pk=target_user.pk).count()
        if remaining == 0:
            messages.error(request, "Security Violation: Cannot deactivate the last remaining active superuser.")
            return redirect('admin_panel:user_list')

    target_user.is_active = not target_user.is_active
    target_user.save()

    status_name = "activated" if target_user.is_active else "deactivated"
    messages.success(request, f"User account '{target_user.username}' was {status_name}.")
    return redirect('admin_panel:user_list')


@superuser_required
def user_delete(request, user_id):
    """
    Permanently deletes a user account with confirmation.
    """
    target_user = get_object_or_404(User, id=user_id)

    if request.method == 'POST':
        # Protect self deletion
        if target_user.pk == request.user.pk:
            messages.error(request, "Security Violation: You cannot delete your own account while logged in.")
            return redirect('admin_panel:user_list')

        # Protect last superuser deletion
        if target_user.is_superuser:
            remaining = User.objects.filter(is_superuser=True).exclude(pk=target_user.pk).count()
            if remaining == 0:
                messages.error(request, "Security Violation: Cannot delete the last remaining superuser.")
                return redirect('admin_panel:user_list')

        uname = target_user.username
        target_user.delete()
        messages.success(request, f"User '{uname}' was permanently deleted.")
        return redirect('admin_panel:user_list')

    context = {
        'page_title': f"Confirm Delete: {target_user.username}",
        'active_menu': 'users',
        'target_user': target_user,
    }
    return render(request, 'admin_panel/users/delete_confirm.html', context)


# ==========================================
# 5. MY LIST MANAGEMENT VIEWS
# ==========================================

@superuser_required
def my_list_management(request):
    """
    Views and manages users' saved movie bookmarks (MovieList model).
    """
    entries_qs = MovieList.objects.select_related('owner_user', 'movie').all()

    # Search
    q = request.GET.get('q', '').strip()
    if q:
        entries_qs = entries_qs.filter(
            Q(owner_user__username__icontains=q) |
            Q(owner_user__email__icontains=q) |
            Q(movie__title__icontains=q)
        )

    # Genre Filter
    genre = request.GET.get('genre', '').strip()
    if genre:
        entries_qs = entries_qs.filter(movie__genre=genre)

    # Sort
    sort = request.GET.get('sort', '-id')
    valid_sorts = {
        'id_desc': '-id',
        'id_asc': 'id',
        'user_asc': 'owner_user__username',
        'user_desc': '-owner_user__username',
        'movie_asc': 'movie__title',
        'movie_desc': '-movie__title',
    }
    order_by = valid_sorts.get(sort, '-id')
    entries_qs = entries_qs.order_by(order_by)

    # Pagination: 10 per page
    paginator = Paginator(entries_qs, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        'page_title': 'My List Bookmarks Management',
        'active_menu': 'my_list',
        'entries': page_obj,
        'q': q,
        'current_genre': genre,
        'current_sort': sort,
        'genre_choices': Movie.GENRE_CHOICES,
        'total_count': entries_qs.count(),
    }
    return render(request, 'admin_panel/my_list/list.html', context)


@superuser_required
def my_list_delete(request, item_id):
    """
    Removes a movie entry from a user's saved list.
    """
    entry = get_object_or_404(MovieList, id=item_id)

    if request.method == 'POST':
        user_name = entry.owner_user.username
        movie_title = entry.movie.title
        entry.delete()
        messages.success(request, f"Removed '{movie_title}' from {user_name}'s list.")

    return redirect('admin_panel:my_list')


# ==========================================
# 6. ADMIN PROFILE VIEW
# ==========================================

@superuser_required
def admin_profile(request):
    """
    Profile page for the logged-in superuser to edit personal details
    and update password securely.
    """
    profile_form = AdminProfileForm(instance=request.user)
    password_form = PasswordChangeForm(user=request.user)

    if request.method == 'POST':
        action = request.POST.get('action')

        if action == 'update_profile':
            profile_form = AdminProfileForm(request.POST, instance=request.user)
            if profile_form.is_valid():
                profile_form.save()
                messages.success(request, "Your administrator profile has been updated.")
                return redirect('admin_panel:profile')
            else:
                messages.error(request, "Please resolve the profile errors.")

        elif action == 'change_password':
            password_form = PasswordChangeForm(user=request.user, data=request.POST)
            if password_form.is_valid():
                user = password_form.save()
                update_session_auth_hash(request, user)
                messages.success(request, "Your password was changed successfully.")
                return redirect('admin_panel:profile')
            else:
                messages.error(request, "Please resolve the password errors.")

    context = {
        'page_title': 'Administrator Profile',
        'active_menu': 'profile',
        'profile_form': profile_form,
        'password_form': password_form,
        'user': request.user,
    }
    return render(request, 'admin_panel/profile.html', context)


# ==========================================
# 7. ADMIN SETTINGS VIEW
# ==========================================

@superuser_required
def admin_settings(request):
    """
    Displays system architecture details, environment health, media file stats,
    and supports safe maintenance routines.
    """
    if request.method == 'POST' and request.POST.get('action') == 'clear_sessions':
        try:
            call_command('clearsessions')
            messages.success(request, "Expired database sessions cleared successfully.")
        except Exception as e:
            messages.error(request, f"Failed to clear sessions: {e}")
        return redirect('admin_panel:settings')

    # Media folder statistics
    media_path = str(settings.MEDIA_ROOT)
    media_exists = os.path.exists(media_path)
    media_files_count = 0
    media_size_bytes = 0
    if media_exists:
        for root, dirs, files in os.walk(media_path):
            for f in files:
                media_files_count += 1
                fp = os.path.join(root, f)
                try:
                    media_size_bytes += os.path.getsize(fp)
                except OSError:
                    pass

    media_size_mb = round(media_size_bytes / (1024 * 1024), 2)

    # SQLite DB file size
    db_path = settings.DATABASES['default']['NAME']
    db_size_kb = 0
    if os.path.exists(db_path):
        db_size_kb = round(os.path.getsize(db_path) / 1024, 2)

    system_info = {
        'django_version': django.get_version(),
        'python_version': platform.python_version(),
        'os_name': f"{platform.system()} {platform.release()}",
        'database_engine': settings.DATABASES['default']['ENGINE'].split('.')[-1],
        'debug_mode': settings.DEBUG,
        'media_root': media_path,
        'media_files_count': media_files_count,
        'media_size_mb': media_size_mb,
        'db_size_kb': db_size_kb,
        'total_superusers': User.objects.filter(is_superuser=True).count(),
        'total_staff': User.objects.filter(is_staff=True).count(),
    }

    context = {
        'page_title': 'System & Admin Settings',
        'active_menu': 'settings',
        'system_info': system_info,
    }
    return render(request, 'admin_panel/settings.html', context)
