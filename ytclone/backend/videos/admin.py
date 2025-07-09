from django.contrib import admin
from .models import Video, Like, Comment, Subscription, WatchLater, Playlist, PlaylistVideo, UserProfile


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'uploaded_at', 'views_count', 'is_public']
    list_filter = ['is_public', 'uploaded_at', 'user']
    search_fields = ['title', 'description', 'user__username']
    readonly_fields = ['uploaded_at', 'updated_at', 'views_count']


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ['user', 'video', 'created_at']
    list_filter = ['created_at']


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['user', 'video', 'content', 'created_at', 'parent_comment']
    list_filter = ['created_at']
    search_fields = ['content', 'user__username', 'video__title']


@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ['subscriber', 'subscribed_to', 'created_at']
    list_filter = ['created_at']


@admin.register(WatchLater)
class WatchLaterAdmin(admin.ModelAdmin):
    list_display = ['user', 'video', 'added_at']
    list_filter = ['added_at']


@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'created_at', 'is_public']
    list_filter = ['is_public', 'created_at']
    search_fields = ['name', 'description', 'user__username']


@admin.register(PlaylistVideo)
class PlaylistVideoAdmin(admin.ModelAdmin):
    list_display = ['playlist', 'video', 'order', 'added_at']
    list_filter = ['added_at']


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'location', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username', 'bio', 'location']
