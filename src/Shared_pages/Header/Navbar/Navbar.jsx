// import { useContext, useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import {
//   FaFacebookF,
//   FaGoogle,
//   FaTwitter,
//   FaYoutube,
//   FaBars,
//   FaTimes,
//   FaSearch,
// } from 'react-icons/fa';
// import logo from '../../../assets/website logo.png';
// import { AuthContext } from '../../../Provider/AuthProvider';
// import tippy from 'tippy.js';
// import 'tippy.js/dist/tippy.css';
// import Mood from './Mood';
// import DynamicDashboardLink from './DynamicDashboardLink';
// import MobileNavBtn, {
//   DesktopNavigation,
//   OutlineButton,
//   SubmitButton,
// } from '../../../Components/ui/Button';
// import OptimizedImage from '../../../Components/Shared/OptimizedImage';

// const Navbar = () => {
//   const { user, loggedOut } = useContext(AuthContext);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   console.log(user.photoURL);
//   const handleLogOut = () => {
//     loggedOut().then();
//   };

//   // Tooltip
//   const handleTooltip = () => {
//     tippy('#MyTool', {
//       content: user?.displayName || 'User',
//       placement: 'bottom',
//     });
//   };

//   const navItems = [
//     { path: '/', label: 'Home' },
//     { path: '/instructors', label: 'Instructors' },
//     { path: '/classes', label: 'Classes' },
//     { path: '/blog', label: 'Blog' },
//     { path: '/news', label: 'News' },
//     ...(user ? [{ path: '/wishlist', label: 'Wishlist' }] : []),
//   ];

//   return (
//     <>
//       {/* Main Navbar */}

//       <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between md:h-20 h-14">
//             {/* Logo */}
//             <Link to="/" className="flex-shrink-0">
//               <img className=" w-36 md:w-56 md:h-14" src={logo} alt="Logo" />
//             </Link>

//             {/* Desktop Navigation */}
//             <DesktopNavigation navItems={navItems} />

//             {/* Right Side Actions */}
//             <div className="flex items-center space-x-4">
//               {/* Search Button */}
//               <OutlineButton
//                 onClick={() => setIsSearchOpen(!isSearchOpen)}
//                 className="p-2  border-0 "
//                 aria-label="Search">
//                 <FaSearch className="text-gray-600 text-xl" />
//               </OutlineButton>

//               {/* Theme Toggle */}
//               <div className="hidden md:block">
//                 <Mood />
//               </div>

//               {/* Social Icons - Desktop */}
//               <div className="hidden lg:flex items-center space-x-3">
//                 <a
//                   href="#"
//                   className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
//                   aria-label="Facebook">
//                   <FaFacebookF className="text-sm" />
//                 </a>
//                 <a
//                   href="#"
//                   className="p-2 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-600 transition-colors"
//                   aria-label="Twitter">
//                   <FaTwitter className="text-sm" />
//                 </a>
//                 <a
//                   href="#"
//                   className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
//                   aria-label="Google">
//                   <FaGoogle className="text-sm" />
//                 </a>
//                 <a
//                   href="#"
//                   className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
//                   aria-label="YouTube">
//                   <FaYoutube className="text-sm" />
//                 </a>
//               </div>

//               {/* User Profile / Login */}
//               {user?.email ? (
//                 <div className="relative group">
//                   <button
//                     id="MyTool"
//                     onMouseEnter={handleTooltip}
//                     className="flex items-center space-x-2 focus:outline-none hover:!none">
//                     <div className="w-10 h-10 rounded-full border-2 border-indigo-600 overflow-hidden hover:border-purple-600 transition-colors">
//                       <OptimizedImage
//                         src={user?.photoURL}
//                         alt="Profile"
//                         aspectRatio="1/1"
//                       />
//                     </div>
//                   </button>
//                   {/* Dropdown Menu */}
//                   <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
//                     <div className="py-2">
//                       <div className="px-4 py-3 border-b border-gray-100">
//                         <p className="text-sm font-semibold text-gray-800">
//                           {user?.displayName || 'User'}
//                         </p>
//                         <p className="text-xs text-gray-500 truncate">{user?.email}</p>
//                       </div>

