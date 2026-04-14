import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import applicationService from "../../applications/services/applicationService";
import { saveApplicationResumeThunk } from "../../applications/store/applicationsSlice";

import {
  CheckIcon,
  WarningIcon,
  CheckCircleIcon,
  WarningCircleIcon,
  ArrowDownIcon,
} from "./Resumeicons";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import useResume from "../hooks/useResume";
import { getResumeFileService } from "../services/resumeServices";
import ResumePreviewView from "./Resumepreviewview ";
import { fillPDFDoc } from "../utils/resumePdfExport";


const ScoreRing = ({ score }) => {
  const pct = Math.min(100, Math.max(0, score || 0));
  const radius = 54;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  const color = pct >= 80 ? "#22c55e" : pct >= 60 ? "#f59e0b" : "#ef4444";
  const label =
    pct >= 80 ? "Excellent Match" : pct >= 60 ? "Good Match" : "Needs Work";
  const labelColor =
    pct >= 80
      ? "text-green-400 bg-green-400/10 border-green-400/30"
      : pct >= 60
        ? "text-amber-400 bg-amber-400/10 border-amber-400/30"
        : "text-red-400 bg-red-400/10 border-red-400/30";

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs uppercase tracking-widest text-slate-500">
        ATS Match Score
      </span>
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="transparent"
            stroke="rgba(99,102,241,0.15)"
            strokeWidth={stroke}
          />
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="transparent"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute text-center">
          <div className="text-3xl font-mono font-bold text-neutral-text">
            {pct}
          </div>
          <div className="text-sm text-slate-500">/100</div>
        </div>
      </div>
      <span
        className={`text-xs font-semibold px-4 py-1 rounded-full border ${labelColor}`}
      >
        ⚡ {label}
      </span>
    </div>
  );
};

