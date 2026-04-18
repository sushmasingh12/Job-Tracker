import { useState } from "react";
import useCoverLetter from "../hooks/useCoverLetter";
import JobDetails from "./Jobdetails";
import Experience from "./Experience";
import CoverTone from "./Covertone";
import ReviewCover from "./ReviewCover";

// ─── Constants ───────────────────────────────────────────────────────────────
const STEPS = ["Job Details", "Experience", "Choose Tone", "Review"];

// ─── Progress Bar ─────────────────────────────────────────────────────────────
const StepProgressBar = ({ currentStep }) => {
  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;
  return (
    <div className="mb-10">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold text-neutral-text">
          Generate Cover Letter
        </h1>
        <span className="text-sm font-medium text-neutral-muted">
          Step {currentStep} of {STEPS.length}
        </span>
      </div>
      <div className="w-full bg-neutral-border rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs font-medium">
        {STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          return (
            <span
              key={step}
              className={`transition-colors duration-300 flex items-center gap-0.5 text-[10px] sm:text-xs ${isCompleted || isActive ? "text-primary" : "text-neutral-muted"
                }`}
            >
              {isCompleted && (
                <span className="material-symbols-outlined text-xs">check</span>
              )}
              {step}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// ─── Main Wizard ──────────────────────────────────────────────────────────────
const CoverLetterGenerator = () => {
  const { currentStep, loading, error, goBack, handleGenerate } = useCoverLetter();

  // ── Step 4: ReviewCover is a full-page layout — render without wizard chrome ──
  // The generate thunk auto-advances to step 4 on success, so ReviewCover
  // always renders with a populated letter.
  if (currentStep === 4) {
    return <ReviewCover />;
  }

  // ── Steps 1–3: Wizard chrome ──────────────────────────────────────────────
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="p-4 md:p-8 pb-32">
        <StepProgressBar currentStep={currentStep} />

        {/* Steps 1 & 2 submit their own forms internally (see Jobdetails / Experience) */}
        {currentStep === 1 && <JobDetails />}
        {currentStep === 2 && <Experience />}
        {currentStep === 3 && <CoverTone />}

        {/* Step 3 nav: Back + Generate Letter (triggers API, auto-advances to step 4) */}
        {currentStep === 3 && (
          <div className="mt-8 space-y-4">

            {/* Error banner — API ya Gemini failure hone par dikhta hai */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
                <span className="material-symbols-outlined text-xl shrink-0 mt-0.5">error</span>
                <div>
                  <p className="text-sm font-semibold">Generation failed</p>
                  <p className="text-xs mt-0.5 text-red-600">{error}</p>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-neutral-border flex justify-between">
              <button
                onClick={goBack}
                disabled={loading}
                className="px-6 py-3 rounded-lg border border-neutral-border text-neutral-text font-medium hover:bg-background-light transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back
              </button>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark shadow-md shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Generating..." : error ? "Try Again" : "Generate Letter"}
                <span className="material-symbols-outlined text-sm">
                  {loading ? "hourglass_top" : "auto_awesome"}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverLetterGenerator;