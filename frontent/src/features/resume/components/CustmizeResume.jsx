import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useResume from "../hooks/useResume";
import applicationService from "../../applications/services/applicationService";
import { useDispatch } from "react-redux";
import { 
    clearOptimizeState 
} from "../store/resumeSlice";

const UploadedFilePreview = ({ file, onClear, onReplace }) => {
  const isPdf = file.name?.toLowerCase().endsWith(".pdf");

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-500 ring-2 ring-blue-100 transition-all duration-300 flex flex-col min-h-[260px]">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
          <span className="material-symbols-outlined text-blue-600 text-2xl">
            {isPdf ? "picture_as_pdf" : "article"}
          </span>
        </div>

        <button
          onClick={onClear}
          className="text-gray-400 hover:text-gray-600 transition"
          title="Remove file"
          type="button"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>
      </div>

      <div className="grow">
        <p className="text-sm font-semibold text-gray-800 truncate mb-1">
          {file.name}
        </p>
        <p className="text-xs text-gray-400">
          {isPdf ? "PDF" : "DOCX"} •{" "}
          {file.size ? `${(file.size / 1024).toFixed(0)} KB` : "—"}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-600">
        <span className="material-symbols-outlined text-base">
          check_circle
        </span>
        Selected for customization
      </div>

      <label className="mt-4 cursor-pointer text-xs text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1 w-fit transition">
        <span className="material-symbols-outlined text-sm">swap_horiz</span>
        Replace file
        <input
          className="hidden"
          type="file"
          accept=".pdf,.docx"
          onChange={onReplace}
        />
      </label>
    </div>
  );
};

