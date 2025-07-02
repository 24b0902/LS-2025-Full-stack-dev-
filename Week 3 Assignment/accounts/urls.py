from django.urls import path
from django.shortcuts import redirect
from .views import register_view, verify_view, login_view, logout_view, dashboard_view
app_name = "accounts"

urlpatterns = [
    path("register/", views.register_view, name="register"),
    path("verify/<str:token>/", views.verify_view, name="verify"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("dashboard/", views.dashboard_view, name="dashboard"),
]
