import { useContext, useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  FaFacebookF,
  FaGoogle,
  FaTwitter,
  FaYoutube,
  FaBars,
  FaTimes,
  FaSearch,
} from 'react-icons/fa';
import logo from '../../../assets/website logo.png';
import { AuthContext } from '../../../Provider/AuthProvider';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import Mood from './Mood';
import DynamicDashboardLink from './DynamicDashboardLink';
import MobileNavBtn, {
  DesktopNavigation,
  OutlineButton,
  SubmitButton,
} from '../../../Components/ui/Button';

const Navbar = () => {
  const { user, loggedOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const tooltipRef = useRef(null);

  // ✅ Handle logout
  const handleLogOut = () => {
    loggedOut()
      .then(() => {})
      .catch(error => {
        console.error('Logout error:', error);
      });
  };

  // ✅ Tooltip initialization
  useEffect(() => {
    if (user?.email) {
      const tooltipElement = document.getElementById('MyTool');

      if (tooltipElement) {
        if (tooltipRef.current) {
          try {
            tooltipRef.current.destroy();
          } catch (error) {}
        }

        tooltipRef.current = tippy(tooltipElement, {
          content: user?.displayName || 'User',
          placement: 'bottom',
          trigger: 'mouseenter focus',
        });
      }
    }

    return () => {
      if (tooltipRef.current) {
        try {
          tooltipRef.current.destroy();
          tooltipRef.current = null;
        } catch (error) {}
      }
    };
  }, [user?.displayName, user?.email]);

  // ✅ Body scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // ✅ Search handler
  const handleSearch = e => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // ✅ Close on Escape
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/instructors', label: 'Instructors' },
    { path: '/classes', label: 'Classes' },
    { path: '/blog', label: 'Blog' },
    { path: '/news', label: 'News' },
    ...(user ? [{ path: '/wishlist', label: 'Wishlist' }] : []),
  ];

  const socialLinks = {
    facebook: 'https://facebook.com/yourpage',
    twitter: 'https://twitter.com/yourpage',
    google: 'https://google.com',
    youtube: 'https://youtube.com/yourchannel',
  };

  return (
    <>
      {/* Main Navbar - ✅ Mobile optimized heights */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* ✅ Fixed heights for CLS prevention */}
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo - ✅ Fixed dimensions */}
            <Link
              to="/"
              className="flex-shrink-0 min-w-[120px] sm:min-w-[140px] md:min-w-[200px]">
              <img
                className="h-8 sm:h-10 md:h-14 w-auto object-contain"
                src={logo}
                alt="Company Logo"
                width="224"
                height="56"
                loading="eager"
              />
            </Link>

            {/* Desktop Navigation */}
            <DesktopNavigation navItems={navItems} />

            {/* Right Side Actions - ✅ Mobile optimized spacing */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              {/* Search Button - ✅ Fixed size */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors w-9 h-9 flex items-center justify-center"
                aria-label="Search"
                aria-expanded={isSearchOpen}>
                <FaSearch className="text-gray-600 text-base sm:text-lg" />
              </button>

              {/* Theme Toggle - Desktop only */}
              <div className="hidden md:flex items-center justify-center w-10 h-10">
                <Mood />
              </div>

              {/* Social Icons - Desktop only, ✅ Fixed sizes */}
              <div className="hidden lg:flex items-center space-x-2">
                {[
                  {
                    href: socialLinks.facebook,
                    icon: FaFacebookF,
                    color: 'blue',
                    label: 'Facebook',
                  },
                  {
                    href: socialLinks.twitter,
                    icon: FaTwitter,
                    color: 'sky',
                    label: 'Twitter',
                  },
                  {
                    href: socialLinks.google,
                    icon: FaGoogle,
                    color: 'red',
                    label: 'Google',
                  },
                  {
                    href: socialLinks.youtube,
                    icon: FaYoutube,
                    color: 'red',
                    label: 'YouTube',
                  },
                ].map(({ href, icon: Icon, color, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 flex items-center justify-center rounded-full bg-${color}-100 hover:bg-${color}-200 text-${color}-600 transition-colors`}
                    aria-label={label}>
                    <Icon className="text-xs" />
                  </a>
                ))}
              </div>

              {/* User Profile / Login - ✅ Mobile optimized */}
              {user && user?.email ? (
                <div className="relative group">
                  <button
                    id="MyTool"
                    className="flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full w-9 h-9 sm:w-10 sm:h-10"
                    aria-label="User menu">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-indigo-600 overflow-hidden hover:border-purple-600 transition-colors flex-shrink-0">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user?.displayName || 'User'}
                          className="w-full h-full object-cover"
                          width="40"
                          height="40"
                          loading="lazy"
                          onError={e => {
                            e.target.onerror = null;
                            e.target.src =
                              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ctext y="50%" x="50%" dy=".35em" text-anchor="middle" font-size="50" fill="%23fff"%3E' +
                              (user?.displayName?.charAt(0)?.toUpperCase() || 'U') +
                              '%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                          {user?.displayName?.charAt(0)?.toUpperCase() ||
                            user?.email?.charAt(0)?.toUpperCase() ||
                            'U'}
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Dropdown Menu - ✅ Better mobile positioning */}
                  <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-50">
                    <div className="py-2">
                      {/* User Info */}
                      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
                        <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                          {user?.displayName || 'User'}
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>

                      {/* Profile Link */}
                      <Link
                        to="/profile"
                        className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 transition-colors">
                        <span className="text-xs sm:text-sm text-gray-700">Profile</span>
                        <span className="text-[10px] sm:text-xs bg-green-100 text-green-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-semibold">
                          New
                        </span>
                      </Link>

                      {/* Dynamic Dashboard Link */}
                      <DynamicDashboardLink />

                      {/* Logout */}
                      <div className="border-t border-gray-100 mt-2 pt-2 px-2">
                        <OutlineButton
                          onClick={handleLogOut}
                          text="Logout"
                          fullWidth={true}
                          className="text-xs sm:text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors py-1.5 sm:py-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="flex-shrink-0">
                  <SubmitButton
                    text="Login"
                    className="px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2.5 rounded-lg text-xs sm:text-sm md:text-base"
                  />
                </Link>
              )}

              {/* Mobile Menu Button - ✅ Fixed size */}
              <MobileNavBtn
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                isActive={isMenuOpen}
                icon={<FaBars className="text-gray-600" />}
                activeIcon={<FaTimes className="text-gray-600" />}
                size="text-xl sm:text-2xl"
                hoverBg="hover:bg-gray-100"
                ariaLabel="Toggle mobile menu"
              />
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown - ✅ Mobile optimized */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 bg-white/95 backdrop-blur-md animate-slideDown">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search courses, instructors..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors text-sm sm:text-base"
                  autoFocus
                  aria-label="Search"
                />
                <button
                  type="submit"
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                  aria-label="Submit search">
                  <FaSearch className="text-sm sm:text-base" />
                </button>
              </form>

              {searchQuery && (
                <div className="mt-2 text-xs sm:text-sm text-gray-500">
                  Press Enter to search or Escape to close
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu - ✅ Stays under navbar, scrollable */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md animate-slideDown">
            <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-2 sm:space-y-3 max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Navigation Links - ✅ Mobile optimized sizes */}
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }>
                  {item.label}
                </NavLink>
              ))}

              {/* Mobile Social Icons - ✅ Fixed sizes */}
              <div className="flex items-center justify-center space-x-3 sm:space-x-4 pt-4 sm:pt-6 border-t border-gray-200">
                {[
                  {
                    href: socialLinks.facebook,
                    icon: FaFacebookF,
                    color: 'blue',
                    label: 'Facebook',
                  },
                  {
                    href: socialLinks.twitter,
                    icon: FaTwitter,
                    color: 'sky',
                    label: 'Twitter',
                  },
                  {
                    href: socialLinks.google,
                    icon: FaGoogle,
                    color: 'red',
                    label: 'Google',
                  },
                  {
                    href: socialLinks.youtube,
                    icon: FaYoutube,
                    color: 'red',
                    label: 'YouTube',
                  },
                ].map(({ href, icon: Icon, color, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-${color}-100 hover:bg-${color}-200 text-${color}-600 transition-colors`}
                    aria-label={label}>
                    <Icon className="text-sm sm:text-base" />
                  </a>
                ))}
              </div>

              {/* Mobile Theme Toggle - ✅ Fixed size */}
              <div className="flex justify-center pt-3 sm:pt-4 min-h-[48px]">
                <Mood />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer - ✅ Fixed heights */}
      <div className="h-14 sm:h-16 md:h-20"></div>
    </>
  );
};

// Styles
const styles = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-slideDown {
    animation: slideDown 0.3s ease-out;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Navbar;
