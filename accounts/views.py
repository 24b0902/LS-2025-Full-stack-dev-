from django.shortcuts import render

# Create your views here.
import uuid
from django.contrib import messages
from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm
from django.contrib.auth.models import User

tokens = {}

def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False  # deactivate until verified
            user.save()
            token = str(uuid.uuid4())
            tokens[token] = user.username
            return redirect(f'/verify/{token}')
    else:
        form = CustomUserCreationForm()
    return render(request, 'register.html', {'form': form})

def verify_view(request, token):
    username = tokens.get(token)
    if username:
        user = User.objects.get(username=username)
        user.is_active = True
        user.save()
        messages.success(request, "Account Verified Successfully ✅")
        return redirect('/login/')
    else:
        return render(request, 'verify.html', {'error': "Invalid Token"})

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('/dashboard/')
        else:
            messages.error(request, "Invalid credentials")
    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('/login/')

@login_required
def dashboard_view(request):
    return render(request, 'dashboard.html', {'user': request.user})
