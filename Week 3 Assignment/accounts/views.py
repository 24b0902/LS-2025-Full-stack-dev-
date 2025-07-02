import uuid
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

# Token store (in-memory; use DB in production)
verification_tokens = {}

def register_view(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            token = str(uuid.uuid4())
            verification_tokens[token] = user.username
            return redirect(f"/verify/{token}")
    else:
        form = CustomUserCreationForm()
    return render(request, "accounts/register.html", {"form": form})

def verify_view(request, token):
    username = verification_tokens.get(token)
    if username:
        user = User.objects.get(username=username)
        user.is_active = True
        user.save()
        messages.success(request, "Account Verified Successfully ✅")
    else:
        messages.error(request, "Invalid or expired token")
    return render(request, "accounts/verify.html")

def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect("/dashboard")
        else:
            messages.error(request, "Invalid username or password")
    return render(request, "accounts/login.html")

def logout_view(request):
    logout(request)
    return redirect("/login")

@login_required(login_url="/login")
def dashboard_view(request):
    return render(request, "accounts/dashboard.html", {"user": request.user})
