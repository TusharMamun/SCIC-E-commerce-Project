'use client';

import { useRouter } from 'next/navigation';

const Pagination = ({ pagination }) => {
  const router = useRouter();
  
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const { 
    currentPage, 
    totalPages, 
    hasNextPage, 
    hasPrevPage, 
    nextPage, 
    prevPage 
  } = pagination;

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(window.location.search);
    params.set('page', page);
    router.push(`?${params.toString()}`);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="dots1" className="px-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    // Middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 rounded-lg border ${
            currentPage === i
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-gray-300 hover:bg-gray-50 text-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="dots2" className="px-2 text-gray-500">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Page Info */}
        <div className="text-sm text-gray-600">
          Page <span className="font-semibold text-gray-900">{currentPage}</span> of{' '}
          <span className="font-semibold text-gray-900">{totalPages}</span>
        </div>

        {/* Page Navigation */}
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(prevPage)}
            disabled={!hasPrevPage}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              hasPrevPage
                ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>

          {/* Page Numbers */}
          <div className="hidden sm:flex items-center gap-1">
            {renderPageNumbers()}
          </div>

          {/* Mobile Page Indicator */}
          <div className="sm:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <span className="font-medium text-gray-700">{currentPage}</span>
            <span className="text-gray-500">/</span>
            <span className="text-gray-500">{totalPages}</span>
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(nextPage)}
            disabled={!hasNextPage}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              hasNextPage
                ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Jump to Page */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-sm text-gray-600">Go to:</span>
          <div className="relative">
            <input
              type="number"
              min="1"
              max={totalPages}
              defaultValue={currentPage}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const page = parseInt(e.target.value);
                  if (page >= 1 && page <= totalPages) {
                    handlePageChange(page);
                  }
                  e.target.value = '';
                }
              }}
              className="w-20 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Page"
            />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Start</span>
          <span>Page {currentPage}</span>
          <span>End</span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;