const ScoreBar = ({ label, value }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs">
      <span className="text-slate-400">{label}</span>
      <span className="font-mono text-neutral-text">{value}%</span>
    </div>
    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const ATS = ({ score, suggestions }) => {
  const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];

  const normalizedSuggestions = safeSuggestions.map((item) => {
    if (typeof item === "string") {
      return { type: "warning", tip: item };
    }
    return item;
  });

  const gradientClass =
    score > 69
      ? "from-green-100"
      : score > 49
        ? "from-yellow-100"
        : "from-red-100";
  const subtitle =
    score > 69 ? "Great Job!" : score > 49 ? "Good Start" : "Needs Improvement";
  const AtsIcon = score > 69 ? CheckCircleIcon : WarningCircleIcon;

  return (
    <div
      className={`bg-gradient-to-b ${gradientClass} to-white rounded-3xl shadow-sm border border-slate-200 w-full p-6 md:p-8`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 flex items-center justify-center">
          <AtsIcon />
        </div>
        <h2 className="text-xl md:text-2xl font-black text-slate-900">
          ATS Score — {score}/100
        </h2>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-3 text-slate-900">{subtitle}</h3>
        <p className="text-slate-600 mb-6 text-base leading-relaxed">
          This score represents how well your resume is likely to perform in
          Applicant Tracking Systems used by employers.
        </p>
        <div className="space-y-4">
          {normalizedSuggestions.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              {s.type === "good" ? <CheckIcon /> : <WarningIcon />}
              <p
                className={
                  s.type === "good"
                    ? "text-green-700 text-base"
                    : "text-amber-700 text-base"
                }
              >
                {s.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-slate-700 italic text-lg leading-relaxed">
        Keep refining your resume to improve your chances of getting past ATS
        filters and into the hands of recruiters.
      </p>
    </div>
  );
};

const Accordion = ({ title, score, suggestions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];

  const normalizedSuggestions = safeSuggestions.map((item) => {
    if (typeof item === "string") {
      return {
        type: "warning",
        tip: item,
        explanation: "",
      };
    }
    return item;
  });

  const dotColor =
    score > 69 ? "bg-green-500" : score > 49 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm transition hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 md:p-5 bg-white hover:bg-slate-50 transition"
        type="button"
      >
        <div className="flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full ${dotColor}`} />
          <h3 className="text-md md:text-lg font-semibold text-slate-900">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold text-slate-900">{score}/100</span>
          <ArrowDownIcon
            className={`w-5 h-5 text-slate-700 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
              }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="p-6 bg-slate-50 border-t border-slate-200">
          <div className="space-y-4">
            {normalizedSuggestions.map((s, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  {s.type === "good" ? (
                    <CheckCircleIcon />
                  ) : (
                    <WarningCircleIcon />
                  )}
                  <h4
                    className={`font-medium ${s.type === "good" ? "text-green-700" : "text-amber-700"
                      }`}
                  >
                    {s.tip}
                  </h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed ml-7">
                  {s.explanation || "No additional explanation provided."}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Details = ({ feedback }) => {
  const sections = [
    { title: "Relevance", key: "relevance" },
    { title: "Section Quality", key: "sectionQuality" },
    { title: "Content Strength", key: "contentStrength" },
    { title: "Experience", key: "experience" },
    { title: "Projects", key: "projects" },
    { title: "Skills Alignment", key: "skills" },
    { title: "Formatting", key: "formatting" },
    { title: "Structure & Flow", key: "structure" },
    { title: "Keyword Match", key: "keywordMatch" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl md:text-xl font-bold text-slate-900">
        Detailed Analysis
      </h2>
      <div className="grid grid-cols-1 gap-5">
        {sections.map(({ title, key }) => (
          <Accordion
            key={key}
            title={title}
            score={feedback?.[key]?.score || 0}
            suggestions={feedback?.[key]?.tips || []}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Original PDF Viewer — fetches uploaded PDF via authenticated API ─────────
const OriginalPDFViewer = ({ resumeId, fileType, sections }) => {
  const [fileBlob, setFileBlob] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    if (!resumeId || fileType !== "pdf") return;

    let objectUrl;
    setLoading(true);
    setFetchError("");

    getResumeFileService({ resumeId })
      .then((blob) => {
        setFileBlob(blob);
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.message || "Could not load original PDF.";
        setFetchError(msg);
      })
      .finally(() => setLoading(false));

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [resumeId, fileType]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-slate-500 min-h-[500px]">
        <span className="material-symbols-outlined text-4xl animate-spin text-primary">
          progress_activity
        </span>
        <p className="text-sm">Loading original resume…</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 text-slate-500 min-h-[500px]">
        <span className="material-symbols-outlined text-4xl text-amber-500">
          warning
        </span>
        <p className="text-sm text-red-400">{fetchError}</p>
      </div>
    );
  }

  if (fileType === "pdf" && fileBlob) {
    return (
      <div className="w-full flex flex-col items-center bg-slate-100 rounded-xl p-4 overflow-auto max-h-[800px]">
        <Document
          file={fileBlob}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="p-10 text-slate-400">Rendering PDF...</div>
          }
          error={
            <div className="p-10 text-red-400">Failed to render PDF layout.</div>
          }
        >
          {Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}`} className="mb-4 shadow-xl">
              <Page
                pageNumber={index + 1}
                width={600}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </div>
          ))}
        </Document>
      </div>
    );
  }

  // Fallback to structured view for DOCX or if PDF blob unavailable
  if (sections) {
    return <ResumePreviewView sections={sections} />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-slate-500 min-h-[500px]">
      <span className="material-symbols-outlined text-4xl text-amber-500">
        warning
      </span>
      <p className="text-sm">No preview content available.</p>
    </div>
  );
};


const buildDetailedFeedback = (analysisResult, optimizedResult) => {
  const finalScore =
    optimizedResult?.newAtsScore || analysisResult?.atsScore || 0;
  const breakdown = analysisResult?.scoreBreakdown || {};

  const categories = [
    "relevance",
    "sectionQuality",
    "contentStrength",
    "experience",
    "projects",
    "skills",
    "formatting",
    "structure",
    "keywordMatch",
  ];

  const feedback = {
    atsScore: finalScore,
    atsSuggestions: (analysisResult?.suggestions || []).map((tip) => ({
      type: "warning",
      tip,
    })),
  };

  categories.forEach((cat) => {
    feedback[cat] = {
      score: breakdown[cat]?.score || finalScore,
      tips: (breakdown[cat]?.tips || []).map((tip) => ({
        type: "warning",
        tip,
        explanation: `Recommended improvement for your resume's ${cat.replace(/([A-Z])/g, " $1").toLowerCase()}.`,
      })),
    };
  });

  if (feedback.contentStrength.tips.length === 0 && analysisResult?.strengths) {
    feedback.contentStrength.tips = analysisResult.strengths.slice(0, 2).map((s) => ({
      type: "good",
      tip: s,
      explanation: "Identified strength in your content.",
    }));
  }

  if (feedback.keywordMatch.tips.length === 0 && analysisResult?.missingKeywords) {
    feedback.keywordMatch.tips = analysisResult.missingKeywords.slice(0, 3).map((kw) => ({
      type: "warning",
      tip: `Missing keyword: ${kw}`,
      explanation: "Essential keyword from job description not found in resume.",
    }));
  }

  return feedback;
};


