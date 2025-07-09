import React from 'react';
import { Link } from 'react-router-dom';
import type { Video } from '../types';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const formatDuration = (duration: string) => {
    // Format duration from backend (e.g., "00:05:30" to "5:30")
    if (!duration) return '';
    const parts = duration.split(':');
    if (parts.length === 3) {
      const hours = parseInt(parts[0]);
      const minutes = parseInt(parts[1]);
      const seconds = parts[2];
      
      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds}`;
      } else {
        return `${minutes}:${seconds}`;
      }
    }
    return duration;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    } else {
      return `${views} views`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInHours < 24 * 7) {
      return `${Math.floor(diffInHours / 24)} days ago`;
    } else if (diffInHours < 24 * 30) {
      return `${Math.floor(diffInHours / (24 * 7))} weeks ago`;
    } else if (diffInHours < 24 * 365) {
      return `${Math.floor(diffInHours / (24 * 30))} months ago`;
    } else {
      return `${Math.floor(diffInHours / (24 * 365))} years ago`;
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
      <Link to={`/watch/${video.id}`} className="block">
        <div className="relative aspect-video bg-gray-200">
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No thumbnail
            </div>
          )}
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
              {formatDuration(video.duration)}
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-3">
        <Link to={`/watch/${video.id}`}>
          <h3 className="font-medium text-sm line-clamp-2 text-gray-900 hover:text-gray-700 mb-1">
            {video.title}
          </h3>
        </Link>
        
        <Link to={`/channel/${video.user.id}`} className="block mb-1">
          <p className="text-xs text-gray-600 hover:text-gray-800">
            {video.user.username}
          </p>
        </Link>
        
        <div className="flex items-center text-xs text-gray-500 space-x-1">
          <span>{formatViews(video.views_count)}</span>
          <span>•</span>
          <span>{formatDate(video.uploaded_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;