import React from 'react';
import {
  FaBookOpen,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaChartLine,
  FaUsers,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const QuickActions = () => {
  return (
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

        <Link to={`/dashboard/manageEvents`}>
          {' '}
          <button className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
            <div className="p-2 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
              <FaCalendarAlt className="text-white" />
            </div>
            <span className="font-medium text-gray-700">Manage Events</span>
          </button>
        </Link>

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
  );
};
