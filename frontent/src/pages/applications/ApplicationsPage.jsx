import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "../../features/applications/components/FilterBar";
import ApplicationCard from "../../features/applications/components/ApplicationCard";
import Pagination from "../../features/applications/components/Pagination";
import ApplicationForm from "../../features/applications/components/ApplicationForm";
import {
  fetchApplications,
  selectPaginatedApplications,
  selectFilteredApplications,
  selectPaginationMeta,
  selectIsLoading,
  selectError,
} from "../../features/applications/store/applicationsSlice";

const ApplicationsPage = () => {
  const dispatch = useDispatch();

  const paginated = useSelector(selectPaginatedApplications);
  const filtered  = useSelector(selectFilteredApplications);
  const { total, perPage, currentPage, totalPages } = useSelector(selectPaginationMeta);
  const isLoading = useSelector(selectIsLoading);
  const error     = useSelector(selectError);

  const [showForm, setShowForm] = useState(false);

  // ── Fetch on mount ───────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const isEmpty = filtered.length === 0;

  // ── Loading State ────────────────────────────────────────────────────────
  if (isLoading && paginated.length === 0) {
    return (
      <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 p-6 lg:p-10 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-5xl text-blue-400 animate-spin">
            progress_activity
          </span>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Loading applications...
          </p>
        </div>
      </div>
    );
  }

  // ── Error State ──────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 p-6 lg:p-10 flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-5xl text-red-400 mb-3 block">
            error_outline
          </span>
          <p className="text-slate-600 dark:text-slate-300 font-medium mb-1">
            Failed to load applications
          </p>
          <p className="text-slate-400 text-sm mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchApplications())}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 p-6 lg:p-10">

        {/* Page Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              My Applications
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              Track and manage all your job applications in one place.
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                {total} {total === 1 ? "application" : "applications"}
              </span>
            </div>
          </div>

          {/* Add Application Button */}
          <button
            onClick={() => setShowForm(true)}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Application
          </button>
        </div>

        {/* Filter + Search */}
        <FilterBar />

        {/* Applications List */}
        {isEmpty ? (
          <div className="text-center py-16 text-slate-400">
            <span className="material-symbols-outlined text-5xl mb-3 block">
              search_off
            </span>
            <p className="text-sm">No applications found.</p>
            <p className="text-xs mt-1 text-slate-500">
              Try adjusting your search or filter, or add a new application.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {paginated.map((app) => (
              <ApplicationCard key={app.id} app={app} />
            ))}
          </div>
        )}

        {/* Pagination — Pagination component handles totalPages <= 1 internally */}
        <Pagination
          total={total}
          perPage={perPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>

      {/* Add Application Modal — backdrop click se bhi band hoga */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
        >
          <ApplicationForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </>
  );
};

export default ApplicationsPage;