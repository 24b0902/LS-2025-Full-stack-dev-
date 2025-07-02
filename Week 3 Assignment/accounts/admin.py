from django.contrib import admin

# Register your models here.
from django.contrib.auth.models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'is_active', 'is_staff']
    search_fields = ['username', 'email']
    ordering = ['username']

try:
    admin.site.unregister(User)
except admin.sites.NotRegistered:
    pass  # User model was not registered yet, ignore the error
admin.site.register(User, UserAdmin)

admin.site.site_header = "YouTube Clone Admin"
admin.site.site_title = "YT Admin"
admin.site.index_title = "Dashboard"
