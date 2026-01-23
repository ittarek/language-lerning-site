import { useState, useEffect } from 'react';
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
  FiUser,
  FiBook,
  FiCheckCircle,
  FiXCircle,
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
  FiArrowUp,
  FiArrowDown,
  FiRefreshCw,
} from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import mockData from './mockData.json';
import { FilterSearch } from './FilterSearch';
import { StatsCards } from './StatsCards';
export const ManageInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phone: '',
    subject: '',
    photoURL: '',
    status: 'active',
  });

  // Simulated API call - Replace with your actual API/Firebase call
  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    setLoading(true);
    try {
      // Replace this with your actual API call
      // const response = await fetch('YOUR_API_ENDPOINT/instructors');
      // const data = await response.json();

      // Mock data for demonstration
      setInstructors(mockData);
    } catch (error) {
      console.error('Error fetching instructors:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtering
  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch =
      instructor.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || instructor.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Sorting
  const sortedInstructors = [...filteredInstructors].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInstructors = sortedInstructors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedInstructors.length / itemsPerPage);

  const handleSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleAddNew = () => {
    setEditingInstructor(null);
    setFormData({
      displayName: '',
      email: '',
      phone: '',
      subject: '',
      photoURL: '',
      status: 'active',
    });
    setShowModal(true);
  };

  const handleEdit = instructor => {
    setEditingInstructor(instructor);
    setFormData({
      displayName: instructor.displayName,
      email: instructor.email,
      phone: instructor.phone,
      subject: instructor.subject,
      photoURL: instructor.photoURL,
      status: instructor.status,
    });
    setShowModal(true);
  };

  const handleDelete = async uid => {
    if (window.confirm('Are you sure you want to delete this instructor?')) {
      try {
        // Replace with your actual API call
        // await fetch(`YOUR_API_ENDPOINT/instructors/${uid}`, { method: 'DELETE' });

        setInstructors(instructors.filter(inst => inst.uid !== uid));
      } catch (error) {
        console.error('Error deleting instructor:', error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingInstructor) {
        // Update existing instructor
        // await fetch(`YOUR_API_ENDPOINT/instructors/${editingInstructor.uid}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });

        setInstructors(
          instructors.map(inst =>
            inst.uid === editingInstructor.uid ? { ...inst, ...formData } : inst
          )
        );
      } else {
        // Add new instructor
        // const response = await fetch('YOUR_API_ENDPOINT/instructors', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });
        // const newInstructor = await response.json();

        const newInstructor = {
          uid: `UID_${Date.now()}`,
          ...formData,
          emailVerified: false,
          createdAt: new Date().toISOString(),
          lastLoginAt: null,
          totalStudents: 0,
          totalClasses: 0,
        };
        setInstructors([...instructors, newInstructor]);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving instructor:', error);
    }
  };

  const handleStatusToggle = async (uid, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      // Replace with your actual API call
      // await fetch(`YOUR_API_ENDPOINT/instructors/${uid}/status`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: newStatus })
      // });

      setInstructors(
        instructors.map(inst =>
          inst.uid === uid ? { ...inst, status: newStatus } : inst
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'UID',
      'Name',
      'Email',
      'Phone',
      'Subject',
      'Email Verified',
      'Created At',
      'Last Login',
      'Status',
      'Total Students',
      'Total Classes',
    ];
    const csvData = sortedInstructors.map(inst => [
      inst.uid,
      inst.displayName,
      inst.email,
      inst.phone || 'N/A',
      inst.subject,
      inst.emailVerified ? 'Yes' : 'No',
      new Date(inst.createdAt).toLocaleDateString(),
      inst.lastLoginAt ? new Date(inst.lastLoginAt).toLocaleDateString() : 'Never',
      inst.status,
      inst.totalStudents,
      inst.totalClasses,
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `instructors_${new Date().toISOString().split('T')[0]}.csv`
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <FiArrowUp className="w-3 h-3 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? (
      <FiArrowUp className="w-3 h-3 text-blue-600" />
    ) : (
      <FiArrowDown className="w-3 h-3 text-blue-600" />
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading instructors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Manage Instructors | Admin Dashboard</title>
      </Helmet>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Instructors</h1>
              <p className="text-gray-600 mt-1">
                View and manage all instructors in the system
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchInstructors}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                <FiRefreshCw className="w-5 h-5" />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                <FiDownload className="w-5 h-5" />
                Export CSV
              </button>
              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <FiPlus className="w-5 h-5" />
                Add Instructor
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <FilterSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
        />

        {/* Stats Cards */}
    <StatsCards/>

        {/* Instructors Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('displayName')}>
                    <div className="flex items-center gap-2">
                      Instructor
                      <SortIcon columnKey="displayName" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('subject')}>
                    <div className="flex items-center gap-2">
                      Subject
                      <SortIcon columnKey="subject" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('totalStudents')}>
                    <div className="flex items-center gap-2">
                      Students
                      <SortIcon columnKey="totalStudents" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('createdAt')}>
                    <div className="flex items-center gap-2">
                      Joined
                      <SortIcon columnKey="createdAt" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('status')}>
                    <div className="flex items-center gap-2">
                      Status
                      <SortIcon columnKey="status" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentInstructors.map(instructor => (
                  <tr key={instructor.uid} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {instructor.photoURL ? (
                            <img
                              src={instructor.photoURL}
                              alt={instructor.displayName}
                              className="h-10 w-10 rounded-full object-cover"
                              onError={e => {
                                e.target.onerror = null;
                                e.target.src =
                                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234F46E5"%3E%3Cpath d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/%3E%3C/svg%3E';
                              }}
                            />
                          ) : (
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <FiUser className="w-5 h-5 text-blue-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {instructor.displayName}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            {instructor.emailVerified && (
                              <FiCheckCircle
                                className="w-3 h-3 text-green-600"
                                title="Email Verified"
                              />
                            )}
                            UID: {instructor.uid.substring(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <FiMail className="w-4 h-4" />
                        {instructor.email}
                      </div>
                      {instructor.phone && (
                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <FiPhone className="w-4 h-4" />
                          {instructor.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FiBook className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-900">
                          {instructor.subject}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {instructor.totalClasses || 0} classes
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {instructor.totalStudents}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(instructor.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      {instructor.lastLoginAt && (
                        <div className="text-xs text-gray-500 mt-1">
                          Last:{' '}
                          {new Date(instructor.lastLoginAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() =>
                          handleStatusToggle(instructor.uid, instructor.status)
                        }
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer transition-colors ${
                          instructor.status === 'active'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}>
                        {instructor.status === 'active' ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(instructor)}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded transition-colors"
                          title="Edit">
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(instructor.uid)}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition-colors"
                          title="Delete">
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInstructors.length === 0 && (
            <div className="text-center py-12">
              <FiUser className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No instructors found</p>
              <p className="text-gray-400 text-sm mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredInstructors.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded bg-white border disabled:opacity-50">
                  <FiChevronLeft />
                </button>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded bg-white border disabled:opacity-50">
                  <FiChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingInstructor ? 'Edit Instructor' : 'Add Instructor'}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={formData.displayName}
                onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Photo URL"
                value={formData.photoURL}
                onChange={e => setFormData({ ...formData, photoURL: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />

              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full border px-3 py-2 rounded">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-blue-600 text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
