import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store/applicationsSlice";


const Pagination = ({ total, perPage, currentPage, totalPages }) => {
  const dispatch = useDispatch();

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  }, [dispatch, totalPages]);

  const handlePrev = useCallback(() => {
    handlePageChange(currentPage - 1);
  }, [currentPage, handlePageChange]);

  const handleNext = useCallback(() => {
    handlePageChange(currentPage + 1);
  }, [currentPage, handlePageChange]);

  // Calculate display range for page numbers
  const getPageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);


    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) {
    return null;
  }

  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, total);

  return (
    <nav
      className="mt-8 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6"
      aria-label="Pagination"
    >
      {/* Results info */}
      <span className="text-sm text-slate-500 dark:text-slate-400">
        Showing <span className="font-medium">{start}</span> to{' '}
        <span className="font-medium">{end}</span> of{' '}
        <span className="font-medium">{total}</span> entries
      </span>

      {/* Page navigation */}
      <div className="flex items-center gap-1">
        {/* First page button */}
        {currentPage > 3 && (
          <button
            onClick={() => handlePageChange(1)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="Go to first page"
          >
            <span className="material-symbols-outlined text-sm">first_page</span>
          </button>
        )}

        {/* Previous button */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go to previous page"
        >
          <span className="material-symbols-outlined text-sm">chevron_left</span>
        </button>

        {/* Page numbers */}
        {getPageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${page === currentPage
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              }`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}


        {totalPages > 5 && currentPage < totalPages - 2 && (
          <span className="px-2 text-slate-400">...</span>
        )}

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Go to next page"
        >
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </button>

        {/* Last page button */}
        {currentPage < totalPages - 2 && (
          <button
            onClick={() => handlePageChange(totalPages)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="Go to last page"
          >
            <span className="material-symbols-outlined text-sm">last_page</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
