import { Helmet } from 'react-helmet-async';
import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
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
  FaSignOutAlt,
} from 'react-icons/fa';
import useAdmin from '../Hooks/useAdmin';
import useInstructors from '../Hooks/useInstructor';
import Spinner from '../Components/Spinner/Spinner';
import { AuthContext } from '../Provider/AuthProvider';

const DashBoard = () => {
  const { user, loggedOut, spinner } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInstructor, isInstructorsLoading] = useInstructors();
  const [isAdmin, isAdminLoading] = useAdmin();

  if (spinner) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (isAdminLoading || isInstructorsLoading) {
    return <Spinner />;
  }

  const handleLogout = async () => {
    await loggedOut();
    navigate('/', { replace: true });
  };
  const getMenuItems = () => {
    if (isAdmin && !isInstructor) {
      return {
        role: 'admin',
        roleIcon: <FaUserShield className="text-2xl" />,
        items: [
          { to: 'adminHome', icon: <FaHome />, label: 'Admin Home' },
          { to: 'manageClasses', icon: <FaTasks />, label: 'Manage Classes' },
          { to: 'manageUsers', icon: <FaUser />, label: 'Manage Users' },
        ],
      };
    }

    if (isInstructor && !isAdmin) {
      return {
        role: 'instructor',
        roleIcon: <FaChalkboardTeacher className="text-2xl" />,
        items: [
          { to: 'instructorHome', icon: <FaHome />, label: 'Instructor Home' },
          { to: 'addClass', icon: <FaPlus />, label: 'Add A Class' },
          { to: 'myAddedClasses', icon: <FaBookOpen />, label: 'My Classes' },
        ],
      };
    }

    return {
      role: 'student',
      roleIcon: <FaGraduationCap className="text-2xl" />,
      items: [
        { to: 'studentHome', icon: <FaHome />, label: 'Student Home' },
        { to: 'mySelectedClasses', icon: <FaBookOpen />, label: 'My Selected Classes' },
        { to: 'myEnroll', icon: <FaGraduationCap />, label: 'My Enrolled Classes' },
        { to: 'paymentHistory', icon: <FaHistory />, label: 'Payment History' },
      ],
    };
  };

  const menuData = getMenuItems();

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Language Learner | Dashboard</title>
      </Helmet>

      <div className="flex h-screen overflow-hidden">
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-indigo-600 to-purple-700 transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10">
                  <FaTimes />
                </button>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold">
                    {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="text-white font-semibold">
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

            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
              {menuData.items.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-white text-indigo-600 shadow-lg'
                        : 'text-white/90 hover:bg-white/10'
                    }`
                  }>
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
              <NavLink
                to="/classes"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-lg'
                      : 'text-white/90 hover:bg-white/10'
                  }`
                }>
                {' '}
                <span className="text-xl">✍️</span>
                <span>Classes</span>
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-white text-indigo-600 shadow-lg'
                      : 'text-white/90 hover:bg-white/10'
                  }`
                }>
                {' '}
                <span className="text-xl">🏠</span>
                <span>Home</span>
              </NavLink>
            </nav>

            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-auto">
          <div className="bg-white shadow-md sticky top-0 z-30 px-4 py-4 flex justify-between items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <FaBars />
            </button>
            <h1 className="text-xl font-bold">{menuData.role} Dashboard</h1>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
