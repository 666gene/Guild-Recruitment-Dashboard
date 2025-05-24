import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdminPath = location.pathname.startsWith('/admin');
  
  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/src/assets/images/guild-logo.png" 
                alt="Low Calibre Guild Logo"
                className="h-8 w-8 animate-float"
              />
              <span className="font-display text-xl sm:text-2xl text-primary">Low Calibre</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`font-medium px-3 py-2 rounded-md hover:text-primary transition-colors ${
                location.pathname === '/' ? 'text-primary' : 'text-gray-300'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/apply" 
              className={`font-medium px-3 py-2 rounded-md hover:text-primary transition-colors ${
                location.pathname === '/apply' ? 'text-primary' : 'text-gray-300'
              }`}
            >
              Apply
            </Link>
            {user ? (
              <>
                <Link 
                  to="/admin" 
                  className={`font-medium px-3 py-2 rounded-md hover:text-primary transition-colors ${
                    isAdminPath ? 'text-primary' : 'text-gray-300'
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 font-medium px-3 py-2 text-gray-300 hover:text-primary transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/admin/login" 
                className="btn btn-primary"
              >
                Officer Login
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-hover"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background-light border-t border-primary/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md font-medium ${
                location.pathname === '/' ? 'text-primary' : 'text-gray-300 hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link
              to="/apply"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md font-medium ${
                location.pathname === '/apply' ? 'text-primary' : 'text-gray-300 hover:text-primary'
              }`}
            >
              Apply
            </Link>
            {user ? (
              <>
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md font-medium ${
                    isAdminPath ? 'text-primary' : 'text-gray-300 hover:text-primary'
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-1 w-full text-left px-3 py-2 rounded-md font-medium text-gray-300 hover:text-primary"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-center font-medium bg-primary text-background-light"
              >
                Officer Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;