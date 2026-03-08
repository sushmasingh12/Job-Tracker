import React, { useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { clearSelectedApplication, selectApplicationById } from "../store/applicationsSlice";
import StatusBadge from "./StatusBadge";

const TABS = ["Overview", "Resume", "Cover Letter", "Notes", "Timeline"];

const ApplicationDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Use memoized selector to find application by ID
  const app = useSelector((state) => selectApplicationById(state, id));
  const [activeTab, setActiveTab] = useState("Overview");

  // Handle navigation back
  const handleBack = useCallback(() => {
    dispatch(clearSelectedApplication());
    navigate("/application/applicationspage");
  }, [dispatch, navigate]);

  // Memoized calculations
  const { circumference, dashArray } = useMemo(() => {
    const circ = 2 * Math.PI * 15.9155;
    const score = app?.matchScore ?? 0;
    return {
      circumference: circ,
      dashArray: `${(score / 100) * circ}, ${circ}`,
    };
  }, [app?.matchScore]);

  // Handle loading/error state
  if (!id) {
    return (
      <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 p-4 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-5xl text-slate-400 mb-3 block">
            error_outline
          </span>
          <p className="text-slate-500">No application ID provided</p>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 p-4 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-5xl text-slate-400 mb-3 block">
            search_off
          </span>
          <p className="text-slate-500 mb-4">Application not found</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Applications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 p-4 lg:p-8">
      <button
        onClick={handleBack}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors group"
        aria-label="Back to applications list"
      >
        <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">
          arrow_back
        </span>
        Back to Applications
      </button>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 lg:w-3/5 flex flex-col gap-6">
          <div className="relative rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm p-6 shadow-sm overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            <div className="flex items-start gap-4 mb-2">
              <div
                className={`h-20 w-20 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-inner border shrink-0 bg-gradient-to-br ${app.gradientFrom} ${app.gradientTo} text-white`}
              >
                {app.initial}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {app.role}
                </h1>
                <div className="flex items-center gap-3 mt-2 text-sm flex-wrap">
                  <span className="font-semibold text-slate-700 dark:text-slate-200 text-lg">
                    {app.company}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-[16px]">
                      location_on
                    </span>
                    {app.location} ({app.workType})
                  </span>
                </div>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    Full-time
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/30">
                    {app.salary}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/30">
                    Applied {app.appliedDate}
                  </span>
                  <StatusBadge status={app.status} />
                </div>
              </div>
              <div className="flex flex-col items-center shrink-0">
                <div className="relative h-12 w-12 flex items-center justify-center" role="img" aria-label={`Match score: ${app.matchScore}%`}>
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100 dark:text-slate-700/50"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="text-emerald-500"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray={dashArray}
                      strokeWidth="3"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-slate-700 dark:text-white">
                    {app.matchScore}%
                  </span>
                </div>
                <span
                  className={`text-xs font-semibold mt-1 ${app.matchColor}`}
                >
                  {app.matchLabel}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
            <div 
              className="flex items-center border-b border-slate-200 dark:border-slate-700/50 px-2 pt-2 overflow-x-auto"
              role="tablist"
            >
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`panel-${tab}`}
                  className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div 
              id={`panel-${activeTab}`}
              role="tabpanel"
              className="p-6 overflow-y-auto flex-1"
            >
              {activeTab === "Overview" ? (
                <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    About the Role
                  </h3>
                  <p className="mb-4">{app.description}</p>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Key Responsibilities:
                  </h4>
                  <ul className="list-disc pl-5 mb-4 space-y-1">
                    {app.responsibilities?.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Requirements:
                  </h4>
                  <ul className="list-disc pl-5 mb-4 space-y-1">
                    {app.requirements?.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    Benefits:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {app.benefits?.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                  <span className="material-symbols-outlined text-4xl mb-2">
                    folder_open
                  </span>
                  <p className="text-sm">{activeTab} content coming soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[30%] space-y-6">
          <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm p-6 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
              Status History
            </h3>
            <div className="space-y-5">
              {app.statusHistory?.map((s, i) => (
                <div key={i} className="flex gap-3 relative">
                  <div
                    className={`h-6 w-6 rounded-full ${s.color} flex items-center justify-center shrink-0 z-10`}
                  >
                    <span className="material-symbols-outlined text-white text-sm">
                      {s.icon}
                    </span>
                  </div>
                  {i < (app.statusHistory?.length ?? 0) - 1 && (
                    <div className="absolute left-3 top-6 w-px h-5 bg-slate-200 dark:bg-slate-700 -translate-x-1/2" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {s.label}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {s.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm p-6 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-5">
              Application Materials
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: "description",
                  iconBg: "bg-red-50 text-red-500",
                  name: "Resume_Custom.pdf",
                  sub: `Optimized for ${app.company}`,
                },
                {
                  icon: "article",
                  iconBg: "bg-blue-50 text-blue-500",
                  name: "Cover_Letter_Final.pdf",
                  sub: "Generated by AI",
                },
              ].map((m) => (
                <div
                  key={m.name}
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors bg-slate-50 dark:bg-slate-900/30"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded ${m.iconBg} flex items-center justify-center shrink-0`}
                    >
                      <span className="material-symbols-outlined">
                        {m.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {m.name}
                      </p>
                      <p className="text-[10px] text-slate-400">{m.sub}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 text-[10px] font-bold py-1.5 rounded bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1 uppercase border border-slate-200 dark:border-slate-700">
                      <span className="material-symbols-outlined text-sm">
                        download
                      </span>{" "}
                      Download
                    </button>
                    <button className="flex-1 text-[10px] font-bold py-1.5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1 uppercase">
                      <span className="material-symbols-outlined text-sm">
                        autorenew
                      </span>{" "}
                      Regenerate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl p-6 bg-slate-800 dark:bg-slate-900 text-white shadow-lg overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                JobTrackr Insight
              </h3>
              <p className="text-sm font-medium leading-relaxed">
                Your profile matches{" "}
                <span className="text-blue-400 font-bold">
                  {app.matchScore}%
                </span>{" "}
                of the requirements for this role.
              </p>
              <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-xs font-bold transition-colors">
                VIEW MATCH REPORT
              </button>
            </div>
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-7xl text-white/5">
              psychology
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApplicationDetails;
