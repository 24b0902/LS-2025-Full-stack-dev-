from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Q
from django.http import Http404

from .models import Video, Like, Comment, Subscription, WatchLater, Playlist, PlaylistVideo, UserProfile
from .serializers import (
    VideoSerializer, VideoUploadSerializer, LikeSerializer, CommentSerializer, 
    SubscriptionSerializer, WatchLaterSerializer, PlaylistSerializer, 
    UserSerializer, UserProfileSerializer
)


@api_view(['POST'])
@permission_classes([])
def register(request):
    """User registration endpoint"""
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([])
def login(request):
    """User login endpoint"""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if username and password:
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'user': UserSerializer(user).data,
                'token': token.key
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """User logout endpoint"""
    try:
        request.user.auth_token.delete()
        return Response({'message': 'Successfully logged out'})
    except:
        return Response({'error': 'Error logging out'}, status=status.HTTP_400_BAD_REQUEST)


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.filter(is_public=True)
    serializer_class = VideoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return VideoUploadSerializer
        return VideoSerializer
    
    def get_queryset(self):
        queryset = Video.objects.filter(is_public=True)
        search = self.request.query_params.get('search', None)
        user_id = self.request.query_params.get('user', None)
        
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )
        
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        
        return queryset.order_by('-uploaded_at')
    
    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        """Increment video view count"""
        video = self.get_object()
        video.views_count += 1
        video.save()
        return Response({'views_count': video.views_count})
    
    @action(detail=True, methods=['post', 'delete'])
    def like(self, request, pk=None):
        """Like or unlike a video"""
        video = self.get_object()
        
        if request.method == 'POST':
            like, created = Like.objects.get_or_create(user=request.user, video=video)
            if created:
                return Response({'message': 'Video liked', 'likes_count': video.likes_count})
            return Response({'message': 'Already liked', 'likes_count': video.likes_count})
        
        elif request.method == 'DELETE':
            try:
                like = Like.objects.get(user=request.user, video=video)
                like.delete()
                return Response({'message': 'Like removed', 'likes_count': video.likes_count})
            except Like.DoesNotExist:
                return Response({'message': 'Not liked'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        """Get comments for a video"""
        video = self.get_object()
        comments = Comment.objects.filter(video=video, parent_comment=None)
        serializer = CommentSerializer(comments, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=True, methods=['post', 'delete'])
    def watch_later(self, request, pk=None):
        """Add or remove video from watch later"""
        video = self.get_object()
        
        if request.method == 'POST':
            watch_later, created = WatchLater.objects.get_or_create(user=request.user, video=video)
            if created:
                return Response({'message': 'Added to watch later'})
            return Response({'message': 'Already in watch later'})
        
        elif request.method == 'DELETE':
            try:
                watch_later = WatchLater.objects.get(user=request.user, video=video)
                watch_later.delete()
                return Response({'message': 'Removed from watch later'})
            except WatchLater.DoesNotExist:
                return Response({'message': 'Not in watch later'}, status=status.HTTP_404_NOT_FOUND)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        video_id = self.request.query_params.get('video', None)
        if video_id:
            return Comment.objects.filter(video_id=video_id, parent_comment=None)
        return Comment.objects.filter(parent_comment=None)


class SubscriptionViewSet(viewsets.ModelViewSet):
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Subscription.objects.filter(subscriber=self.request.user)
    
    def create(self, request):
        """Subscribe to a user"""
        subscribed_to_id = request.data.get('subscribed_to')
        try:
            subscribed_to = User.objects.get(id=subscribed_to_id)
            if subscribed_to == request.user:
                return Response({'error': 'Cannot subscribe to yourself'}, status=status.HTTP_400_BAD_REQUEST)
            
            subscription, created = Subscription.objects.get_or_create(
                subscriber=request.user,
                subscribed_to=subscribed_to
            )
            
            if created:
                return Response({'message': 'Subscribed successfully'}, status=status.HTTP_201_CREATED)
            return Response({'message': 'Already subscribed'})
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['delete'])
    def unsubscribe(self, request):
        """Unsubscribe from a user"""
        subscribed_to_id = request.data.get('subscribed_to')
        try:
            subscription = Subscription.objects.get(
                subscriber=request.user,
                subscribed_to_id=subscribed_to_id
            )
            subscription.delete()
            return Response({'message': 'Unsubscribed successfully'})
        except Subscription.DoesNotExist:
            return Response({'error': 'Subscription not found'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'])
    def subscribed_videos(self, request):
        """Get videos from subscribed channels"""
        subscriptions = Subscription.objects.filter(subscriber=request.user)
        subscribed_users = [sub.subscribed_to for sub in subscriptions]
        videos = Video.objects.filter(user__in=subscribed_users, is_public=True).order_by('-uploaded_at')
        serializer = VideoSerializer(videos, many=True, context={'request': request})
        return Response(serializer.data)


class WatchLaterViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = WatchLaterSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return WatchLater.objects.filter(user=self.request.user)


class PlaylistViewSet(viewsets.ModelViewSet):
    serializer_class = PlaylistSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        user_id = self.request.query_params.get('user', None)
        if user_id:
            return Playlist.objects.filter(user_id=user_id, is_public=True)
        
        if self.request.user.is_authenticated:
            return Playlist.objects.filter(
                Q(user=self.request.user) | Q(is_public=True)
            ).distinct()
        
        return Playlist.objects.filter(is_public=True)
    
    @action(detail=True, methods=['post'])
    def add_video(self, request, pk=None):
        """Add video to playlist"""
        playlist = self.get_object()
        if playlist.user != request.user:
            return Response({'error': 'Not your playlist'}, status=status.HTTP_403_FORBIDDEN)
        
        video_id = request.data.get('video_id')
        try:
            video = Video.objects.get(id=video_id)
            playlist_video, created = PlaylistVideo.objects.get_or_create(
                playlist=playlist,
                video=video,
                defaults={'order': playlist.videos.count()}
            )
            
            if created:
                return Response({'message': 'Video added to playlist'}, status=status.HTTP_201_CREATED)
            return Response({'message': 'Video already in playlist'})
        except Video.DoesNotExist:
            return Response({'error': 'Video not found'}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=True, methods=['delete'])
    def remove_video(self, request, pk=None):
        """Remove video from playlist"""
        playlist = self.get_object()
        if playlist.user != request.user:
            return Response({'error': 'Not your playlist'}, status=status.HTTP_403_FORBIDDEN)
        
        video_id = request.data.get('video_id')
        try:
            playlist_video = PlaylistVideo.objects.get(playlist=playlist, video_id=video_id)
            playlist_video.delete()
            return Response({'message': 'Video removed from playlist'})
        except PlaylistVideo.DoesNotExist:
            return Response({'error': 'Video not in playlist'}, status=status.HTTP_404_NOT_FOUND)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    @action(detail=True, methods=['get'])
    def videos(self, request, pk=None):
        """Get user's videos"""
        user = self.get_object()
        videos = Video.objects.filter(user=user, is_public=True).order_by('-uploaded_at')
        serializer = VideoSerializer(videos, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def profile(self, request, pk=None):
        """Get user's profile"""
        user = self.get_object()
        try:
            profile = user.profile
            serializer = UserProfileSerializer(profile, context={'request': request})
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            # Create profile if it doesn't exist
            profile = UserProfile.objects.create(user=user)
            serializer = UserProfileSerializer(profile, context={'request': request})
            return Response(serializer.data)
    
    @action(detail=True, methods=['post', 'delete'])
    def subscribe(self, request, pk=None):
        """Subscribe or unsubscribe to/from user"""
        user_to_subscribe = self.get_object()
        
        if user_to_subscribe == request.user:
            return Response({'error': 'Cannot subscribe to yourself'}, status=status.HTTP_400_BAD_REQUEST)
        
        if request.method == 'POST':
            subscription, created = Subscription.objects.get_or_create(
                subscriber=request.user,
                subscribed_to=user_to_subscribe
            )
            
            if created:
                return Response({'message': 'Subscribed successfully'}, status=status.HTTP_201_CREATED)
            return Response({'message': 'Already subscribed'})
        
        elif request.method == 'DELETE':
            try:
                subscription = Subscription.objects.get(
                    subscriber=request.user,
                    subscribed_to=user_to_subscribe
                )
                subscription.delete()
                return Response({'message': 'Unsubscribed successfully'})
            except Subscription.DoesNotExist:
                return Response({'error': 'Not subscribed'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def search_videos(request):
    """Search videos by title and description"""
    query = request.GET.get('q', '')
    if query:
        videos = Video.objects.filter(
            Q(title__icontains=query) | Q(description__icontains=query),
            is_public=True
        ).order_by('-uploaded_at')
        serializer = VideoSerializer(videos, many=True, context={'request': request})
        return Response(serializer.data)
    return Response([])


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    """Get user dashboard data"""
    user = request.user
    
    # User's videos
    user_videos = Video.objects.filter(user=user).order_by('-uploaded_at')[:5]
    
    # Watch later videos
    watch_later = WatchLater.objects.filter(user=user).order_by('-added_at')[:5]
    
    # User's playlists
    playlists = Playlist.objects.filter(user=user).order_by('-created_at')[:5]
    
    # Subscribed videos
    subscriptions = Subscription.objects.filter(subscriber=user)
    subscribed_users = [sub.subscribed_to for sub in subscriptions]
    subscribed_videos = Video.objects.filter(
        user__in=subscribed_users, 
        is_public=True
    ).order_by('-uploaded_at')[:10]
    
    return Response({
        'user_videos': VideoSerializer(user_videos, many=True, context={'request': request}).data,
        'watch_later': WatchLaterSerializer(watch_later, many=True, context={'request': request}).data,
        'playlists': PlaylistSerializer(playlists, many=True, context={'request': request}).data,
        'subscribed_videos': VideoSerializer(subscribed_videos, many=True, context={'request': request}).data,
    })
