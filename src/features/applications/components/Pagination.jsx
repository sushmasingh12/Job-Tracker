import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store/applicationsSlice";

const Pagination = ({ total, perPage, currentPage }) => {
  const dispatch   = useDispatch();
  const totalPages = Math.ceil(total / perPage);
  const start      = (currentPage - 1) * perPage + 1;
  const end        = Math.min(currentPage * perPage, total);

  return (
    <div className="mt-8 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6">
      <span className="text-sm text-slate-500 dark:text-slate-400">
        Showing {start} to {end} of {total} entries
      </span>

      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm">chevron_left</span>
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => dispatch(setCurrentPage(page))}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;