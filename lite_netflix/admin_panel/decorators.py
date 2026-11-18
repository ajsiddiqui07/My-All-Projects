from functools import wraps
from urllib.parse import quote
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib import messages


def superuser_required(view_func):
    """
    Decorator that ensures the requesting user is authenticated, active,
    and has superuser privileges.
    Ordinary users or unauthenticated visitors are denied access and redirected
    to the admin login page.
    """
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            login_url = reverse('admin_panel:login')
            next_url = quote(request.get_full_path())
            return redirect(f"{login_url}?next={next_url}")
        
        if not request.user.is_active or not request.user.is_superuser:
            messages.error(
                request,
                "Access Denied: You must be signed in as a superuser administrator to access this area."
            )
            return redirect('admin_panel:login')
            
        return view_func(request, *args, **kwargs)
    return _wrapped_view
