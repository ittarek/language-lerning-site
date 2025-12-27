// import React, { useContext } from "react";

// import { Link, NavLink } from "react-router-dom";
// import { FaFacebookF, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
// import logo from "../../../assets/website logo.png";
// import { AuthContext } from "../../../Provider/AuthProvider";
// import tippy from "tippy.js";
// import "tippy.js/dist/tippy.css";
// import Mood from "./Mood";

// const Navbar = () => {
//     const { user, loggedOut } = useContext(AuthContext);
//     const referrerPolicy = "no-referre";
//     const handleLogOut = () => {
//         loggedOut().then();
//     };

//     // tooltip
//     const handleToltip = () => {
//         tippy("#MyTool", {
//             content: user?.displayName || "NoName",
//         });
//     };
//     const navItems = (
//         <>
//             <li>
//                 <NavLink to="/">Home</NavLink>
//             </li>
//             <li>
//                 {" "}
//                 <NavLink to="/instructors">Instructor</NavLink>
//             </li>
//             <li>
//                 {" "}
//                 <NavLink to="/classes">Classes</NavLink>
//             </li>
//             <li>
//                 {" "}
//                 <NavLink to="/blog">Blog</NavLink>
//             </li>
//             <li>
//                 {" "}
//                 <NavLink to="/news">Daily News</NavLink>
//             </li>
//         </>
//     );

//     return (
//         <div className="head-navbar   ">
//             <div className="navbar  fixed left-0  top-0 z-50 bg-slate-400 px-4 mx-0">
//                 <div className="flex-1">
//                     <Link to="/" className="">
//                         {" "}
//                         <img className=" md:w-auto w-[160px]" src={logo} alt="logo" />
//                     </Link>
//                 </div>
//                 <div className="flex-none gap-2">
//                     <div className="form-control">
//                         <input
//                             type="text"
//                             placeholder="Search"
//                             className="input input-bordered w-24 md:w-auto"
//                         />
//                     </div>{" "}
//                     {user?.email ? (
//                         ""
//                     ) : (
//                         <button className="btn">
//                             <Link to="/login">Login</Link>
//                         </button>
//                     )}
//                     <div className="dropdown dropdown-end">
//                         {user?.email && (
//                             <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
//                                 {" "}
//                                 <div
//                                     className="w-10 rounded-full"
//                                     id="MyTool"
//                                     onMouseOver={handleToltip}
//                                 >
//                                     {
//                                         <img
//                                             src={user?.photoURL ? user?.photoURL : referrerPolicy}
//                                         />
//                                     }
//                                 </div>{" "}
//                             </label>
//                         )}

//                         <ul
//                             tabIndex={0}
//                             className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-slate-700 rounded-box w-52 text-white "
//                         >
//                             <li>
//                                 <Link className="justify-between">
//                                     Profile
//                                     <span className="badge">New</span>
//                                 </Link>
//                             </li>
//                             {user?.email && (
//                                 <li>
//                                     <Link to="/dashboard">DashBoard</Link>
//                                 </li>
//                             )}
//                             {user?.email ? (
//                                 <li>
//                                     <button onClick={handleLogOut}>
//                                         {" "}
//                                         <Link>Logout</Link>
//                                     </button>
//                                 </li>
//                             ) : (
//                                 <li>
//                                     {" "}
//                                     <Link to="/login">Login</Link>
//                                 </li>
//                             )}

//                             {/* displayName */}
//                         </ul>
//                     </div>
//                 </div>{" "}
//                 <li>
//                     <Mood></Mood>
//                 </li>
//             </div>
//             {/* navbar main */}
//             <div className="navbar top-10 z-10 bg-opacity-30 absolute font-bold  text-white">
//                 <div className="dropdown">
//                     <label tabIndex={0} className="btn btn-ghost lg:hidden">
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-5 w-5 bg-green-800 text-white
           
                
                
                
//   "
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M4 6h16M4 12h8m-8 6h16"
//                             />
//                         </svg>
//                     </label>
//                     <ul
//                         tabIndex={0}
//                         className="menu menu-sm dropdown-content  mt-3 p-2 shadow bg-slate-700 rounded-box w-52 text-white  "
//                     >
//                         {navItems}
//                     </ul>
//                 </div>

//                 <div className="navbar">
//                     <div className=" w-full flex justify-between items-center">
//                         <div className=" hidden  lg:flex ">
//                             <ul className="menu menu-horizontal my-auto  text-white  text-xl">
//                                 {navItems}
//                             </ul>
//                         </div>
//                         <div className="text-white flex mr-10">
//                             <Link className="mx-4">
//                                 {" "}
//                                 <FaFacebookF></FaFacebookF>
//                             </Link>
//                             <Link className="mx-4">
//                                 {" "}
//                                 <FaTwitter></FaTwitter>
//                             </Link>
//                             <Link className="mx-4">
//                                 {" "}
//                                 <FaGoogle></FaGoogle>
//                             </Link>
//                             <Link className="mx-4">
//                                 {" "}
//                                 <FaYoutube></FaYoutube>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;


import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaTwitter, FaYoutube, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import logo from "../../../assets/website logo.png";
import { AuthContext } from "../../../Provider/AuthProvider";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import Mood from "./Mood";

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
                    <div className="flex items-center justify-between h-20">

                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0">
                            <img
                                className="h-12 w-auto md:h-14"
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

                                            <Link
                                                to="/dashboard"
                                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                Dashboard
                                            </Link>

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