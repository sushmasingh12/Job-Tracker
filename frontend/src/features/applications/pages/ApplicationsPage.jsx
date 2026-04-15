import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "../components/FilterBar";
import ApplicationCard from "../components/ApplicationCard";
import Pagination from "../components/Pagination";
import ApplicationForm from "../components/ApplicationForm";
import {
  fetchApplications,
  selectPaginatedApplications,
  selectFilteredApplications,
  selectPaginationMeta,
  selectIsLoading,
  selectError,
} from "../store/applicationsSlice";

const PAGE_TITLE = "My Applications | Job Tracker";
const PAGE_DESCRIPTION =
  "Track, search, filter, and manage all your job applications in one place.";

const pageWrapperClass =
  "flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 p-6 md:p-8 lg:p-10";

const ApplicationsPage = () => {
  const dispatch = useDispatch();

  const paginated = useSelector(selectPaginatedApplications);
  const filtered = useSelector(selectFilteredApplications);
  const { total, perPage, currentPage, totalPages } =
    useSelector(selectPaginationMeta);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const isEmpty = filtered.length === 0;

  const totalLabel = useMemo(() => {
    return `${total} ${total === 1 ? "application" : "applications"}`;
  }, [total]);

  const handleRetry = () => {
    dispatch(fetchApplications());
  };

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseForm();
    }
  };

  if (isLoading && paginated.length === 0) {
    return (
      <>
        <Helmet>
          <title>{PAGE_TITLE}</title>
          <meta name="description" content={PAGE_DESCRIPTION} />
          <meta name="robots" content="index,follow" />
        </Helmet>

        <div className={`${pageWrapperClass} flex items-center justify-center`}>
          <div className="flex flex-col items-center gap-4">
            <span className="material-symbols-outlined text-5xl text-blue-400 animate-spin">
              progress_activity
            </span>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Loading applications...
            </p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>{PAGE_TITLE}</title>
          <meta name="description" content={PAGE_DESCRIPTION} />
          <meta name="robots" content="index,follow" />
        </Helmet>

        <div className={`${pageWrapperClass} flex items-center justify-center`}>
          <div className="text-center">
            <span className="material-symbols-outlined mb-3 block text-5xl text-red-400">
              error_outline
            </span>
            <p className="mb-1 font-medium text-slate-600 dark:text-slate-300">
              Failed to load applications
            </p>
            <p className="mb-4 text-sm text-slate-400">{error}</p>
            <button
              onClick={handleRetry}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="robots" content="index,follow" />
      </Helmet>
      
      <div className={pageWrapperClass}>
        <div className="rounded-xl border border-neutral-border bg-neutral-surface p-7 md:p-8 lg:p-10 shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-10 flex items-start justify-between gap-4">
            <div className="pr-2">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                My Applications
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Track and manage all your job applications in one place.
              </p>
              <div className="mt-3">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {totalLabel}
                </span>
              </div>
            </div>

            <button
              onClick={handleOpenForm}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add Application
            </button>
          </div>

          <div className="mb-6">
            <FilterBar />
          </div>

          {isEmpty ? (
            <div className="py-16 text-center text-slate-400">
              <span className="material-symbols-outlined mb-3 block text-5xl">
                search_off
              </span>
              <p className="text-sm">No applications found.</p>
              <p className="mt-1 text-xs text-slate-500">
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

          <div className="mt-8">
            <Pagination
              total={total}
              perPage={perPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <ApplicationForm onClose={handleCloseForm} />
        </div>
      )}
    </>
  );
};

export default ApplicationsPage;