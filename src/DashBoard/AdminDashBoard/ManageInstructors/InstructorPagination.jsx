import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const InstructorPagination = ({
  filteredInstructors,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div>
      {' '}
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
  );
};
