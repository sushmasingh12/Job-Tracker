import { useState } from 'react';
import useReviewCover from "../hooks/useReviewCover";

const ReviewCover = () => {
  const {
    loading,
    editorRef,
    handleEditorInput,
    copied,
    saveStatus,
    wordCount,
    downloadLoading,
    handleCopy,
    handleDownload,
    handleRegenerate,
    handleSave,
    handleBack,
  } = useReviewCover();

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      <div className="min-h-14 bg-neutral-surface border-b border-neutral-border flex flex-wrap items-center justify-between gap-2 px-4 md:px-6 py-2 md:py-0 shrink-0">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm text-neutral-muted hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back
          </button>
          <div className="h-4 w-px bg-neutral-border hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-success text-white flex items-center justify-center font-bold text-sm">
              4
            </div>
            <span className="font-semibold text-neutral-text">Review &amp; Edit</span>
          </div>
          <div className="h-4 w-px bg-neutral-border hidden sm:block" />
          <span className="text-sm text-neutral-muted flex items-center gap-1 hidden sm:flex">
            <span className="material-symbols-outlined text-[16px] text-success">check_circle</span>
            All steps completed
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-xs text-neutral-muted flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">cloud_done</span>
            Auto-saved
          </span>
          <div className="h-4 w-px bg-neutral-border" />
          <span className="text-xs text-neutral-muted font-mono">{wordCount} words</span>
        </div>
      </div>

      {/* ── Formatting toolbar ────────────────────────────────────────────── */}
      <div className="h-12 bg-neutral-surface border-b border-neutral-border flex items-center px-4 gap-1 overflow-x-auto shrink-0">
        <div className="flex items-center border-r border-neutral-border pr-4 gap-1">
          <button className="p-1.5 rounded hover:bg-background-light text-neutral-muted hover:text-neutral-text transition">
            <span className="material-symbols-outlined text-[20px]">undo</span>
          </button>
          <button className="p-1.5 rounded hover:bg-background-light text-neutral-muted hover:text-neutral-text transition">
            <span className="material-symbols-outlined text-[20px]">redo</span>
          </button>
        </div>
        <select className="text-sm border-none bg-transparent font-medium text-neutral-text focus:ring-0 cursor-pointer hover:bg-background-light rounded px-2 py-1">
          <option>Normal Text</option>
          <option>Heading 1</option>
          <option>Heading 2</option>
          <option>Heading 3</option>
        </select>
        <div className="h-4 w-px bg-neutral-border mx-2" />
        <button className="p-1.5 rounded hover:bg-background-light text-neutral-text font-bold bg-neutral-100 transition">
          <span className="material-symbols-outlined text-[20px]">format_bold</span>
        </button>
        <button className="p-1.5 rounded hover:bg-background-light text-neutral-muted hover:text-neutral-text transition">
          <span className="material-symbols-outlined text-[20px]">format_italic</span>
        </button>
        <button className="p-1.5 rounded hover:bg-background-light text-neutral-muted hover:text-neutral-text transition">
          <span className="material-symbols-outlined text-[20px]">format_underlined</span>
        </button>
        <div className="h-4 w-px bg-neutral-border mx-2" />
        <button className="p-1.5 rounded hover:bg-background-light text-neutral-muted hover:text-neutral-text transition">
          <span className="material-symbols-outlined text-[20px]">format_align_left</span>
        </button>
        <button className="p-1.5 rounded hover:bg-background-light text-neutral-muted hover:text-neutral-text transition">
          <span className="material-symbols-outlined text-[20px]">format_align_center</span>
        </button>
        <button className="p-1.5 rounded hover:bg-background-light text-neutral-muted hover:text-neutral-text transition">
          <span className="material-symbols-outlined text-[20px]">format_align_right</span>
        </button>
        <button className="p-1.5 rounded hover:bg-background-light text-neutral-muted hover:text-neutral-text transition">
          <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
        </button>
      </div>

      {/* ── Main area (editor + sidebar) ──────────────────────────────────── */}
      {/* FIX: flex row — editor scrolls independently, sidebar is sticky */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">

        {/* ── Editor panel ────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto bg-background-light">
          <div className="flex justify-center py-6 md:py-10 px-3 md:px-6 min-h-full">

            {/* FIX: removed dangerouslySetInnerHTML — content is set via
                useEffect in useReviewCover when generatedLetter changes.
                This prevents React from overwriting user edits on re-render. */}

            {/* Loading overlay during regeneration */}
            {loading ? (
              <div className="w-full max-w-[680px] bg-white shadow-lg min-h-[842px] px-6 md:px-16 py-10 md:py-14 flex flex-col items-center justify-center gap-4">
                <div className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <p className="text-sm text-neutral-muted">Generating your cover letter...</p>
                <div className="w-full space-y-3 mt-4 opacity-40">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="h-3 bg-neutral-border rounded animate-pulse"
                      // eslint-disable-next-line react-hooks/purity
                      style={{ width: `${70 + Math.random() * 30}%` }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleEditorInput}
                className="w-full max-w-[680px] bg-white shadow-lg min-h-[842px] px-6 md:px-16 py-10 md:py-14 text-neutral-text text-[11pt] font-serif leading-relaxed outline-none focus:ring-2 focus:ring-primary/20"
              />
            )}
          </div>
        </div>

        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        {/* FIX: border-r → border-l (sidebar is on the RIGHT side) */}
        {/* FIX: overflow-y-auto on sidebar itself, not relying on parent height calc */}
        <div className="w-full md:w-80 bg-neutral-surface border-t md:border-t-0 md:border-l border-neutral-border flex flex-col shrink-0">

          <div className="p-6 border-b border-neutral-border">
            <h2 className="text-lg font-bold text-neutral-text mb-1">Finalize Letter</h2>
            <p className="text-xs text-neutral-muted">
              Review your generated cover letter and choose your next action.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* AI Insight */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex gap-2 items-start mb-2">
                <span className="material-symbols-outlined text-blue-600 text-xl">auto_awesome</span>
                <h3 className="text-sm font-semibold text-blue-800">AI Insight</h3>
              </div>
              <p className="text-xs text-neutral-muted mb-3">
                This draft has a strong opening and effectively quantifies your achievements.
                Consider emphasizing your leadership skills more in the third paragraph.
              </p>
              <button className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
                Apply Suggestion
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-neutral-text">Actions</label>

              <button
                onClick={handleRegenerate}
                disabled={loading}
                className="w-full flex items-center p-3 rounded-lg border border-neutral-border bg-white hover:border-primary hover:shadow-sm transition group text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-background-light group-hover:bg-blue-100 flex items-center justify-center text-neutral-muted group-hover:text-blue-600 transition">
                    <span className="material-symbols-outlined text-[20px]">refresh</span>
                  </div>
                  <span className="text-sm font-medium text-neutral-text">
                    {loading ? "Regenerating..." : "Regenerate"}
                  </span>
                </div>
              </button>

              <button
                onClick={handleCopy}
                className="w-full flex items-center p-3 rounded-lg border border-neutral-border bg-white hover:border-primary hover:shadow-sm transition group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-background-light group-hover:bg-blue-100 flex items-center justify-center text-neutral-muted group-hover:text-blue-600 transition">
                    <span className="material-symbols-outlined text-[20px]">
                      {copied ? "check" : "content_copy"}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-neutral-text">
                    {copied ? "Copied!" : "Copy to Clipboard"}
                  </span>
                </div>
              </button>
            </div>

            {/* Download */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-neutral-text">Download</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleDownload("pdf")}
                  disabled={downloadLoading || loading}
                  className="flex flex-col items-center justify-center p-3 rounded-lg border border-neutral-border bg-white hover:border-primary hover:bg-blue-50 transition text-center disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-red-500 mb-1">picture_as_pdf</span>
                  <span className="text-xs font-medium text-neutral-text">
                    {downloadLoading ? "..." : "PDF"}
                  </span>
                </button>
                <button
                  onClick={() => handleDownload("docx")}
                  disabled={downloadLoading || loading}
                  className="flex flex-col items-center justify-center p-3 rounded-lg border border-neutral-border bg-white hover:border-primary hover:bg-blue-50 transition text-center disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-blue-600 mb-1">description</span>
                  <span className="text-xs font-medium text-neutral-text">
                    {downloadLoading ? "..." : "DOCX"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Save button */}
          <div className="p-4 border-t border-neutral-border bg-gray-50 shrink-0">
            <button
              onClick={handleSave}
              disabled={saveStatus === "saving" || loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <span className="material-symbols-outlined">
                {saveStatus === "saved" ? "check_circle" : "save"}
              </span>
              {saveStatus === "saving"
                ? "Saving..."
                : saveStatus === "saved"
                  ? "Saved!"
                  : saveStatus === "error"
                    ? "Save Failed — Retry"
                    : "Save to Application"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCover;