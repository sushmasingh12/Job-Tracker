import React from "react";
import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";
import { STATUS_CONFIG } from "../contants/Applicationconstants";


const ApplicationCard = ({ app }) => {
  const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG["Applied"];
  const navigate = useNavigate()
  return (
    <div
      className={`group relative flex flex-col md:flex-row md:items-center p-4 rounded-2xl bg-white/60 dark:bg-sidebar/40 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-sidebar/60 transition-all shadow-sm hover:shadow-md overflow-hidden ${
        app.status === "Rejected" ? "opacity-75 hover:opacity-100" : ""
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
              <span className="material-symbols-outlined text-[14px]">location_on</span>
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
          <button
            onClick={() => navigate(`/application/applicationspage/${app.id}`)}
            className="p-2 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            title="View Details"
          >
            <span className="material-symbols-outlined text-[20px]">visibility</span>
          </button>
          <button
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
            title="Edit"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
          <button
            className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title="Delete"
          >
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;