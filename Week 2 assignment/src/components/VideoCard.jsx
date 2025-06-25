import React from 'react';
import { Heart, Bookmark, Play, Eye } from 'lucide-react';

const VideoCard = ({ video, isLiked, isWatchLater, onLike, onWatchLater, onRemoveFromWatchLater, showRemove = false }) => {
  return (
    <div className="group bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-red-600/90 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2 group-hover:text-red-400 transition-colors duration-300">
          {video.title}
        </h3>
        
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
          <span className="font-medium text-gray-300">{video.channel}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{video.views} views</span>
          </div>
          <span>•</span>
          <span>{video.time}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onLike(video.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
              isLiked
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm">Like</span>
          </button>

          {showRemove ? (
            <button
              onClick={() => onRemoveFromWatchLater(video.id)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span className="text-sm">Remove</span>
            </button>
          ) : (
            <button
              onClick={() => onWatchLater(video.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                isWatchLater
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isWatchLater ? 'fill-current' : ''}`} />
              <span className="text-sm">{isWatchLater ? 'Added' : 'Watch Later'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
