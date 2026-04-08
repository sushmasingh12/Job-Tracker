import React from "react";
import { useWatch } from "react-hook-form";
import { RULES, useApplicationForm } from "../hook/useApplication";
import { FormField } from "../../../shared/components/ui/FormField";
import { STATUS_CONFIG } from "../contants/Applicationconstants";
import { createPortal } from "react-dom";
const STATUS_OPTIONS = Object.entries(STATUS_CONFIG).map(([value, cfg]) => ({
  value,
  label: cfg.label,
}));

const ApplicationForm = ({ onClose }) => {
  const { register, handleSubmit, control, errors, isSubmitting, showToast } =
    useApplicationForm(onClose);

  const watchedStatus = useWatch({
    control,
    name: "status",
    defaultValue: "Applied",
  });

  const statusCfg =
    STATUS_CONFIG[watchedStatus] ??
    Object.values(STATUS_CONFIG)[0] ?? {
      label: "",
      badgeCls: "",
      dotColor: "",
    };

  const watchedDesc = useWatch({
    control,
    name: "jobDescription",
    defaultValue: "",
  });

  const watchedNotes = useWatch({
    control,
    name: "notes",
    defaultValue: "",
  });

  return (
    <div className="flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-surface w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-neutral-border top-0 bg-neutral-surface z-10 rounded-t-2xl">
          <h2 className="text-xl font-bold text-neutral-text">
            Add New Application
          </h2>
        </div>

        {/* ── Success Toast ──────────────────────────────────────── */}
        {showToast && createPortal(
  <div className="fixed bottom-10 right-6  flex items-center gap-3 px-5 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-500/30 shadow-2xl shadow-emerald-100/50 dark:shadow-black/40 animate-fade-in">
    <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-emerald-500 text-[22px]">
        check_circle
      </span>
    </div>
    <div>
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
        Application added successfully!
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
        Your application has been saved.
      </p>
    </div>
  </div>,
  document.body
)}

        <div className="p-6">
          <form
            id="app-form"
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <FormField
                    label="Job Title"
                    required
                    icon="title"
                    type="text"
                    placeholder="e.g. Senior Product Designer"
                    registration={register("jobTitle", RULES.jobTitle)}
                    error={errors.jobTitle}
                  />

                  <FormField
                    label="Company"
                    icon="domain"
                    type="text"
                    placeholder="Search company..."
                    registration={register("company", RULES.company)}
                    error={errors.company}
                  />

                  <FormField
                    label="Location"
                    icon="location_on"
                    type="text"
                    placeholder="e.g. Remote, New York, NY"
                    registration={register("location")}
                    error={errors.location}
                  />

                  <FormField
                    label="Application Date"
                    required
                    icon="calendar_today"
                    type="date"
                    registration={register("applicationDate", RULES.applicationDate)}
                    error={errors.applicationDate}
                  />
                </div>

                <div className="space-y-1">
                  <FormField label="Status" required error={errors.status}>
                    <div className="relative">
                      <select
                        {...register("status", RULES.status)}
                        className={`inpttext w-full appearance-none pr-36 ${
                          errors.status
                            ? "border-red-400"
                            : "focus:border-primary focus:ring-2 focus:ring-primary/20"
                        }`}
                      >
                        {STATUS_OPTIONS.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>

                      <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${statusCfg.badgeCls}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${statusCfg.dotColor}`}
                          />
                          {statusCfg.label}
                        </span>
                      </div>

                      <span className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-neutral-muted">
                        <span className="material-symbols-outlined text-[20px]">
                          expand_more
                        </span>
                      </span>
                    </div>
                  </FormField>

                  <div className="mb-5">
                    <label className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text mb-1.5">
                      Salary Range
                      <span className="ml-1 font-normal normal-case text-neutral-muted">
                        (optional)
                      </span>
                    </label>

                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-muted text-sm font-semibold">
                          $
                        </span>
                        <input
                          {...register("salaryMin", RULES.salaryMin)}
                          type="number"
                          min="0"
                          placeholder="Min"
                          className={`inpttext w-full pl-7 ${
                            errors.salaryMin
                              ? "border-red-400"
                              : "focus:border-primary focus:ring-2 focus:ring-primary/20"
                          }`}
                        />
                        {errors.salaryMin && (
                          <p className="text-[11px] text-red-500 mt-1">
                            {errors.salaryMin.message}
                          </p>
                        )}
                      </div>

                      <span className="text-neutral-muted font-medium mt-2.5 shrink-0">
                        —
                      </span>

                      <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-muted text-sm font-semibold">
                          $
                        </span>
                        <input
                          {...register("salaryMax", RULES.salaryMax)}
                          type="number"
                          min="0"
                          placeholder="Max"
                          className={`inpttext w-full pl-7 ${
                            errors.salaryMax
                              ? "border-red-400"
                              : "focus:border-primary focus:ring-2 focus:ring-primary/20"
                          }`}
                        />
                        {errors.salaryMax && (
                          <p className="text-[11px] text-red-500 mt-1">
                            {errors.salaryMax.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <FormField
                    label="Job Post URL"
                    icon="link"
                    type="url"
                    placeholder="https://..."
                    registration={register("jobPostUrl", RULES.jobPostUrl)}
                    error={errors.jobPostUrl}
                  />
                </div>
              </div>

              <div className="space-y-5 pt-2">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text">
                      Job Description <span className="text-danger">*</span>
                    </label>
                    <span
                      className={`text-[10px] font-medium tabular-nums ${
                        watchedDesc.length > 4800
                          ? "text-red-400"
                          : watchedDesc.length > 4000
                          ? "text-amber-400"
                          : "text-neutral-muted"
                      }`}
                    >
                      {watchedDesc.length} / 5000
                    </span>
                  </div>

                  <textarea
                    {...register("jobDescription", RULES.jobDescription)}
                    rows={4}
                    maxLength={5000}
                    placeholder="Paste the full job description here..."
                    className={`inpttext w-full resize-none ${
                      errors.jobDescription
                        ? "border-red-400 focus:border-red-500"
                        : "focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.jobDescription && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {errors.jobDescription.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text">
                      Notes
                      <span className="ml-1 font-normal normal-case text-neutral-muted">
                        (optional)
                      </span>
                    </label>
                    <span
                      className={`text-[10px] font-medium tabular-nums ${
                        watchedNotes.length > 900
                          ? "text-amber-400"
                          : "text-neutral-muted"
                      }`}
                    >
                      {watchedNotes.length} / 1000
                    </span>
                  </div>

                  <textarea
                    {...register("notes", RULES.notes)}
                    rows={3}
                    maxLength={1000}
                    placeholder="Add any personal notes, referral info, etc."
                    className={`inpttext w-full resize-none ${
                      errors.notes
                        ? "border-red-400"
                        : "focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                  {errors.notes && (
                    <p className="text-[11px] text-red-500 mt-1">
                      {errors.notes.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-neutral-border bg-neutral-surface rounded-b-2xl bottom-0 flex justify-end gap-3 z-10">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-neutral-border text-neutral-text font-medium hover:bg-background-light transition-colors text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="app-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-sm text-sm flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting && (
              <span className="material-symbols-outlined text-[16px] animate-spin">
                progress_activity
              </span>
            )}
            Add Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;