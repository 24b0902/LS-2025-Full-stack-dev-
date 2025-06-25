import React, { useState } from 'react';
import { videos } from '../data/dummyVideos';
import VideoCard from '../components/VideoCard';
import { Bookmark, Play, Trash2 } from 'lucide-react';

const WatchLater = ({ likedVideos, watchLaterVideos, onLike, onRemoveFromWatchLater }) => {
  const [notification, setNotification] = useState('');

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLike = (videoId) => {
    onLike(videoId);
    const video = videos.find(v => v.id === videoId);
    const isLiked = likedVideos.includes(videoId);
    showNotification(isLiked ? `Removed "${video.title}" from likes` : `Liked "${video.title}" ❤️`);
  };

  const handleRemoveFromWatchLater = (videoId) => {
    onRemoveFromWatchLater(videoId);
    const video = videos.find(v => v.id === videoId);
    showNotification(`Removed "${video.title}" from Watch Later`);
  };

  const clearAllWatchLater = () => {
    watchLaterVideos.forEach(videoId => {
      onRemoveFromWatchLater(videoId);
    });
    showNotification('Cleared all videos from Watch Later');
  };

  const watchLaterVideosList = videos.filter(video => 
    watchLaterVideos.includes(video.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in">
          {notification}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Bookmark className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Watch Later</h1>
              <p className="text-gray-400">
                {watchLaterVideosList.length} video{watchLaterVideosList.length !== 1 ? 's' : ''} saved
              </p>
            </div>
          </div>

          {watchLaterVideosList.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={clearAllWatchLater}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
                <Play className="w-4 h-4" />
                <span>Play All</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {watchLaterVideosList.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-12 h-12 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No videos saved yet</h2>
            <p className="text-gray-400 mb-8">
              Videos you save to watch later will appear here
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              <span>Browse Videos</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {watchLaterVideosList.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isLiked={likedVideos.includes(video.id)}
                isWatchLater={true}
                onLike={handleLike}
                onRemoveFromWatchLater={handleRemoveFromWatchLater}
                showRemove={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchLater;
