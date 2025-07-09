import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, Upload, Bell, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-14">
      <div className="flex items-center justify-between px-4 h-full">
        {/* Left section */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-full mr-2"
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center">
            <div className="text-xl font-bold text-red-600">
              YTClone
            </div>
          </Link>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSearch} className="flex">
            <div className="flex-1 flex">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-100"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <Link
                to="/upload"
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Upload video"
              >
                <Upload size={20} />
              </Link>
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                title="Notifications"
              >
                <Bell size={20} />
              </button>
              <div className="relative group">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <User size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-4 border-b border-gray-200">
                    <div className="font-medium">{user?.username}</div>
                    <div className="text-sm text-gray-500">{user?.email}</div>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Your videos
                    </Link>
                    <Link
                      to="/watch-later"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Watch later
                    </Link>
                    <Link
                      to="/playlists"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Playlists
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;