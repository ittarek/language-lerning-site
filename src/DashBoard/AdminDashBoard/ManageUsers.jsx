import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useState, useMemo } from 'react';
import { MdAdminPanelSettings, MdSchool, MdSearch } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import { getApiUrl } from '../../config/api/Config';

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const API_URL = getApiUrl();
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery(['users'], async () => {
    const res = await axiosSecure.get('/users');
    return res.data;
  });

  const userMap = users.map(user => {
    return user;
  });


  // Filter and search logic
  const filteredUsers = useMemo(() => {
    let result = users;
console.log(result);

    // Filter by role
    if (filterRole !== 'all') {
      result = result.filter(user => user.roll || user.role === filterRole);
      console.log(filterRole);
      
    }

    // Search by name or email
    if (searchTerm) {

      
      result = result.filter(
        user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );


      
    }

    // Sort
    if (sortBy === 'recent') {
      result = [...result].reverse();
    }

    return result;
  }, [users, searchTerm, filterRole, sortBy]);

  // Make admin
  const handleMakeAdmin = user => {
    Swal.fire({
      title: 'Make Admin?',
      text: `Are you sure you want to make ${user.name} an admin?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Make Admin!',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/users/admin/${user._id}`, {
          method: 'PATCH',
        })
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount) {
              refetch();
              toast.success(`${user.name} is now an Admin!`, {
                position: 'top-right',
              });
            }
          })
          .catch(error => {
            toast.error('Failed to make admin', { position: 'top-right' });
            console.error(error);
          });
      }
    });
  };

  // Make instructor
  const handleMakeInstructor = user => {
    Swal.fire({
      title: 'Make Instructor?',
      text: `Are you sure you want to make ${user.name} an instructor?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Make Instructor!',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/users/instructor/${user._id}`, {
          method: 'PATCH',
        })
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount) {
              refetch();
              toast.success(`${user.name} is now an Instructor!`, {
                position: 'top-right',
              });
            }
          })
          .catch(error => {
            toast.error('Failed to make instructor', { position: 'top-right' });
            console.error(error);
          });
      }
    });
  };

  // Get role badge
  const getRoleBadge = roll => {
    switch (roll) {
      case 'admin':
        return (
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 flex items-center gap-2 w-fit">
            <MdAdminPanelSettings size={18} />
            Admin
          </span>
        );
      case 'instructor':
        return (
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 flex items-center gap-2 w-fit">
            <MdSchool size={18} />
            Instructor
          </span>
        );
      default:
        return (
          <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
            Student
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Users</h1>
          <p className="text-gray-600">
            Total Users:{' '}
            <span className="font-semibold text-lg text-blue-600">{users?.length}</span>
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <MdSearch className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter by Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Role
              </label>
              <select
                value={filterRole}
                onChange={e => setFilterRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Roles</option>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="recent">Recent First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Photo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Current Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Make Admin
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Make Instructor
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <img
                          src={user?.PhotoURL}
                          alt={user?.name}
                          className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </td>
                      <td className="px-6 py-4">{getRoleBadge(user.roll)}</td>
                      <td className="px-6 py-4">
                        {user.roll === 'admin' ? (
                          <span className="px-3 py-1 text-xs font-semibold text-gray-500">
                            Already Admin
                          </span>
                        ) : (
                          <button
                            onClick={() => handleMakeAdmin(user)}
                            className="px-4 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors font-medium text-sm">
                            Make Admin
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {user.roll === 'instructor' ? (
                          <span className="px-3 py-1 text-xs font-semibold text-gray-500">
                            Already Instructor
                          </span>
                        ) : (
                          <button
                            onClick={() => handleMakeInstructor(user)}
                            className="px-4 py-2 rounded-lg bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors font-medium text-sm">
                            Make Instructor
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-lg">No users found</p>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default ManageUsers;
