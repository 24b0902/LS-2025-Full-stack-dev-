import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Music, PlaySquare, Clock, ThumbsUp, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: TrendingUp, label: 'Trending', path: '/trending' },
    { icon: Music, label: 'Music', path: '/music' },
  ];

  const libraryItems = [
    { icon: PlaySquare, label: 'Your videos', path: '/dashboard' },
    { icon: Clock, label: 'Watch later', path: '/watch-later' },
    { icon: ThumbsUp, label: 'Liked videos', path: '/liked' },
    { icon: Download, label: 'Downloads', path: '/downloads' },
  ];

  return (
    <aside
      className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
        isOpen ? 'w-60' : 'w-16'
      }`}
    >
      <nav className="py-2">
        {/* Main navigation */}
        <div className="mb-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 mx-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon size={20} className="min-w-5" />
              {isOpen && (
                <span className="ml-6 text-sm font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </div>

        {/* Separator */}
        {isOpen && <hr className="my-2 border-gray-200" />}

        {/* Library section - only show if authenticated */}
        {isAuthenticated && (
          <div className="mb-2">
            {isOpen && (
              <h3 className="px-6 py-2 text-sm font-medium text-gray-600 uppercase tracking-wider">
                Library
              </h3>
            )}
            {libraryItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 mx-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-gray-100 text-black'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon size={20} className="min-w-5" />
                {isOpen && (
                  <span className="ml-6 text-sm font-medium">{item.label}</span>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* Separator */}
        {isAuthenticated && isOpen && <hr className="my-2 border-gray-200" />}

        {/* Subscriptions section - only show if authenticated */}
        {isAuthenticated && isOpen && (
          <div className="mb-2">
            <h3 className="px-6 py-2 text-sm font-medium text-gray-600 uppercase tracking-wider">
              Subscriptions
            </h3>
            <div className="px-6 py-2 text-sm text-gray-500">
              No subscriptions yet
            </div>
          </div>
        )}

        {/* Sign in prompt for unauthenticated users */}
        {!isAuthenticated && isOpen && (
          <div className="px-6 py-4">
            <p className="text-sm text-gray-600 mb-3">
              Sign in to like videos, comment, and subscribe.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50"
            >
              Sign in
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;