from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin

User = get_user_model()  # Always works, even for custom User models

class CustomUserAdmin(DefaultUserAdmin):
    list_display = ['username', 'email', 'is_active', 'is_staff']
    search_fields = ['username', 'email']
    ordering = ['username']

# Unregister and re-register safely
try:
    admin.site.unregister(User)
except admin.sites.NotRegistered:
    pass

admin.site.register(User, CustomUserAdmin)

# Branding
admin.site.site_header = "YouTube Clone Admin"
admin.site.site_title = "YT Admin"
admin.site.index_title = "Dashboard"
