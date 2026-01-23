import { FiDownload, FiPlus, FiRefreshCw } from 'react-icons/fi';

export const InstructorsHeader = ({
  fetchInstructors,
  setEditingInstructor,
  setFormData,
  setShowModal,
}) => {
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
  return (
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
  );
};
