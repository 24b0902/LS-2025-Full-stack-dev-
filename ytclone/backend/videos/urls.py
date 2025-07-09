from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register viewsets
router = DefaultRouter()
router.register(r'videos', views.VideoViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'subscriptions', views.SubscriptionViewSet, basename='subscription')
router.register(r'watch-later', views.WatchLaterViewSet, basename='watchlater')
router.register(r'playlists', views.PlaylistViewSet, basename='playlist')
router.register(r'users', views.UserViewSet)

urlpatterns = [
    # Authentication endpoints
    path('auth/register/', views.register, name='register'),
    path('auth/login/', views.login, name='login'),
    path('auth/logout/', views.logout, name='logout'),
    
    # Search endpoint
    path('search/', views.search_videos, name='search_videos'),
    
    # Dashboard endpoint
    path('dashboard/', views.dashboard, name='dashboard'),
    
    # Include router URLs
    path('', include(router.urls)),
]