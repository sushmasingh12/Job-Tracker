import React from "react";
import { FormField } from "../../../shared/components/ui/FormField";
import useJobDetails from "../hooks/useJobdetails";

const JOB_TYPES = [
  { value: "full-time",  label: "Full-Time",  icon: "schedule"    },
  { value: "part-time",  label: "Part-Time",  icon: "more_time"   },
  { value: "contract",   label: "Contract",   icon: "description" },
  { value: "internship", label: "Internship", icon: "school"      },
  { value: "remote",     label: "Remote",     icon: "home_work"   },
];

const INDUSTRIES = [
  "Technology",
  "Finance & Banking",
  "Healthcare",
  "Education",
  "Marketing & Advertising",
  "Design & Creative",
  "Government & Public Sector",
  "Legal",
  "Other",
];

const JobDetails = () => {
  const {
    errors,
    onSubmit,
    jobType,
    handleJobTypeChange,
    charCount,
    jobTitleReg,
    companyNameReg,
    locationReg,
    industryReg,
    jobDescriptionReg,
    hiringManagerNameReg,
  } = useJobDetails();

  return (
    <div className="bg-neutral-surface rounded-xl shadow-sm border border-neutral-border p-8">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-neutral-text mb-2">
          Tell us about the job
        </h2>
        <p className="text-neutral-muted">
          Provide details about the position you're applying for so we can tailor
          your cover letter perfectly.
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate>
        <div className="space-y-6">

          {/* Job Title & Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-text">
                Job Title <span className="text-red-500 ml-1">*</span>
              </label>
              <FormField
                icons="work"
                registration={jobTitleReg}
                placeholder="e.g. Senior Product Designer"
                error={errors.jobTitle}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-text">
                Company Name <span className="text-red-500 ml-1">*</span>
              </label>
              <FormField
                icons="business"
                registration={companyNameReg}
                placeholder="e.g. Google, Acme Corp"
                error={errors.companyName}
              />
            </div>
          </div>

          {/* Location & Industry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-text">
                Location
              </label>
              <FormField
                icons="location_on"
                registration={locationReg}
                placeholder="e.g. New York, NY or Remote"
                error={errors.location}
              />
            </div>

            {/* FIX: removed the outer relative div + manual icon span.
                Industry was showing TWO icons — one from the wrapper div
                and one from FormField's icons prop. Now using a single
                relative wrapper with one icon + native select. */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-text">
                Industry
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-muted text-xl pointer-events-none z-10">
                  category
                </span>
                <select
                  {...industryReg}
                  className={`w-full pl-10 pr-8 py-3 rounded-lg border bg-neutral-surface text-neutral-text focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all appearance-none ${
                    errors.industry
                      ? "border-red-400 focus:ring-red-200"
                      : "border-neutral-border"
                  }`}
                >
                  <option value="">Select Industry</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind}>{ind}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-muted text-xl pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Job Type Button Group */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-neutral-text">
              Job Type
            </label>
            <div className="flex flex-wrap gap-3">
              {JOB_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleJobTypeChange(type.value)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                    jobType === type.value
                      ? "border-primary bg-primary-light/10 text-primary"
                      : "border-neutral-border bg-neutral-surface text-neutral-muted hover:border-primary/50 hover:text-neutral-text"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-neutral-text">
              Job Description / Requirements
              <span className="text-red-500 ml-1">*</span>
            </label>
            <p className="text-xs text-neutral-muted">
              Paste the job description here. The more detail you provide, the
              better your cover letter will be.
            </p>
            <textarea
              {...jobDescriptionReg}
              rows={6}
              placeholder="Paste the full job description or key requirements here..."
              className={`w-full px-4 py-3 rounded-lg border bg-neutral-surface text-neutral-text placeholder-neutral-muted focus:outline-none focus:ring-2 transition-all resize-none ${
                errors.jobDescription
                  ? "border-red-400 focus:ring-red-200"
                  : "border-neutral-border focus:ring-primary/40 focus:border-primary"
              }`}
            />
            <div className="flex justify-between items-center">
              {errors.jobDescription ? (
                <p className="text-[11px] text-red-500">
                  {errors.jobDescription.message}
                </p>
              ) : (
                <p className="text-xs text-neutral-muted">
                  Tip: Include responsibilities, required skills, and company values.
                </p>
              )}
              <span className="text-xs text-neutral-muted">{charCount} / 5000</span>
            </div>
          </div>

          {/* Hiring Manager */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-neutral-text">
              Hiring Manager's Name
              <span className="ml-2 text-xs font-normal text-neutral-muted">(Optional)</span>
            </label>
            <FormField
              icons="person"
              registration={hiringManagerNameReg}
              placeholder="e.g. Ms. Sarah Johnson"
              error={errors.hiringManagerName}
            />
            <p className="text-xs text-neutral-muted">
              Addressing the letter to a specific person makes it more personal and impactful.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-neutral-border flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark shadow-md shadow-primary/20 transition-all flex items-center gap-2"
          >
            Next Step
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobDetails;