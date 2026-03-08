import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterBar from "../../features/applications/components/FilterBar";
import ApplicationCard from "../../features/applications/components/ApplicationCard";
import Pagination from "../../features/applications/components/Pagination";
import { 
  selectPaginatedApplications,
  selectFilteredApplications,
  selectPaginationMeta,
} from "../../features/applications/store/applicationsSlice";

/**
 * Custom hook for debounced search to improve performance
 * Prevents excessive filtering on every keystroke
 */
const useDebouncedSearch = (delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue((prev) => prev);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [delay]);
  
  return debouncedValue;
};

const ApplicationsPage = () => {
  // Selectors - now using memoized selectors for better performance
  const paginated = useSelector(selectPaginatedApplications);
  const filtered = useSelector(selectFilteredApplications);
  const { total, perPage, currentPage, totalPages } = useSelector(selectPaginationMeta);
  
  // Local state for loading/error scenarios
  const [isInitialized, setIsInitialized] = useState(true);
  
  // Handle empty state
  const isEmpty = filtered.length === 0;
  const showPagination = filtered.length > perPage;

  // Loading state (can be extended with actual async loading)
  if (!isInitialized) {
    return (
      <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 p-6 lg:p-10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 dark:text-slate-400">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 p-6 lg:p-10">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          My Applications
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          Track and manage all your job applications in one place.
        </p>
        {/* Application count badge */}
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
            {total} {total === 1 ? 'application' : 'applications'}
          </span>
        </div>
      </div>

      {/* Filter + Search */}
      <FilterBar />

      {/* Applications List */}
      {isEmpty ? (
        <div className="text-center py-16 text-slate-400">
          <span className="material-symbols-outlined text-5xl mb-3 block">search_off</span>
          <p className="text-sm">No applications found.</p>
          <p className="text-xs mt-1 text-slate-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {paginated.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {showPagination && (
        <Pagination
          total={total}
          perPage={perPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default ApplicationsPage;
