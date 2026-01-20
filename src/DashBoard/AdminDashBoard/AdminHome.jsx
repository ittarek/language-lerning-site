import { useState,  } from 'react';
import {
    FaUsers,
    FaBookOpen,
    FaCalendarAlt,
    FaDollarSign,
    FaArrowUp,
    FaChartLine,
    FaChalkboardTeacher,
    FaEye,
    FaEdit,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    const [stats, setStats] = useState({
        totalUsers: 1248,
        totalClasses: 45,
        totalEvents: 23,
        revenue: 45680,
        newUsersToday: 24,
        activeClasses: 38,
        upcomingEvents: 12,
        monthlyRevenue: 15420
    });

    // Mock data for charts and tables
    const recentUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', date: '2025-01-02', status: 'Active' },
        { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'Instructor', date: '2025-01-02', status: 'Active' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Student', date: '2025-01-01', status: 'Active' },
        { id: 4, name: 'Emily Brown', email: 'emily@example.com', role: 'Student', date: '2025-01-01', status: 'Pending' },
        { id: 5, name: 'David Lee', email: 'david@example.com', role: 'Instructor', date: '2024-12-31', status: 'Active' }
    ];

    const popularClasses = [
        { id: 1, name: 'Spanish for Beginners', students: 156, instructor: 'Maria Garcia', status: 'Active' },
        { id: 2, name: 'Advanced French', students: 128, instructor: 'Pierre Dubois', status: 'Active' },
        { id: 3, name: 'Japanese Fundamentals', students: 112, instructor: 'Yuki Tanaka', status: 'Active' },
        { id: 4, name: 'German Conversation', students: 98, instructor: 'Hans Mueller', status: 'Active' },
        { id: 5, name: 'Italian Basics', students: 87, instructor: 'Giuseppe Rossi', status: 'Active' }
    ];

    const upcomingEvents = [
        { id: 1, name: 'Spanish Conversation Night', date: '2025-01-15', attendees: 45, type: 'Virtual' },
        { id: 2, name: 'French Workshop', date: '2025-01-18', attendees: 32, type: 'In-Person' },
        { id: 3, name: 'Language Exchange Fair', date: '2025-01-22', attendees: 89, type: 'In-Person' }
    ];

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-600 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <FaUsers className="text-2xl text-indigo-600" />
              </div>
              <span className="flex items-center text-green-600 text-sm font-semibold">
                <FaArrowUp className="mr-1" />
                12.5%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Users</h3>
            <p className="text-3xl font-bold text-gray-800">
              {stats.totalUsers.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">+{stats.newUsersToday} new today</p>
          </div>

          {/* Total Classes Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaBookOpen className="text-2xl text-purple-600" />
              </div>
              <span className="flex items-center text-green-600 text-sm font-semibold">
                <FaArrowUp className="mr-1" />
                8.2%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Classes</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.totalClasses}</p>
            <p className="text-xs text-gray-500 mt-2">{stats.activeClasses} active</p>
          </div>

          {/* Events Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaCalendarAlt className="text-2xl text-blue-600" />
              </div>
              <span className="flex items-center text-green-600 text-sm font-semibold">
                <FaArrowUp className="mr-1" />
                15.3%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Events</h3>
            <p className="text-3xl font-bold text-gray-800">{stats.totalEvents}</p>
            <p className="text-xs text-gray-500 mt-2">{stats.upcomingEvents} upcoming</p>
          </div>

          {/* Revenue Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaDollarSign className="text-2xl text-green-600" />
              </div>
              <span className="flex items-center text-green-600 text-sm font-semibold">
                <FaArrowUp className="mr-1" />
                23.1%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-800">
              ${stats.revenue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              ${stats.monthlyRevenue.toLocaleString()} this month
            </p>
          </div>
        </div>

        {/* Charts and Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Overview</h2>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>

            {/* Mock Chart Visualization */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      New Students
                    </span>
                    <span className="text-sm font-bold text-gray-800">245</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Active Classes
                    </span>
                    <span className="text-sm font-bold text-gray-800">38</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: '84%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Completed Events
                    </span>
                    <span className="text-sm font-bold text-gray-800">67</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Revenue Goal
                    </span>
                    <span className="text-sm font-bold text-gray-800">$45,680</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: '68%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link to={`/dashboard/manageClasses`}>
                <button className="w-full flex items-center gap-3 p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors group">
                  <div className="p-2 bg-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                    <FaUsers className="text-white" />
                  </div>
                  <span className="font-medium text-gray-700">Manage Users</span>
                </button>
              </Link>

              <Link to={`/dashboard/manageUsers`}>
                <button className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group">
                  <div className="p-2 bg-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                    <FaBookOpen className="text-white" />
                  </div>
                  <span className="font-medium text-gray-700">Manage Classes</span>
                </button>
              </Link>

              <button className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
                <div className="p-2 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                  <FaCalendarAlt className="text-white" />
                </div>
                <span className="font-medium text-gray-700">Manage Events</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group">
                <div className="p-2 bg-green-600 rounded-lg group-hover:scale-110 transition-transform">
                  <FaChartLine className="text-white" />
                </div>
                <span className="font-medium text-gray-700">View Analytics</span>
              </button>

              <Link to={`/dashboard/manageInstructors`}>
                <button className="w-full flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group">
                  <div className="p-2 bg-orange-600 rounded-lg group-hover:scale-110 transition-transform">
                    <FaChalkboardTeacher className="text-white" />
                  </div>
                  <span className="font-medium text-gray-700">Instructors</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Users</h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                View All →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">
                      Name
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">
                      Role
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">
                      Status
                    </th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map(user => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            user.role === 'Instructor'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            user.status === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-2">
                          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                            <FaEye className="text-sm" />
                          </button>
                          <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                            <FaEdit className="text-sm" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popular Classes */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Popular Classes</h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {popularClasses.map(classItem => (
                <div
                  key={classItem.id}
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{classItem.name}</p>
                    <p className="text-xs text-gray-500">{classItem.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600">{classItem.students}</p>
                    <p className="text-xs text-gray-500">students</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
};

export default AdminHome;