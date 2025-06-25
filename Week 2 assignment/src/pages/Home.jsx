import React, { useState, useEffect } from 'react';
import { videos } from '../data/dummyVideos';
import VideoCard from '../components/VideoCard';
import { TrendingUp, Music, Newspaper, Gamepad2, Lightbulb } from 'lucide-react';

const Home = ({ likedVideos, watchLaterVideos, onLike, onWatchLater }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [notification, setNotification] = useState('');

  const filters = [
    { id: 'all', label: 'All', icon: TrendingUp },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
    { id: 'learning', label: 'Learning', icon: Lightbulb },
  ];

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

  const handleWatchLater = (videoId) => {
    onWatchLater(videoId);
    const video = videos.find(v => v.id === videoId);
    const isWatchLater = watchLaterVideos.includes(videoId);
    showNotification(isWatchLater ? `Removed "${video.title}" from Watch Later` : `Added "${video.title}" to Watch Later ✅`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in">
          {notification}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-8 pb-4 border-b border-gray-800/50">
          {filters.map((filter) => {
            const IconComponent = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-sm font-medium">{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              isLiked={likedVideos.includes(video.id)}
              isWatchLater={watchLaterVideos.includes(video.id)}
              onLike={handleLike}
              onWatchLater={handleWatchLater}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{videos.length}</div>
              <div className="text-sm text-gray-400">Total Videos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{likedVideos.length}</div>
              <div className="text-sm text-gray-400">Liked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{watchLaterVideos.length}</div>
              <div className="text-sm text-gray-400">Watch Later</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