//                       <Link
//                         to="/profile"
//                         className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
//                         <span className="text-sm text-gray-700">Profile</span>
//                         <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold">
//                           New
//                         </span>
//                       </Link>
//                       <DynamicDashboardLink />
//                       <div className="border-t border-gray-100 mt-2 pt-2">
//                         <OutlineButton
//                           onClick={handleLogOut}
//                           text="Logout"
//                           fullWidth={true}
//                           className="text-sm text-red-600 hover:bg-red-500 transition-colors"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <Link to="/login">
//                   <SubmitButton text="Login" className="px-6 py-2.5 rounded-lg" />
//                 </Link>
//               )}

//               {/* Mobile Menu Button */}
//               <MobileNavBtn
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 isActive={isMenuOpen}
//                 icon={<FaBars className="text-gray-600" />}
//                 activeIcon={<FaTimes className="text-gray-600" />}
//                 size="text-2xl"
//                 hoverBg="hover:bg-gray-100"
//                 ariaLabel="Menu"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Search Bar Dropdown */}
//         {isSearchOpen && (
//           <div className="border-t border-gray-200 bg-white/95 backdrop-blur-md">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search courses, instructors..."
//                   className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
//                   autoFocus
//                 />
//                 <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
//             <div className="px-4 py-6 space-y-3">
//               {navItems.map(item => (
//                 <NavLink
//                   key={item.path}
//                   to={item.path}
//                   onClick={() => setIsMenuOpen(false)}
//                   className={({ isActive }) =>
//                     `block px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
//                       isActive
//                         ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
//                         : 'text-gray-700 hover:bg-gray-100'
//                     }`
//                   }>
//                   {item.label}
//                 </NavLink>
//               ))}

//               {/* Mobile Social Icons */}
//               <div className="flex items-center justify-center space-x-4 pt-6 border-t border-gray-200">
//                 <a
//                   href="#"
//                   className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors">
//                   <FaFacebookF />
//                 </a>
//                 <a
//                   href="#"
//                   className="p-3 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-600 transition-colors">
//                   <FaTwitter />
//                 </a>
//                 <a
//                   href="#"
//                   className="p-3 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors">
//                   <FaGoogle />
//                 </a>
//                 <a
//                   href="#"
//                   className="p-3 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors">
//                   <FaYoutube />
//                 </a>
//               </div>

//               {/* Mobile Theme Toggle */}
//               <div className="flex justify-center pt-4">
//                 <Mood />
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Spacer to prevent content from going under fixed navbar */}
//       <div className="h-20"></div>
//     </>
//   );
// };

// export default Navbar;
import { useContext, useState, useEffect } from 'react';
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
import OptimizedImage from '../../../Components/Shared/OptimizedImage';

