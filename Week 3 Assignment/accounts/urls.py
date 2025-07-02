from django.urls import path
from django.shortcuts import redirect
from .views import register_view, verify_view, login_view, logout_view, dashboard_view

urlpatterns = [
    path("", lambda request: redirect("login/")),  # Root of accounts redirects to login
    path("register/", register_view, name="register"),
    path("verify/<str:token>/", verify_view, name="verify"),
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path("dashboard/", dashboard_view, name="dashboard"),
]
