from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Video, Like, Comment, Subscription, WatchLater, Playlist, PlaylistVideo, UserProfile


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    videos_count = serializers.SerializerMethodField()
    subscribers_count = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined', 'videos_count', 'subscribers_count', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
    def get_videos_count(self, obj):
        return obj.videos.count()
    
    def get_subscribers_count(self, obj):
        return obj.subscribers.count()
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        # Create user profile
        UserProfile.objects.create(user=user)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['user', 'avatar', 'bio', 'birth_date', 'location', 'website', 'created_at', 'subscribers_count', 'videos_count']


class VideoSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()
    is_liked = serializers.SerializerMethodField()
    is_in_watch_later = serializers.SerializerMethodField()
    
    class Meta:
        model = Video
        fields = [
            'id', 'title', 'description', 'video_file', 'thumbnail', 'user',
            'uploaded_at', 'updated_at', 'views_count', 'duration', 'is_public',
            'likes_count', 'comments_count', 'is_liked', 'is_in_watch_later'
        ]
        read_only_fields = ['user', 'uploaded_at', 'updated_at', 'views_count']
    
    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Like.objects.filter(user=request.user, video=obj).exists()
        return False
    
    def get_is_in_watch_later(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return WatchLater.objects.filter(user=request.user, video=obj).exists()
        return False
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class LikeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    video = VideoSerializer(read_only=True)
    
    class Meta:
        model = Like
        fields = ['id', 'user', 'video', 'created_at']
        read_only_fields = ['user', 'created_at']


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    replies = serializers.SerializerMethodField()
    replies_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = ['id', 'user', 'video', 'content', 'created_at', 'updated_at', 'parent_comment', 'replies', 'replies_count']
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def get_replies(self, obj):
        if obj.replies.exists():
            return CommentSerializer(obj.replies.all(), many=True, context=self.context).data
        return []
    
    def get_replies_count(self, obj):
        return obj.replies.count()
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class SubscriptionSerializer(serializers.ModelSerializer):
    subscriber = UserSerializer(read_only=True)
    subscribed_to = UserSerializer(read_only=True)
    
    class Meta:
        model = Subscription
        fields = ['id', 'subscriber', 'subscribed_to', 'created_at']
        read_only_fields = ['subscriber', 'created_at']


class WatchLaterSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    video = VideoSerializer(read_only=True)
    
    class Meta:
        model = WatchLater
        fields = ['id', 'user', 'video', 'added_at']
        read_only_fields = ['user', 'added_at']


class PlaylistVideoSerializer(serializers.ModelSerializer):
    video = VideoSerializer(read_only=True)
    
    class Meta:
        model = PlaylistVideo
        fields = ['id', 'video', 'order', 'added_at']


class PlaylistSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    videos_detail = PlaylistVideoSerializer(source='playlistvideo_set', many=True, read_only=True)
    videos_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Playlist
        fields = ['id', 'name', 'description', 'user', 'videos', 'videos_detail', 'videos_count', 'created_at', 'updated_at', 'is_public']
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def get_videos_count(self, obj):
        return obj.videos.count()
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class VideoUploadSerializer(serializers.ModelSerializer):
    """Simplified serializer for video upload"""
    class Meta:
        model = Video
        fields = ['title', 'description', 'video_file', 'thumbnail', 'is_public']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)