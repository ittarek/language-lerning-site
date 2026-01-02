

import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaTwitter, FaYoutube, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import logo from "../../../assets/website logo.png";
import { AuthContext } from "../../../Provider/AuthProvider";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import Mood from "./Mood";
import GlassNavigation from "../../../Testing/GlassNavigation";
import DynamicDashboardLink from "./DynamicDashboardLink";

const Navbar = () => {
    const { user, loggedOut } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleLogOut = () => {
        loggedOut().then();
    };

    // Tooltip
    const handleTooltip = () => {
        tippy("#MyTool", {
            content: user?.displayName || "User",
            placement: "bottom",
        });
    };

    const navItems = [
        { path: "/", label: "Home" },
        { path: "/instructors", label: "Instructors" },
        { path: "/classes", label: "Classes" },
        { path: "/blog", label: "Blog" },
        { path: "/news", label: "News" },
    ];

    return (
        <>
            {/* Main Navbar */}
      
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between md:h-20 h-14">

                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0">
                            <img
                                className=" w-36 md:w-auto md:h-14"
                                src={logo}
                                alt="Logo"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${isActive
                                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center space-x-4">

                            {/* Search Button */}
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                aria-label="Search"
                            >
                                <FaSearch className="text-gray-600 text-xl" />
                            </button>

                            {/* Theme Toggle */}
                            <div className="hidden md:block">
                                <Mood />
                            </div>

                            {/* Social Icons - Desktop */}
                            <div className="hidden lg:flex items-center space-x-3">
                                <a
                                    href="#"
                                    className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
                                    aria-label="Facebook"
                                >
                                    <FaFacebookF className="text-sm" />
                                </a>
                                <a
                                    href="#"
                                    className="p-2 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-600 transition-colors"
                                    aria-label="Twitter"
                                >
                                    <FaTwitter className="text-sm" />
                                </a>
                                <a
                                    href="#"
                                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                                    aria-label="Google"
                                >
                                    <FaGoogle className="text-sm" />
                                </a>
                                <a
                                    href="#"
                                    className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                                    aria-label="YouTube"
                                >
                                    <FaYoutube className="text-sm" />
                                </a>
                            </div>

                            {/* User Profile / Login */}
                            {user?.email ? (
                                <div className="relative group">
                                    <button
                                        id="MyTool"
                                        onMouseEnter={handleTooltip}
                                        className="flex items-center space-x-2 focus:outline-none"
                                    >
                                        <div className="w-10 h-10 rounded-full border-2 border-indigo-600 overflow-hidden hover:border-purple-600 transition-colors">
                                            <img
                                                src={user?.photoURL || "https://via.placeholder.com/150"}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                                        <div className="py-2">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {user?.displayName || "User"}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {user?.email}
                                                </p>
                                            </div>

                                            <Link
                                                to="/profile"
                                                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                                            >
                                                <span className="text-sm text-gray-700">Profile</span>
                                                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold">
                                                    New
                                                </span>
                                            </Link>
                                            <DynamicDashboardLink />
                                            {/* <Link
                                                to="/dashboard"
                                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                Dashboard
                                            </Link> */}

                                            <div className="border-t border-gray-100 mt-2 pt-2">
                                                <button
                                                    onClick={handleLogOut}
                                                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login">
                                    <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg">
                                        Login
                                    </button>
                                </Link>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                aria-label="Menu"
                            >
                                {isMenuOpen ? (
                                    <FaTimes className="text-gray-600 text-2xl" />
                                ) : (
                                    <FaBars className="text-gray-600 text-2xl" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Bar Dropdown */}
                {isSearchOpen && (
                    <div className="border-t border-gray-200 bg-white/95 backdrop-blur-md">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search courses, instructors..."
                                    className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-colors"
                                    autoFocus
                                />
                                <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
                        <div className="px-4 py-6 space-y-3">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${isActive
                                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}

                            {/* Mobile Social Icons */}
                            <div className="flex items-center justify-center space-x-4 pt-6 border-t border-gray-200">
                                <a
                                    href="#"
                                    className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
                                >
                                    <FaFacebookF />
                                </a>
                                <a
                                    href="#"
                                    className="p-3 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-600 transition-colors"
                                >
                                    <FaTwitter />
                                </a>
                                <a
                                    href="#"
                                    className="p-3 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                                >
                                    <FaGoogle />
                                </a>
                                <a
                                    href="#"
                                    className="p-3 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                                >
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
            <div className="h-20"></div>
        </>
    );
};

export default Navbar;