const OptimizeResume = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { applicationId } = location.state || {};

  const {
    resumes,
    activeResumeId,
    analysisResult,
    currentJobDescription,
    optimizedResult,
    optimizeLoading,
    optimizeError,
    optimizeSuccess,
    downloadLoading,
    handleOptimize,
    listLoading,
  } = useResume();

  const dispatch = useDispatch();

  const [activeView, setActiveView] = useState("before");
  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [error, setError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // ── FIX: track whether we've already auto-switched once ──────────────────
  // Without this ref, the useEffect below re-runs every time activeView changes,
  // forcing the user back to "after" whenever they try to click "Before".
  const hasAutoSwitchedToAfter = useRef(false);

  const handleSaveToApplication = async () => {
    if (!optimizedResult?.optimizedSections) return;

    if (!applicationId) {
      handleDownloadPdf();
      return;
    }

    setSaveLoading(true);
    setError("");
    try {
      await dispatch(
        saveApplicationResumeThunk({
          id: applicationId,
          content: optimizedResult.optimizedSections,
        }),
      ).unwrap();

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError(typeof err === "string" ? err : "Failed to save resume to application.");
    } finally {
      setSaveLoading(false);
    }
  };

  useEffect(() => {
    if (!analysisResult && !optimizeLoading) {
      navigate("/ai/resume");
    }
  }, [analysisResult, navigate, optimizeLoading]);

  useEffect(() => {
    if (optimizeError) {
      setError(optimizeError);
    }
  }, [optimizeError]);

  // ── FIX: removed `activeView` from dependency array + guard with ref ──────
  // Before: [optimizeSuccess, optimizedResult, activeView]
  // Problem: every time user clicked "Before", activeView changed → effect ran
  //          again → optimizeSuccess was still true → forced back to "after"
  // Fix: run only when optimizeSuccess/optimizedResult change, and only
  //      auto-switch a single time using a ref flag.
  useEffect(() => {
    if (optimizeSuccess && optimizedResult && !hasAutoSwitchedToAfter.current) {
      hasAutoSwitchedToAfter.current = true;
      setActiveView("after");
    }
  }, [optimizeSuccess, optimizedResult]);

  // Reset the flag when user starts a new optimization
  useEffect(() => {
    if (optimizeLoading) {
      hasAutoSwitchedToAfter.current = false;
    }
  }, [optimizeLoading]);

  const selectedResume = useMemo(() => {
    return resumes.find(
      (r) => r._id === (activeResumeId || analysisResult?.resumeId),
    );
  }, [resumes, activeResumeId, analysisResult]);

  const breakdown = analysisResult?.scoreBreakdown || {};
  const breakdownItems = [
    { label: "Relevance", value: breakdown.relevance?.score || analysisResult?.atsScore || 0 },
    { label: "Section Quality", value: breakdown.sectionQuality?.score || analysisResult?.atsScore || 0 },
    { label: "Content Strength", value: breakdown.contentStrength?.score || analysisResult?.atsScore || 0 },
    { label: "Experience", value: breakdown.experience?.score || analysisResult?.atsScore || 0 },
    { label: "Skills Alignment", value: breakdown.skills?.score || analysisResult?.atsScore || 0 },
    { label: "Formatting", value: breakdown.formatting?.score || analysisResult?.atsScore || 0 },
    { label: "Structure & Flow", value: breakdown.structure?.score || analysisResult?.atsScore || 0 },
    { label: "Keyword Match", value: breakdown.keywordMatch?.score || analysisResult?.atsScore || 0 },
  ];

  const currentFeedback = buildDetailedFeedback(analysisResult, optimizedResult);

  const handleToggleView = (view) => {
    if (view === "after" && !optimizedResult) {
      return; // Can't switch to "after" before optimization
    }
    setActiveView(view);
  };

  const handleStartOptimize = async () => {
    if (!currentJobDescription?.trim()) {
      setError("Missing job description.");
      return;
    }

    setError("");

    if (!analysisResult?.resumeId) {
      setError("Missing resume analysis.");
      return;
    }

    handleOptimize(analysisResult.resumeId, currentJobDescription);
  };

  const optimizedSections = optimizedResult?.optimizedSections || null;
  const resumeIdToDownload = analysisResult?.resumeId || activeResumeId;

  const handleDownloadPdf = async () => {
    if (!optimizedSections) {
      setError("Please optimize your resume first before downloading.");
      return;
    }

    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      fillPDFDoc(doc, optimizedSections);
      doc.save(`${optimizedSections.name || "resume"}_optimized.pdf`);
    } catch (e) {
      setError("PDF generation failed. Make sure jspdf is installed.");
      console.error(e);
    }
  };

  const handleDownloadDocx = () => {
    setError("DOCX download requires the 'docx' npm package — coming soon!");
  };

  const showBefore = activeView === "before";
  const showAfter = activeView === "after";

  return (
    <div className="flex-1 h-full flex flex-col min-h-0">
      {error && (
        <div className="mx-6 mt-4 flex items-center justify-between bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 shrink-0">
          <p className="text-sm text-red-400">{error}</p>
          <button onClick={() => setError("")} type="button">
            <span className="material-symbols-outlined text-red-400 text-base">
              close
            </span>
          </button>
        </div>
      )}

      <div className="flex flex-1 min-h-0 items-start">
        {/* ── Sidebar ── */}
        <div className="w-80 shrink-0 p-5 space-y-5 sticky top-0 self-start max-h-screen overflow-y-auto">
          <div className="bg-neutral-surface border border-neutral-border rounded-2xl p-5 flex flex-col items-center gap-4">
            <ScoreRing
              score={optimizedResult?.newAtsScore || analysisResult?.atsScore}
            />

            <div className="w-full bg-neutral-surface border border-neutral-border rounded-xl p-4 space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                Score Breakdown
              </p>
              {breakdownItems.map((item) => (
                <ScoreBar key={item.label} label={item.label} value={item.value} />
              ))}
            </div>

            {Array.isArray(analysisResult?.missingKeywords) &&
              analysisResult.missingKeywords.length > 0 && (
                <div className="bg-neutral-surface border border-neutral-border rounded-2xl p-5 space-y-3 w-full">
                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    Missing Keywords
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.missingKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-xs px-2 py-1 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {Array.isArray(optimizedResult?.changesExplained) &&
            optimizedResult.changesExplained.length > 0 && (
              <div className="bg-neutral-surface border border-green-500/20 rounded-2xl p-5 space-y-4">
                <p className="text-xs uppercase tracking-widest text-green-400">
                  AI Improvements
                </p>
                <ul className="space-y-2">
                  {optimizedResult.changesExplained.map((c, i) => (
                    <li key={i} className="text-xs text-slate-400 flex gap-2">
                      <span className="text-green-400 shrink-0">✓</span>
                      {c}
                    </li>
                  ))}
                </ul>

                {optimizedResult.improvementData && (
                  <div className="pt-2 border-t border-white/5 space-y-3">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500">
                      Improvement Rationale
                    </p>
                    {Object.entries(optimizedResult.improvementData).map(
                      ([key, val]) => (
                        <div key={key} className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-300 capitalize">
                            {key}:
                          </p>
                          <p className="text-[10px] text-slate-500 leading-relaxed">
                            {val}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                )}

                <div className="mt-3 flex items-center gap-2 text-sm pt-2">
                  <span className="text-slate-400">New Score:</span>
                  <span className="text-green-400 font-mono font-bold">
                    {optimizedResult.newAtsScore}/100
                  </span>
                </div>
              </div>
            )}
        </div>

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0 h-full overflow-y-auto">
          <div className="flex flex-col px-7 py-4 min-h-full">
            {/* Toggle bar */}
            <div className="flex items-center justify-between pb-4 shrink-0">
              <div className="flex bg-neutral-surface rounded-lg border border-neutral-border overflow-hidden">
                <button
                  onClick={() => handleToggleView("before")}
                  className={`px-5 py-2 text-sm font-medium transition-colors ${showBefore
                      ? "bg-primary text-white"
                      : "text-slate-400 hover:text-slate-200"
                    }`}
                  type="button"
                >
                  Before
                </button>

                <button
                  onClick={() => handleToggleView("after")}
                  disabled={!optimizedResult}
                  className={`px-5 py-2 text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${showAfter
                      ? "bg-primary text-white"
                      : "text-slate-400 hover:text-slate-200"
                    }`}
                  type="button"
                >
                  After
                </button>
              </div>

              {showAfter && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400 font-medium tracking-wide">
                    Template:
                  </span>
                  <div className="flex bg-neutral-surface rounded-lg border border-neutral-border p-1 gap-1">
                    {["modern", "professional", "minimal"].map((tpl) => (
                      <button
                        key={tpl}
                        onClick={() => setActiveTemplate(tpl)}
                        className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all capitalize ${activeTemplate === tpl
                            ? "bg-primary text-white shadow-md"
                            : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                          }`}
                        type="button"
                      >
                        {tpl}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Preview area */}
            <div className="space-y-8 pr-1 pb-6">
              <div className="border border-neutral-border rounded-2xl p-8 flex justify-center bg-white min-h-[500px]">
                {listLoading || optimizeLoading ? (
                  <div className="flex flex-col items-center justify-center gap-4 text-slate-500 min-h-[500px]">
                    <span className="material-symbols-outlined text-4xl animate-spin text-primary">
                      progress_activity
                    </span>
                    <p className="text-sm">
                      {listLoading
                        ? "Loading your resume..."
                        : "AI is optimizing your resume..."}
                    </p>
                    {!listLoading && (
                      <p className="text-xs text-slate-600">
                        This may take a few seconds
                      </p>
                    )}
                  </div>
                ) : showAfter ? (
                  <ResumePreviewView
                    sections={optimizedSections}
                    template={activeTemplate}
                  />
                ) : (
                  // "Before" tab — always shows the original uploaded resume
                  <OriginalPDFViewer
                    resumeId={resumeIdToDownload}
                    fileType={selectedResume?.fileType}
                    sections={selectedResume?.originalStructuredContent}
                  />
                )}
              </div>

              <ATS
                score={currentFeedback.atsScore}
                suggestions={currentFeedback.atsSuggestions}
              />

              <Details feedback={currentFeedback} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer action bar ── */}
      <div className="flex items-center justify-between px-7 h-16 border-t border-blue-400/10 shrink-0">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="material-symbols-outlined text-green-400 text-sm">
            check_circle
          </span>
          {analysisResult
            ? `Analysis complete • ${optimizedResult?.newAtsScore || analysisResult.atsScore
            }/100 ATS Score`
            : "Analyzing…"}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSaveToApplication}
            disabled={!optimizedResult || saveLoading}
            className={`px-2 py-1 text-sm rounded-lg font-semibold flex items-center gap-2 transition shadow-lg ${saveSuccess
                ? "bg-green-600 text-white"
                : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            type="button"
          >
            {saveLoading ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">
                  progress_activity
                </span>
                Saving...
              </>
            ) : saveSuccess ? (
              <>
                <span className="material-symbols-outlined text-sm">check</span>
                Saved
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">save</span>
                {applicationId ? "Save to App" : "Save Resume"}
              </>
            )}
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={!optimizedResult || downloadLoading}
            className="px-2 py-1 text-sm border rounded-lg text-blue-500 hover:text-white border-blue-500 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            type="button"
          >
            {downloadLoading ? "Downloading…" : "Download PDF"}
          </button>

          <button
            onClick={handleDownloadDocx}
            disabled={!optimizedResult || downloadLoading}
            className="px-2 py-1 text-sm border rounded-lg text-blue-500 hover:text-white border-blue-500 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            type="button"
          >
            Download DOCX
          </button>

          <button
            onClick={handleStartOptimize}
            disabled={optimizeLoading}
            className="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg font-semibold flex items-center gap-2 transition shadow-lg shadow-blue-500/20 text-white"
            type="button"
          >
            {optimizeLoading ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">
                  progress_activity
                </span>
                Optimizing...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">
                  auto_awesome
                </span>
                Optimize Resume
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptimizeResume;