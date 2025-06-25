import { Search, Clock, Play, Home, Bookmark } from 'lucide-react';
import Timer from './Timer';

const Navbar = ({ watchLaterCount }) => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-red-500/25 transition-all duration-300 group-hover:scale-105">
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
              VideoTube
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search videos..."
                className="w-full px-4 py-2 pl-12 bg-gray-900/50 border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute left-4 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <Timer />
            
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                location.pathname === '/'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              to="/watch-later"
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 relative ${
                location.pathname === '/watch-later'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Bookmark className="w-5 h-5" />
              <span className="hidden sm:inline">Watch Later</span>
              {watchLaterCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                  {watchLaterCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