const Navbar = () => {
  const { user, loggedOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Safe console.log for user photo
  useEffect(() => {
    if (user?.photoURL) {
      console.log('User Photo URL:', user.photoURL);
    }
  }, [user?.photoURL]);

  // ✅ Handle logout
  const handleLogOut = () => {
    loggedOut()
      .then(() => {
        console.log('User logged out successfully');
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  };

  // ✅ Tooltip initialization - only once, with cleanup
  useEffect(() => {
    if (user?.email) {
      const tooltip = tippy('#MyTool', {
        content: user?.displayName || 'User',
        placement: 'bottom',
        trigger: 'mouseenter focus',
      });

      return () => {
        tooltip.destroy();
      };
    }
  }, [user?.displayName, user?.email]);

  // ✅ Body scroll lock when mobile menu is open
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
      console.log('Searching for:', searchQuery);
      // TODO: Navigate to search page or filter results
      // navigate(`/search?q=${searchQuery}`);
      setIsSearchOpen(false);
    }
  };

  // ✅ Close search on Escape key
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

  // ✅ Social links - replace with your actual URLs
  const socialLinks = {
    facebook: 'https://facebook.com/yourpage',
    twitter: 'https://twitter.com/yourpage',
    google: 'https://google.com',
    youtube: 'https://youtube.com/yourchannel',
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between md:h-20 h-14">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                className="w-36 md:w-56 md:h-14 object-contain"
                src={logo}
                alt="Company Logo"
              />
            </Link>

            {/* Desktop Navigation */}
            <DesktopNavigation navItems={navItems} />

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <OutlineButton
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 border-0"
                aria-label="Search"
                aria-expanded={isSearchOpen}>
                <FaSearch className="text-gray-600 text-xl" />
              </OutlineButton>

              {/* Theme Toggle */}
              <div className="hidden md:block">
                <Mood />
              </div>

              {/* Social Icons - Desktop */}
              <div className="hidden lg:flex items-center space-x-3">
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
                  aria-label="Facebook">
                  <FaFacebookF className="text-sm" />
                </a>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-600 transition-colors"
                  aria-label="Twitter">
                  <FaTwitter className="text-sm" />
                </a>
                <a
                  href={socialLinks.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                  aria-label="Google">
                  <FaGoogle className="text-sm" />
                </a>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                  aria-label="YouTube">
                  <FaYoutube className="text-sm" />
                </a>
              </div>

              {/* User Profile / Login */}
              {user && user?.email ? (
                <div className="relative group">
                  <button
                    id="MyTool"
                    className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full"
                    aria-label="User menu">
                    <div className="w-10 h-10 rounded-full border-2 border-indigo-600 overflow-hidden hover:border-purple-600 transition-colors">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user?.displayName || 'User'}
                          className="w-full h-full object-cover"
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
                        <div className="w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                          {user?.displayName?.charAt(0)?.toUpperCase() ||
                            user?.email?.charAt(0)?.toUpperCase() ||
                            'U'}
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                    <div className="py-2">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {user?.displayName || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>

                      {/* Profile Link */}
                      <Link
                        to="/profile"
                        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
                        <span className="text-sm text-gray-700">Profile</span>
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold">
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
                          className="text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors py-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <SubmitButton text="Login" className="px-6 py-2.5 rounded-lg" />
                </Link>
              )}

              {/* Mobile Menu Button */}
              <MobileNavBtn
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                isActive={isMenuOpen}
                icon={<FaBars className="text-gray-600" />}
                activeIcon={<FaTimes className="text-gray-600" />}
                size="text-2xl"
                hoverBg="hover:bg-gray-100"
                ariaLabel="Toggle mobile menu"
              />
            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="border-t border-gray-200 bg-white/95 backdrop-blur-md animate-slideDown">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search courses, instructors, topics..."
                  className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                  autoFocus
                  aria-label="Search"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                  aria-label="Submit search">
                  <FaSearch />
                </button>
              </form>

              {/* Search suggestions (optional) */}
              {searchQuery && (
                <div className="mt-2 text-sm text-gray-500">
                  Press Enter to search or Escape to close
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md animate-slideDown">
            <div className="px-4 py-6 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {/* Navigation Links */}
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }>
                  {item.label}
                </NavLink>
              ))}

              {/* Mobile Social Icons */}
              <div className="flex items-center justify-center space-x-4 pt-6 border-t border-gray-200">
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
                  aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-600 transition-colors"
                  aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a
                  href={socialLinks.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                  aria-label="Google">
                  <FaGoogle />
                </a>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                  aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>

              {/* Mobile Theme Toggle */}
              <div className="flex justify-center pt-4">
                <Mood />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-14 md:h-20"></div>
    </>
  );
};

// Add styles at the end of the file
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
