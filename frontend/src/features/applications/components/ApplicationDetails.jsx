import { useState, useMemo, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  clearSelectedApplication,
  selectApplicationById,
  fetchApplicationByIdThunk,
  selectIsLoading,
  downloadApplicationMaterialThunk,
} from "../store/applicationsSlice";
import { fillPDFDoc } from "../../resume/utils/resumePdfExport";
import StatusBadge from "./StatusBadge";
import ResumePreviewView from "../../resume/components/Resumepreviewview";
import {
  setApplicationContext,
  setCurrentStep,
} from "../../coverLetter/store/coverSlice";

const TABS = ["Overview", "Resume", "Cover Letter", "Notes", "Timeline"];
const FALLBACK_PAGE_TITLE = "Application Details | Job Tracker";
const FALLBACK_PAGE_DESCRIPTION =
  "View application details, resume, cover letter, notes, and timeline updates.";

const ApplicationDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const app = useSelector((state) => selectApplicationById(state, id));
  const isLoading = useSelector(selectIsLoading);
  const [activeTab, setActiveTab] = useState("Overview");

  const [resumePage] = useState(0);
  const [coverLetterPage] = useState(0);
  const [noteIndex] = useState(0);
  const [timelineIndex] = useState(0);

  useEffect(() => {
    if (id && !app) {
      dispatch(fetchApplicationByIdThunk(id));
    }
  }, [id, app, dispatch]);

  const handleBack = useCallback(() => {
    dispatch(clearSelectedApplication());
    navigate("/application/applicationspage");
  }, [dispatch, navigate]);

  const pageTitle = useMemo(() => {
    if (!app) return FALLBACK_PAGE_TITLE;
    return `${app.role || "Application"}${app.company ? ` at ${app.company}` : ""} | Job Tracker`;
  }, [app]);

  const pageDescription = useMemo(() => {
    if (!app) return FALLBACK_PAGE_DESCRIPTION;

    const parts = [
      app.role && `Track your ${app.role} application`,
      app.company && `at ${app.company}`,
      app.location && `in ${app.location}`,
      app.status && `with status ${app.status}`,
    ].filter(Boolean);

    return `${parts.join(" ")}.`.replace(/\s+\./, ".");
  }, [app]);

  const resumeSections = useMemo(
    () => [
      {
        title: "Resume Overview",
        content:
          app?.resumeSummary ||
          `This resume has been tailored for ${app?.company || "the company"} role.`,
      },
      {
        title: "Matched Skills",
        content: app?.matchedSkills?.length
          ? app.matchedSkills.join(", ")
          : "No matched skills available.",
      },
      {
        title: "Optimization Notes",
        content:
          app?.resumeNotes ||
          "Resume optimization suggestions are not available yet.",
      },
    ],
    [app],
  );

  const coverLetterSections = useMemo(
    () => [
      {
        title: "Cover Letter Draft",
        content:
          app?.coverLetter ||
          `Dear Hiring Manager,\n\nI am excited to apply for the ${app?.role || "role"} position at ${app?.company || "your company"}.`,
      },
      {
        title: "Personalization",
        content:
          app?.coverLetterNotes ||
          "This cover letter can be personalized further based on job requirements.",
      },
    ],
    [app],
  );

  const notesList = useMemo(
    () =>
      app?.notes?.length
        ? app.notes
        : [
          "No notes added yet.",
          "You can store recruiter updates here.",
          "You can track follow-up reminders here.",
        ],
    [app],
  );

  const timelineList = useMemo(
    () =>
      app?.timeline?.length
        ? app.timeline
        : [
          {
            title: "Application Submitted",
            date: app?.appliedDate || "N/A",
            description: "Your application was submitted successfully.",
          },
          {
            title: "Awaiting Review",
            date: "Pending",
            description: "The application is waiting for recruiter review.",
          },
        ],
    [app],
  );

  const handleRegenerateCoverLetter = () => {
    dispatch(
      setApplicationContext({
        applicationId: app.id,
        jobDetails: {
          jobTitle: app.role || "",
          companyName: app.company || "",
          location: app.location || "",
          jobDescription: app.jobDescription || "",
        },
        generatedLetter: app.coverLetter || "",
      }),
    );

    dispatch(setCurrentStep(1));
    navigate("/ai/cover-letter");
  };

  const handleEditCoverLetter = () => {
    dispatch(
      setApplicationContext({
        applicationId: app.id,
        jobDetails: {
          jobTitle: app.role || "",
          companyName: app.company || "",
          location: app.location || "",
          jobDescription: app.jobDescription || "",
        },
        generatedLetter: app.coverLetter || "",
      }),
    );

    dispatch(setCurrentStep(app.coverLetter ? 4 : 1));
    navigate("/cover-letter");
  };

  const handleDownloadResume = async () => {
    if (app.optimizedResume?.content) {
      try {
        const { jsPDF } = await import("jspdf");
        const doc = new jsPDF({ unit: "pt", format: "a4" });
        fillPDFDoc(doc, app.optimizedResume.content);
        doc.save(`${app.company || "resume"}_optimized.pdf`);
        return;
      } catch (err) {
        console.error("PDF generation failed:", err);
      }
    }

    dispatch(
      downloadApplicationMaterialThunk({
        id: app.id,
        type: "resume",
        format: "pdf",
      }),
    );
  };

  const handleOptimizeResume = () => {
    navigate("/ai/resume", {
      state: {
        jobDescription: app.jobDescription || "",
        applicationId: app.id,
      },
    });
  };

  const handleDownloadCoverLetter = () => {
    dispatch(
      downloadApplicationMaterialThunk({
        id: app.id,
        type: "cover-letter",
        format: "pdf",
      }),
    );
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content={(!id || !app) ? "noindex,nofollow" : "index,follow"} />
      </Helmet>

      {!id ? (
        <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 p-4 lg:p-8 flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-5xl text-slate-400 mb-3 block">
              error_outline
            </span>
            <p className="text-slate-500">No application ID provided</p>
          </div>
        </div>
      ) : !app ? (
        <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 p-4 lg:p-8 flex items-center justify-center">
          <div className="text-center">
            {isLoading ? (
              <>
                <span className="material-symbols-outlined text-5xl text-blue-400 mb-3 block animate-spin">
                  progress_activity
                </span>
                <p className="text-slate-500">Loading application...</p>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      ) : (
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
            </div>
          </div>

          <div className="flex-1 mt-4 flex flex-col bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
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
                  className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab
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
                  <p className="mb-4 whitespace-pre-line">{app.jobDescription}</p>

                  {app.responsibilities?.length > 0 && (
                    <>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                        Key Responsibilities:
                      </h4>
                      <ul className="list-disc pl-5 mb-4 space-y-1">
                        {app.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {app.requirements?.length > 0 && (
                    <>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                        Requirements:
                      </h4>
                      <ul className="list-disc pl-5 mb-4 space-y-1">
                        {app.requirements.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {app.benefits?.length > 0 && (
                    <>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                        Benefits:
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {app.benefits.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ) : activeTab === "Resume" ? (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto pr-2">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {app.optimizedResume
                          ? "Optimized Resume"
                          : resumeSections[resumePage].title}
                      </h3>
                      {app.optimizedResume && (
                        <span className="text-[10px] font-bold px-2 py-1 rounded bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-wider">
                          AI Optimized
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-slate-600 dark:text-slate-300 leading-6">
                      {app.optimizedResume ? (
                        <div className="space-y-6">
                          <div className="rounded-2xl bg-white dark:bg-slate-900/50 p-4">
                            <ResumePreviewView sections={app.optimizedResume.content} />
                          </div>
                        </div>
                      ) : (
                        <div className="whitespace-pre-line">
                          {resumeSections[resumePage].content}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={handleOptimizeResume}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
                    >
                      {app.optimizedResume
                        ? "Re-optimize with AI"
                        : "Optimize for this Role"}
                    </button>
                    <button
                      onClick={handleDownloadResume}
                      className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ) : activeTab === "Cover Letter" ? (
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      {coverLetterSections[coverLetterPage].title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-6 whitespace-pre-line">
                      {coverLetterSections[coverLetterPage].content}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-2">
                    <div className="flex gap-2">
                      <button
                        onClick={handleEditCoverLetter}
                        className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                      >
                        Edit Letter
                      </button>

                      <button
                        onClick={handleRegenerateCoverLetter}
                        className="px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white"
                      >
                        Regenerate
                      </button>

                      <button
                        onClick={handleDownloadCoverLetter}
                        className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ) : activeTab === "Notes" ? (
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      Note {noteIndex + 1}
                    </h3>
                    <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-sm text-slate-600 dark:text-slate-300 leading-6">
                      {notesList[noteIndex]}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-2">
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                        Add Note
                      </button>
                      <button className="px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white">
                        Edit Note
                      </button>
                    </div>
                  </div>
                </div>
              ) : activeTab === "Timeline" ? (
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      {timelineList[timelineIndex].title}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
                      {timelineList[timelineIndex].date}
                    </p>
                    <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-sm text-slate-600 dark:text-slate-300 leading-6">
                      {timelineList[timelineIndex].description}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-2">
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                        Add Step
                      </button>
                      <button className="px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white">
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                  <span className="material-symbols-outlined text-4xl mb-2">
                    folder_open
                  </span>
                  <p className="text-sm">{activeTab} content coming soon.</p>
                </div>
              )}

              {activeTab !== "Overview" && (
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/50 flex items-center justify-between"></div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationDetails;
