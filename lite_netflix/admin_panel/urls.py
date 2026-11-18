from django.urls import path
from django.shortcuts import redirect
from . import views

app_name = 'admin_panel'

urlpatterns = [
    # Root redirect
    path('', lambda request: redirect('admin_panel:dashboard'), name='root'),

    # Authentication
    path('login/', views.admin_login, name='login'),
    path('logout/', views.admin_logout, name='logout'),

    # Dashboard
    path('dashboard/', views.admin_dashboard, name='dashboard'),

    # Movie Management
    path('movies/', views.movie_list, name='movie_list'),
    path('movies/add/', views.movie_add, name='movie_add'),
    path('movies/edit/<str:pk>/', views.movie_edit, name='movie_edit'),
    path('movies/delete/<str:pk>/', views.movie_delete, name='movie_delete'),
    path('movies/preview/<str:pk>/', views.movie_preview, name='movie_preview'),

    # User Management
    path('users/', views.user_list, name='user_list'),
    path('users/add/', views.user_add, name='user_add'),
    path('users/edit/<int:user_id>/', views.user_edit, name='user_edit'),
    path('users/password/<int:user_id>/', views.user_change_password, name='user_password'),
    path('users/toggle-status/<int:user_id>/', views.user_toggle_status, name='user_toggle_status'),
    path('users/delete/<int:user_id>/', views.user_delete, name='user_delete'),

    # My List Bookmarks Management
    path('my-list/', views.my_list_management, name='my_list'),
    path('my-list/delete/<int:item_id>/', views.my_list_delete, name='my_list_delete'),

    # Admin Profile & Settings
    path('profile/', views.admin_profile, name='profile'),
    path('settings/', views.admin_settings, name='settings'),
]
