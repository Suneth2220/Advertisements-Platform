import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, Plus } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout, isLoggedIn } = useUser();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">ClassifiedHub</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for items, jobs, housing..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/post-ad"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Post Ad</span>
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/account"
                  className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Admin
                  </Link>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for items, jobs, housing..."
              className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              <Link
                to="/post-ad"
                className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Post Ad
              </Link>
              
              {isLoggedIn ? (
                <div className="space-y-2">
                  <Link
                    to="/account"
                    className="block text-gray-700 hover:text-blue-600 transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account ({user?.name})
                  </Link>
                  {user?.isAdmin && (
                    <Link
                      to="/admin"
                      className="block text-gray-700 hover:text-blue-600 transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-gray-700 hover:text-red-600 transition-colors py-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-blue-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;