const CustomizeResume = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const appState = location.state || {};

  const {
    resumes,
    listLoading,
    uploadLoading,
    uploadSuccess,
    uploadError,
    activeResumeId,
    analyzeLoading,
    analyzeError,
    analyzeSuccess,
    handleUpload,
    handleResetUpload,
    handleSetActiveResumeId,
    handleAnalyze,
    handleClearAnalysis,
    handleClearOptimize,
  } = useResume();

  const [uploadedFile, setUploadedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState(appState.jobDescription || "");
  const [localError, setLocalError] = useState("");

  const applicationId = appState.applicationId || null;

  useEffect(() => {
    if (appState.jobDescription && !jobDescription) {
      setJobDescription(appState.jobDescription);
    }
  }, [appState.jobDescription]);

  useEffect(() => {
    if (analyzeSuccess) {
      navigate("/ai/resume/optimizeResume", { state: { applicationId } });
    }
  }, [analyzeSuccess, navigate, applicationId]);

  useEffect(() => {
    if (uploadSuccess) {
      handleResetUpload();
    }
  }, [uploadSuccess, handleResetUpload]);

  useEffect(() => {
    if (!uploadedFile && activeResumeId && resumes?.length) {
      const activeResume = resumes.find((item) => item._id === activeResumeId);

      if (activeResume) {
        setUploadedFile({
          name: activeResume.originalName,
          size: activeResume.fileSize,
        });
      }
    }
  }, [uploadedFile, activeResumeId, resumes]);

  const errorMessage = localError || uploadError || analyzeError || "";
  const hasResumeSelected = Boolean(activeResumeId);

  const canCustomize = useMemo(() => {
    return (
      hasResumeSelected &&
      jobDescription.trim().length > 20 &&
      !uploadLoading &&
      !analyzeLoading
    );
  }, [hasResumeSelected, jobDescription, uploadLoading, analyzeLoading]);

  const isLoading = uploadLoading || analyzeLoading;

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isDocx = file.name.toLowerCase().endsWith(".docx");
    const isPdf = file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf && !isDocx) {
      setLocalError("Only PDF and DOCX files are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setLocalError("File size must be under 10MB.");
      e.target.value = "";
      return;
    }

    setLocalError("");
    handleClearAnalysis();
    handleClearOptimize();
    setUploadedFile({ name: file.name, size: file.size });

    const action = await handleUpload(file);

    if (action?.type?.endsWith("/fulfilled")) {
      const uploadedResume = action.payload;
      handleSetActiveResumeId(uploadedResume?._id || null);
    } else {
      setUploadedFile(null);
    }

    e.target.value = "";
  };

  const handleClearUploadedFile = () => {
    setUploadedFile(null);
    handleSetActiveResumeId(null);
    handleClearAnalysis();
    handleClearOptimize();
    setLocalError("");
  };

  const dispatch = useDispatch();

  const handleCustomizeWithAI = async () => {
    if (!uploadedFile && !activeResumeId) {
      setLocalError("Please upload a resume.");
      return;
    }

    if (jobDescription.trim().length <= 20) {
      setLocalError("Please paste a longer job description.");
      return;
    }

    setLocalError("");
    handleClearAnalysis();
    handleClearOptimize();

    await handleAnalyze(activeResumeId, jobDescription.trim());
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <section className="max-w-7xl mx-auto bg-white rounded-[32px] border border-slate-200 p-6 md:p-8 shadow-sm space-y-10">
        <div>
          <h1 className="text-2xl font-bold text-neutral-text mb-2">
            Customize Your Resume
          </h1>
          <p className="text-neutral-muted text-sm mt-1 max-w-2xl">
            Upload your resume and paste a job description — AI will analyze and
            optimize it for ATS systems.
          </p>
        </div>

        {errorMessage && (
          <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
            <p className="text-sm text-red-600 font-medium">{errorMessage}</p>
            <button
              onClick={() => setLocalError("")}
              className="text-red-500 hover:text-red-700"
              type="button"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          </div>
        )}

        <div className="space-y-12">
          <section className="space-y-5">
            <div>
              <h3 className="text-xl font-medium text-gray-900">
                Choose Your Resume
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Upload a new resume to customize it with AI
              </p>
            </div>

            {uploadedFile ? (
              <UploadedFilePreview
                file={uploadedFile}
                onClear={handleClearUploadedFile}
                onReplace={handleFileUpload}
              />
            ) : (
              <label className="bg-white rounded-3xl p-8 shadow-sm border border-dashed border-gray-300 hover:border-blue-300 transition-all duration-300 flex flex-col items-center justify-center min-h-[260px] cursor-pointer hover:shadow-lg">
                {uploadLoading ? (
                  <>
                    <span className="material-symbols-outlined text-blue-600 animate-spin text-4xl mb-3">
                      progress_activity
                    </span>
                    <span className="text-sm font-semibold text-gray-600">
                      Uploading to server...
                    </span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-gray-400 text-5xl mb-3">
                      cloud_upload
                    </span>
                    <span className="text-base font-bold text-gray-700">
                      Upload New Resume
                    </span>
                    <span className="text-xs text-gray-400 mt-2">
                      PDF, DOCX up to 10MB
                    </span>
                  </>
                )}
                <input
                  className="hidden"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileUpload}
                  disabled={uploadLoading}
                />
              </label>
            )}

            {listLoading ? (
              <div className="flex items-center gap-2 text-sm text-gray-400 py-4">
                <span className="material-symbols-outlined animate-spin text-base">
                  progress_activity
                </span>
                Loading your resume...
              </div>
            ) : null}
          </section>

          <section className="space-y-5">
            <div>
              <h3 className="text-xl font-medium text-gray-900">
                Target Job Description
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Paste the full job description — AI will match your resume
                against it
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs text-gray-400 italic">
                {jobDescription.length} characters
                {jobDescription.length > 0 && jobDescription.length < 20 && (
                  <span className="text-red-400 ml-2">
                    (at least 20 characters needed)
                  </span>
                )}
              </span>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full border border-slate-200 bg-white text-sm rounded-3xl p-5 min-h-44 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400 resize-none"
                placeholder="Paste the full job description here..."
              />
            </div>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-center">
          <button
            onClick={handleCustomizeWithAI}
            disabled={!canCustomize || isLoading}
            className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
            type="button"
          >
            {uploadLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin">
                  progress_activity
                </span>
                Uploading Resume...
              </>
            ) : analyzeLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin">
                  progress_activity
                </span>
                Analyzing with AI...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">
                  temp_preferences_custom
                </span>
                Customize with AI
              </>
            )}
          </button>
        </div>
      </section>
    </main>
  );
};

export default CustomizeResume;