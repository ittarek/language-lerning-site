import React from 'react';
import { FaEdit, FaEye } from 'react-icons/fa';
// Mock data for charts and tables
const recentUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Student',
    date: '2025-01-02',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    role: 'Instructor',
    date: '2025-01-02',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Student',
    date: '2025-01-01',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Emily Brown',
    email: 'emily@example.com',
    role: 'Student',
    date: '2025-01-01',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'David Lee',
    email: 'david@example.com',
    role: 'Instructor',
    date: '2024-12-31',
    status: 'Active',
  },
];

export const RecentUsers = () => {
  return (
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
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
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
  );
};
