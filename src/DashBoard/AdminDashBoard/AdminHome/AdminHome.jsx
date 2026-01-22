import { useState } from 'react';
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
import { Overview } from './Overview';
import { QuickActions } from './QuickActions';
import { RecentUsers } from './RecentUsers';

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 1248,
    totalClasses: 45,
    totalEvents: 23,
    revenue: 45680,
    newUsersToday: 24,
    activeClasses: 38,
    upcomingEvents: 12,
    monthlyRevenue: 15420,
  });


  const popularClasses = [
    {
      id: 1,
      name: 'Spanish for Beginners',
      students: 156,
      instructor: 'Maria Garcia',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Advanced French',
      students: 128,
      instructor: 'Pierre Dubois',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Japanese Fundamentals',
      students: 112,
      instructor: 'Yuki Tanaka',
      status: 'Active',
    },
    {
      id: 4,
      name: 'German Conversation',
      students: 98,
      instructor: 'Hans Mueller',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Italian Basics',
      students: 87,
      instructor: 'Giuseppe Rossi',
      status: 'Active',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: 'Spanish Conversation Night',
      date: '2025-01-15',
      attendees: 45,
      type: 'Virtual',
    },
    {
      id: 2,
      name: 'French Workshop',
      date: '2025-01-18',
      attendees: 32,
      type: 'In-Person',
    },
    {
      id: 3,
      name: 'Language Exchange Fair',
      date: '2025-01-22',
      attendees: 89,
      type: 'In-Person',
    },
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
        <Overview />

        {/* Quick Actions */}
    <QuickActions/>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
 <RecentUsers/>

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
