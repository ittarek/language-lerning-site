import React, { useState } from 'react';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiMail, FiPhone, FiUser, FiBook, FiCheckCircle, FiXCircle } from 'react-icons/fi';

export const ManageInstructors = () => {
  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: 'আব্দুল করিম',
      email: 'abdul.karim@example.com',
      phone: '01712345678',
      subject: 'গণিত',
      joiningDate: '2023-01-15',
      status: 'active',
      totalStudents: 45
    },
    {
      id: 2,
      name: 'ফাতেমা আক্তার',
      email: 'fatema.akter@example.com',
      phone: '01812345678',
      subject: 'ইংরেজি',
      joiningDate: '2023-03-20',
      status: 'active',
      totalStudents: 38
    },
    {
      id: 3,
      name: 'মোহাম্মদ রহিম',
      email: 'mohammad.rahim@example.com',
      phone: '01912345678',
      subject: 'পদার্থবিজ্ঞান',
      joiningDate: '2022-11-10',
      status: 'inactive',
      totalStudents: 32
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    status: 'active'
  });

  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instructor.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instructor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || instructor.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddNew = () => {
    setEditingInstructor(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      status: 'active'
    });
    setShowModal(true);
  };

  const handleEdit = (instructor) => {
    setEditingInstructor(instructor);
    setFormData({
      name: instructor.name,
      email: instructor.email,
      phone: instructor.phone,
      subject: instructor.subject,
      status: instructor.status
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('আপনি কি নিশ্চিত এই শিক্ষককে মুছে ফেলতে চান?')) {
      setInstructors(instructors.filter(inst => inst.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingInstructor) {
      setInstructors(instructors.map(inst => 
        inst.id === editingInstructor.id 
          ? { ...inst, ...formData }
          : inst
      ));
    } else {
      const newInstructor = {
        id: Math.max(...instructors.map(i => i.id)) + 1,
        ...formData,
        joiningDate: new Date().toISOString().split('T')[0],
        totalStudents: 0
      };
      setInstructors([...instructors, newInstructor]);
    }
    
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">শিক্ষক ব্যবস্থাপনা</h1>
              <p className="text-gray-600 mt-1">সকল শিক্ষকদের তথ্য দেখুন এবং পরিচালনা করুন</p>
            </div>
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FiPlus className="w-5 h-5" />
              নতুন শিক্ষক যোগ করুন
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="নাম, বিষয় অথবা ইমেইল দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">সকল স্ট্যাটাস</option>
              <option value="active">সক্রিয়</option>
              <option value="inactive">নিষ্ক্রিয়</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">মোট শিক্ষক</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{instructors.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FiUser className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">সক্রিয় শিক্ষক</p>
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
                <p className="text-gray-600 text-sm">নিষ্ক্রিয় শিক্ষক</p>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">শিক্ষক</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">যোগাযোগ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">বিষয়</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">মোট শিক্ষার্থী</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">যোগদানের তারিখ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">স্ট্যাটাস</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInstructors.map((instructor) => (
                  <tr key={instructor.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FiUser className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{instructor.name}</div>
                          <div className="text-sm text-gray-500">ID: #{instructor.id}</div>
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
                        <span className="text-sm text-gray-900">{instructor.subject}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {instructor.totalStudents} জন
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(instructor.joiningDate).toLocaleDateString('bn-BD')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        instructor.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {instructor.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(instructor)}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded transition-colors"
                          title="সম্পাদনা করুন"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(instructor.id)}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded transition-colors"
                          title="মুছে ফেলুন"
                        >
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
              <p className="text-gray-500">কোন শিক্ষক পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingInstructor ? 'শিক্ষক সম্পাদনা করুন' : 'নতুন শিক্ষক যোগ করুন'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ফোন</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">বিষয়</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">স্ট্যাটাস</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">সক্রিয়</option>
                  <option value="inactive">নিষ্ক্রিয়</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  বাতিল করুন
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingInstructor ? 'আপডেট করুন' : 'যোগ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};