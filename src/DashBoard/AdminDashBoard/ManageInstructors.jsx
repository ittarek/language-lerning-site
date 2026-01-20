import React, { useState } from 'react';
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
} from 'react-icons/fi';

export const ManageInstructors = () => {
  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: 'Abdul Karim',
      email: 'abdul.karim@example.com',
      phone: '01712345678',
      subject: 'Mathematics',
      joiningDate: '2023-01-15',
      status: 'active',
      totalStudents: 45,
    },
    {
      id: 2,
      name: 'Fatema Akter',
      email: 'fatema.akter@example.com',
      phone: '01812345678',
      subject: 'English',
      joiningDate: '2023-03-20',
      status: 'active',
      totalStudents: 38,
    },
    {
      id: 3,
      name: 'Mohammad Rahim',
      email: 'mohammad.rahim@example.com',
      phone: '01912345678',
      subject: 'Physics',
      joiningDate: '2022-11-10',
      status: 'inactive',
      totalStudents: 32,
    },
    {
      id: 4,
      name: 'Ayesha Rahman',
      email: 'ayesha.rahman@example.com',
      phone: '01612345678',
      subject: 'Chemistry',
      joiningDate: '2023-05-12',
      status: 'active',
      totalStudents: 41,
    },
    {
      id: 5,
      name: 'Kamal Hossain',
      email: 'kamal.hossain@example.com',
      phone: '01512345678',
      subject: 'Biology',
      joiningDate: '2022-08-25',
      status: 'active',
      totalStudents: 52,
    },
    {
      id: 6,
      name: 'Nadia Islam',
      email: 'nadia.islam@example.com',
      phone: '01412345678',
      subject: 'Computer Science',
      joiningDate: '2023-02-14',
      status: 'active',
      totalStudents: 48,
    },
    {
      id: 7,
      name: 'Rashid Ahmed',
      email: 'rashid.ahmed@example.com',
      phone: '01312345678',
      subject: 'History',
      joiningDate: '2022-09-30',
      status: 'inactive',
      totalStudents: 28,
    },
    {
      id: 8,
      name: 'Sabina Khatun',
      email: 'sabina.khatun@example.com',
      phone: '01212345678',
      subject: 'Geography',
      joiningDate: '2023-04-18',
      status: 'active',
      totalStudents: 35,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    status: 'active',
  });

  // Filtering
  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch =
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      name: '',
      email: '',
      phone: '',
      subject: '',
      status: 'active',
    });
    setShowModal(true);
  };

  const handleEdit = instructor => {
    setEditingInstructor(instructor);
    setFormData({
      name: instructor.name,
      email: instructor.email,
      phone: instructor.phone,
      subject: instructor.subject,
      status: instructor.status,
    });
    setShowModal(true);
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this instructor?')) {
      setInstructors(instructors.filter(inst => inst.id !== id));
    }
  };

  const handleSubmit = () => {
    if (editingInstructor) {
      setInstructors(
        instructors.map(inst =>
          inst.id === editingInstructor.id ? { ...inst, ...formData } : inst
        )
      );
    } else {
      const newInstructor = {
        id: Math.max(...instructors.map(i => i.id)) + 1,
        ...formData,
        joiningDate: new Date().toISOString().split('T')[0],
        totalStudents: 0,
      };
      setInstructors([...instructors, newInstructor]);
    }
    setShowModal(false);
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'ID',
      'Name',
      'Email',
      'Phone',
      'Subject',
      'Joining Date',
      'Status',
      'Total Students',
    ];
    const csvData = sortedInstructors.map(inst => [
      inst.id,
      inst.name,
      inst.email,
      inst.phone,
      inst.subject,
      inst.joiningDate,
      inst.status,
      inst.totalStudents,
    ]);

    const csvContent = [headers.join(','), ...csvData.map(row => row.join(','))].join(
      '\n'
    );

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Instructor Management</h1>
              <p className="text-gray-600 mt-1">View and manage all instructors</p>
            </div>
            <div className="flex gap-3">
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
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, subject or email..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={itemsPerPage}
              onChange={e => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Instructors</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {instructors.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiUser className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Instructors</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {instructors.filter(i => i.status === 'active').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Inactive Instructors</p>
                <p className="text-3xl font-bold text-red-600 mt-1">
                  {instructors.filter(i => i.status === 'inactive').length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <FiXCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Instructors Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-2">
                      Instructor
                      <SortIcon columnKey="name" />
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
                    onClick={() => handleSort('joiningDate')}>
                    <div className="flex items-center gap-2">
                      Joining Date
                      <SortIcon columnKey="joiningDate" />
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
                  <tr key={instructor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FiUser className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {instructor.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: #{instructor.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <FiMail className="w-4 h-4" />
                        {instructor.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <FiPhone className="w-4 h-4" />
                        {instructor.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FiBook className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-900">
                          {instructor.subject}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {instructor.totalStudents}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(instructor.joiningDate).toLocaleDateString('en-US')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          instructor.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {instructor.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
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
                          onClick={() => handleDelete(instructor.id)}
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
            </div>
          )}

          {/* Pagination */}
          {filteredInstructors.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {indexOfFirstItem + 1} to{' '}
                {Math.min(indexOfLastItem, sortedInstructors.length)} of{' '}
                {sortedInstructors.length} results
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                  <FiChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`px-3 py-1 rounded-lg ${
                        currentPage === idx + 1
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-100'
                      }`}>
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingInstructor ? 'Edit Instructor' : 'Add New Instructor'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  {editingInstructor ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
