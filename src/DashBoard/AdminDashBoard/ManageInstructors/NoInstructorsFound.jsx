import { FiUser } from 'react-icons/fi';

export const NoInstructorsFound = ({ filteredInstructors }) => {
  return (
    <div>
      {' '}
      {filteredInstructors.length === 0 && (
        <div className="text-center py-12">
          <FiUser className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No instructors found</p>
          <p className="text-gray-400 text-sm mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};
