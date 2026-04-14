import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import StatusBadge from "./StatusBadge";
import ApplicationForm from "./ApplicationForm";
import { STATUS_CONFIG } from "../contants/Applicationconstants";
import {
  deleteApplicationThunk,
 
} from "../store/applicationsSlice";

// ── Delete Confirmation Modal ─────────────────────────────────────────────────

const DeleteModal = ({ app, onConfirm, onCancel, isDeleting }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="delete-modal-title"
  >
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
    />

    {/* Panel */}
    <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 p-6 animate-fade-in">
      {/* Icon */}
      <div className="flex items-center justify-center mb-4">
        <div className="h-14 w-14 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-red-500 text-[28px]">
            delete_forever
          </span>
        </div>
      </div>

      {/* Text */}
      <h3
        id="delete-modal-title"
        className="text-base font-bold text-slate-900 dark:text-white text-center mb-1"
      >
        Delete Application?
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-1">
        <span className="font-medium text-slate-700 dark:text-slate-300">
          {app.role}
        </span>{" "}
        at{" "}
        <span className="font-medium text-slate-700 dark:text-slate-300">
          {app.company || "this company"}
        </span>
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500 text-center mb-6">
        Yeh action undo nahi ho sakti.
      </p>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors shadow-sm shadow-red-200 dark:shadow-none flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isDeleting ? (
            <span className="material-symbols-outlined text-[16px] animate-spin">
              progress_activity
            </span>
          ) : (
            <span className="material-symbols-outlined text-[16px]">delete</span>
          )}
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  </div>
);

// ── Edit Modal Wrapper ────────────────────────────────────────────────────────

const EditModal = ({ app, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    />
    <div className="relative z-10 w-full max-w-4xl my-4">
      <ApplicationForm onClose={onClose} editData={app} />
    </div>
  </div>
);

// ── ApplicationCard ───────────────────────────────────────────────────────────

const ApplicationCard = ({ app }) => {
  const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG["Applied"];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = useCallback((e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  }, []);

  const handleEditClick = useCallback((e) => {
    e.stopPropagation();
    setShowEditModal(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    setIsDeleting(true);
    await dispatch(deleteApplicationThunk(app.id));
    setIsDeleting(false);
    setShowDeleteModal(false);
  }, [dispatch, app.id]);

  const handleDeleteCancel = useCallback(() => {
    if (!isDeleting) setShowDeleteModal(false);
  }, [isDeleting]);

  const handleEditClose = useCallback(() => {
    setShowEditModal(false);
  }, []);

  return (
    <>
      <div
        className={`group relative flex flex-col md:flex-row md:items-center p-4 rounded-2xl bg-white/60 dark:bg-sidebar/40 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-sidebar/60 transition-all shadow-sm hover:shadow-md overflow-hidden ${app.status === "Rejected" ? "opacity-75 hover:opacity-100" : ""
          }`}
      >
        {/* Left accent bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${cfg.bar}`} />

        {/* Company Info */}
        <div className="flex items-center gap-4 flex-1 mb-4 md:mb-0">
          <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-white dark:bg-slate-800 text-lg font-bold shadow-sm border border-slate-100 dark:border-slate-700 shrink-0">
            <span
              className={`bg-clip-text text-transparent bg-linear-to-br ${app.gradientFrom} ${app.gradientTo}`}
            >
              {app.initial}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white truncate">
              {app.role}
            </h3>
            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-0.5 gap-2 flex-wrap">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                {app.company}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  location_on
                </span>
                {app.location}
              </span>
              {app.workType !== "On-site" && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                  {app.workType}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Meta + Actions */}
        <div className="flex items-center gap-6 md:gap-8 lg:gap-12 text-sm">
          <div className="hidden lg:block text-slate-500 dark:text-slate-400">
            <p className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 mb-0.5">
              Applied
            </p>
            <span>{app.appliedDate}</span>
          </div>

          <div className="hidden sm:block">
            <p className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 mb-0.5">
              Salary
            </p>
            <span className="font-medium text-green-600 dark:text-green-400">
              {app.salary}
            </span>
          </div>

          <div className="w-28 flex justify-end md:justify-center">
            <StatusBadge status={app.status} />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 border-l border-slate-200 dark:border-slate-700 pl-4">
            {/* View */}
            <button
              onClick={() =>
                navigate(`/application/applicationspage/${app.id}`)
              }
              className="p-2 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              title="View Details"
              aria-label="View application details"
            >
              <span className="material-symbols-outlined text-[20px]">
                visibility
              </span>
            </button>

            {/* Edit */}
            <button
              onClick={handleEditClick}
              className="p-2 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
              title="Edit"
              aria-label="Edit application"
            >
              <span className="material-symbols-outlined text-[20px]">
                edit
              </span>
            </button>

            {/* Delete */}
            <button
              onClick={handleDeleteClick}
              className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Delete"
              aria-label="Delete application"
            >
              <span className="material-symbols-outlined text-[20px]">
                delete
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Portals ── */}
      {showDeleteModal &&
        createPortal(
          <DeleteModal
            app={app}
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
            isDeleting={isDeleting}
          />,
          document.body
        )}

      {showEditModal &&
        createPortal(
          <EditModal app={app} onClose={handleEditClose} />,
          document.body
        )}
    </>
  );
};

export default ApplicationCard;