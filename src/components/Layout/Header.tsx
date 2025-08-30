import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    
    switch (user.role) {
      default:
        return '/';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="K-MUN 2025 Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = 'jpg';
                    target.src = '/logo.jpg';
                  } else {
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }
                }}
              />
              <div className="hidden text-gray-900 font-bold text-lg">K</div>
            </div>
            <h1 className="text-xl font-bold text-[#37c9ee]">Kumaraguru MUN</h1>
          </Link>

          {/* Right Side - Navigation and Auth */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-8">
              <Link to="/" className="group relative text-gray-700 hover:text-primary-900 transition-colors">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/about" className="group relative text-gray-700 hover:text-primary-900 transition-colors">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/committees" className="group relative text-gray-700 hover:text-primary-900 transition-colors">
                Committees
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/resources" className="group relative text-gray-700 hover:text-primary-900 transition-colors">
                Resources
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/gallery" className="group relative text-gray-700 hover:text-primary-900 transition-colors">
                Gallery
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/contact" className="group relative text-gray-700 hover:text-primary-900 transition-colors">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2 hover:bg-gray-200 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.firstName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user?.firstName} {user?.lastName}</span>
                </button>

                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  >
                    <Link
                      to={getDashboardLink()}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-primary-900 hover:text-primary-950 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-900 text-white px-4 py-2 rounded-lg hover:bg-primary-950 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          </div>

        {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-primary-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/committees"
                className="text-gray-700 hover:text-primary-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Committees
              </Link>
              <Link
                to="/resources"
                className="text-gray-700 hover:text-primary-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                to="/gallery"
                className="text-gray-700 hover:text-primary-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-primary-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {isAuthenticated ? (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary-900 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {user?.firstName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user?.firstName} {user?.lastName}</div>
                      <div className="text-sm text-gray-500 capitalize">{user?.role.replace('-', ' ')}</div>
                    </div>
                  </div>
                  <Link
                    to={getDashboardLink()}
                    className="block text-gray-700 hover:text-primary-900 transition-colors mb-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block text-gray-700 hover:text-primary-900 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    className="block text-blue-800 hover:text-blue-900 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;