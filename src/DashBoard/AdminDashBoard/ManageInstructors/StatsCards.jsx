import React from 'react'

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Total Instructors</p>
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
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Total Classes</p>
            <p className="text-3xl font-bold text-purple-600 mt-1">
              {instructors.reduce((sum, i) => sum + (i.totalClasses || 0), 0)}
            </p>
          </div>
          <div className="bg-purple-100 p-3 rounded-lg">
            <FiBook className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
