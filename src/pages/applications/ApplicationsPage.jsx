import React from "react";
import { useSelector } from "react-redux";
import FilterBar from "../../features/applications/components/FilterBar";
import ApplicationCard from "../../features/applications/components/ApplicationCard";
import Pagination from "../../features/applications/components/Pagination";
import { selectPaginatedApplications,
  selectFilteredApplications,
  selectPaginationMeta, } from "../../features/applications/store/applicationsSlice";


const ApplicationsPage = () => {
  const paginated = useSelector(selectPaginatedApplications);
  const filtered  = useSelector(selectFilteredApplications);
  const { total, perPage, currentPage } = useSelector(selectPaginationMeta);

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
      </div>

      {/* Filter + Search */}
      <FilterBar />

      {/* Applications List */}
      {paginated.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <span className="material-symbols-outlined text-5xl mb-3 block">search_off</span>
          <p className="text-sm">No applications found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {paginated.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {filtered.length > perPage && (
        <Pagination
          total={total}
          perPage={perPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default ApplicationsPage;