import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WatchLater from './pages/WatchLater';

function App() {
  const [likedVideos, setLikedVideos] = useState([]);
  const [watchLaterVideos, setWatchLaterVideos] = useState([]);

  // Load data from sessionStorage on component mount
  useEffect(() => {
    const savedLikedVideos = sessionStorage.getItem('likedVideos');
    const savedWatchLaterVideos = sessionStorage.getItem('watchLaterVideos');

    if (savedLikedVideos) {
      setLikedVideos(JSON.parse(savedLikedVideos));
    }

    if (savedWatchLaterVideos) {
      setWatchLaterVideos(JSON.parse(savedWatchLaterVideos));
    }
  }, []);

  // Save to sessionStorage whenever state changes
  useEffect(() => {
    sessionStorage.setItem('likedVideos', JSON.stringify(likedVideos));
  }, [likedVideos]);

  useEffect(() => {
    sessionStorage.setItem('watchLaterVideos', JSON.stringify(watchLaterVideos));
  }, [watchLaterVideos]);

  const handleLike = (videoId) => {
    setLikedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleWatchLater = (videoId) => {
    setWatchLaterVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleRemoveFromWatchLater = (videoId) => {
    setWatchLaterVideos(prev => prev.filter(id => id !== videoId));
  };

  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar watchLaterCount={watchLaterVideos.length} />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                likedVideos={likedVideos}
                watchLaterVideos={watchLaterVideos}
                onLike={handleLike}
                onWatchLater={handleWatchLater}
              />
            } 
          />
          <Route 
            path="/watch-later" 
            element={
              <WatchLater 
                likedVideos={likedVideos}
                watchLaterVideos={watchLaterVideos}
                onLike={handleLike}
                onRemoveFromWatchLater={handleRemoveFromWatchLater}
              />
            } 
          />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-900 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-400">© 2025 VideoTube. Built with React & Tailwind CSS by Srinidhi Dhanukonda</p>
                <p className="text-sm text-gray-500">Created as a YouTube-inspired demo app</p>
              </div>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  GitHub(dummy link)
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
