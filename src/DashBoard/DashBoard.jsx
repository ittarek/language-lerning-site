import { Helmet } from "react-helmet-async";
import { NavLink, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import {
    FaHome,
    FaUser,
    FaBookOpen,
    FaHistory,
    FaChalkboardTeacher,
    FaUserShield,
    FaPlus,
    FaTasks,
    FaGraduationCap,
    FaBars,
    FaTimes,
    FaSignOutAlt
} from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";
import useInstructors from "../Hooks/useInstructor";
import Spinner from "../Components/Spinner";
import { AuthContext } from "../Provider/AuthProvider";


const DashBoard = () => {
    const { user, loggedOut } = useContext(AuthContext);
    const [isInstructor] = useInstructors();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        loggedOut();
    };

    if (isAdminLoading) {
        return <Spinner />;
    }

    // Define menu items based on user role
    const getMenuItems = () => {
        if (isAdmin && !isInstructor) {
            return {
                role: "Admin",
                roleIcon: <FaUserShield className="text-2xl" />,
                items: [
                    { to: "adminHome", icon: <FaHome />, label: "Admin Home" },
                    { to: "manageClasses", icon: <FaTasks />, label: "Manage Classes" },
                    { to: "manageUsers", icon: <FaUser />, label: "Manage Users" },
                ]
            };
        } else if (isInstructor && !isAdmin) {
            return {
                role: "Instructor",
                roleIcon: <FaChalkboardTeacher className="text-2xl" />,
                items: [
                    { to: "instructorHome", icon: <FaHome />, label: "Instructor Home" },
                    { to: "addClass", icon: <FaPlus />, label: "Add A Class" },
                    { to: "myAddedClasses", icon: <FaBookOpen />, label: "My Classes" },
                ]
            };
        } else {
            return {
                role: "Student",
                roleIcon: <FaGraduationCap className="text-2xl" />,
                items: [
                    { to: "studentHome", icon: <FaHome />, label: "Student Home" },
                    { to: "mySelectedClasses", icon: <FaBookOpen />, label: "My Selected Classes" },
                    { to: "myEnroll", icon: <FaGraduationCap />, label: "My Enrolled Classes" },
                    { to: "paymentHistory", icon: <FaHistory />, label: "Payment History" },
                ]
            };
        }
    };

    const menuData = getMenuItems();

    return (
        <div className="min-h-screen bg-gray-50  ">
            <Helmet>
                <title>Language Learner | Dashboard</title>
            </Helmet>

            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside
                    className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-indigo-600 to-purple-700 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                        }`}
                >
                    <div className="flex flex-col h-full">
                        {/* Sidebar Header */}
                        <div className="p-6 border-b border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="lg:hidden text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {/* User Profile Card */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-semibold truncate">
                                            {user?.displayName || 'User'}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {menuData.roleIcon}
                                            <span className="text-white/80 text-sm">{menuData.role}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="flex-1 overflow-y-auto py-6 px-4">
                            <div className="space-y-2">
                                {menuData.items.map((item, index) => (
                                    <NavLink
                                        key={index}
                                        to={item.to}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                                ? 'bg-white text-indigo-600 shadow-lg scale-105'
                                                : 'text-white/90 hover:bg-white/10 hover:translate-x-1'
                                            }`
                                        }
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="font-medium">{item.label}</span>
                                    </NavLink>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="my-6 border-t border-white/10"></div>

                            {/* Common Links */}
                            <div className="space-y-2">
                                <NavLink
                                    to="/"
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 hover:translate-x-1 transition-all duration-300"
                                >
                                    <FaHome className="text-xl" />
                                    <span className="font-medium">Home</span>
                                </NavLink>
                                <NavLink
                                    to="/classes"
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 hover:bg-white/10 hover:translate-x-1 transition-all duration-300"
                                >
                                    <FaBookOpen className="text-xl" />
                                    <span className="font-medium">Classes</span>
                                </NavLink>
                            </div>
                        </nav>

                        {/* Logout Button */}
                        <div className="p-4 border-t border-white/10">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    {/* Top Bar */}
                    <div className="bg-white shadow-md sticky top-0 z-30">
                        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="lg:hidden text-gray-600 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <FaBars className="text-xl" />
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="hidden sm:block">
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        {menuData.role} Dashboard
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        Welcome back, {user?.displayName || 'User'}!
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* User Avatar - Desktop */}
                                <div className="hidden lg:flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-800">
                                            {user?.displayName || 'User'}
                                        </p>
                                        <p className="text-xs text-gray-600">{menuData.role}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold">
                                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

             

                    {/* Page Content */}
                    <div className="p-4 sm:p-6 lg:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashBoard;