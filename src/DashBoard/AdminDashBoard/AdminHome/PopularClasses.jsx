import React from 'react'
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
export const PopularClasses = () => {
  return (
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
  );
}
