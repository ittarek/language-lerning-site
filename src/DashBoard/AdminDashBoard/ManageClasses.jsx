import React, { useState, useMemo } from 'react';
import useClass from '../../Hooks/useClass';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { MdCheckCircle, MdCancel, MdEdit, MdFeedback } from 'react-icons/md';
import { getApiUrl } from '../../config/api/Config';

const ManageClasses = () => {
  const [classes, , refetch] = useClass();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const API_URL = getApiUrl();
  // Filter and search logic
  const filteredClasses = useMemo(() => {
    let result = classes;

    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter(cls => cls.status === filterStatus);
    }

    // Search by class name or instructor
    if (searchTerm) {
      result = result.filter(
        cls =>
          cls.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cls.instructor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cls.instructor_email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'recent') {
      result = [...result].reverse();
    }

    return result;
  }, [classes, searchTerm, filterStatus, sortBy]);

  const handleApprove = myClass => {
    // শেষের 24 character নিন
    let classId = String(myClass._id).trim();

    // যদি 24 এর বেশি হয় তাহলে প্রথম 24টা নিন
    if (classId.length > 24) {
      classId = classId.substring(0, 24);
    }

    Swal.fire({
      title: 'Approve Class?',
      text: `Are you sure you want to approve "${myClass.class_name}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, Approve!',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/AllClasses/approve/${classId}`, {
          method: 'PATCH',
        })
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json(); // এটা করতে হবে!
            console.log(res);
          })

          .then(data => {
            console.log('Parsed Data:', data); // এখন actual data পাবেন

            if (data.error) {
              toast.error(data.message, { position: 'top-right' });
              return;
            }

            // MongoDB update response check করুন
            if (data.modifiedCount > 0) {
              refetch(); // Data reload করুন
              toast.success('Class approved successfully!', {
                position: 'top-right',
              });
            } else if (data.matchedCount > 0) {
              toast.info('Class was already approved', {
                position: 'top-right',
              });
            } else {
              toast.warning('Class not found', {
                position: 'top-right',
              });
            }
          })
          .catch(error => {
            toast.error('Failed to approve class', {
              position: 'top-right',
            });
            console.error(error);
          });
      }
    });
  };
  const handleDenied = myClass => {
    Swal.fire({
      title: 'Deny Class?',
      text: `Are you sure you want to deny "${myClass.class_name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Deny!',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/AllClasses/deny/${myClass._id}`, {
          method: 'PATCH',
        })
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount) {
              refetch();
              toast.success('Class denied successfully!', {
                position: 'top-right',
              });
            }
          })
          .catch(error => {
            toast.error('Failed to deny class', {
              position: 'top-right',
            });
            console.error(error);
          });
      }
    });
  };

  const getStatusBadge = status => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
            ✓ Approved
          </span>
        );
      case 'denied':
        return (
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
            ✗ Denied
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
            ⏳ Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Classes</h1>
          <p className="text-gray-600">
            Total Classes: <span className="font-semibold">{classes.length}</span>
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
              <input
                type="text"
                placeholder="Search by class name or instructor..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter by Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="denied">Denied</option>
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
          {filteredClasses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Class Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Instructor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Seats
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredClasses.map((myClass, index) => (
                    <tr key={myClass._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <img
                          src={myClass?.class_imgUrl}
                          alt={myClass?.class_name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {myClass.class_name}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">
                            {myClass?.instructor_name}
                          </p>
                          <p className="text-gray-500">{myClass?.instructor_email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {myClass?.available_seats}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        ${myClass?.price}
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(myClass.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(myClass)}
                            disabled={myClass.status === 'approved'}
                            title="Approve Class"
                            className={`p-2 rounded-lg transition-colors ${
                              myClass.status === 'approved'
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                            }`}>
                            <MdCheckCircle size={20} />
                          </button>

                          <button
                            onClick={() => handleDenied(myClass)}
                            disabled={myClass.status === 'denied'}
                            title="Deny Class"
                            className={`p-2 rounded-lg transition-colors ${
                              myClass.status === 'denied'
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-red-100 text-red-600 hover:bg-red-200'
                            }`}>
                            <MdCancel size={20} />
                          </button>

                          <Link
                            to={`adminFeedBack/${myClass._id}`}
                            title="Send Feedback"
                            className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                            <MdFeedback size={20} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500 text-lg">No classes found</p>
            </div>
          )}
        </div>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default ManageClasses;
