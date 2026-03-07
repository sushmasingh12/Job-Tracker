import React from 'react'
import { useWatch } from 'react-hook-form'

import { RULES, useApplicationForm } from '../hook/useApplication'
import { FormField } from '../../../shared/components/ui/FormField'
import { STATUS_CONFIG } from '../contants/Applicationconstants'

const STATUS_OPTIONS = Object.entries(STATUS_CONFIG).map(([value, cfg]) => ({
  value,
  label: cfg.label,
}))

const ApplicationForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
  } = useApplicationForm()
  
  // Live status badge
  const watchedStatus = useWatch({ control, name: 'status', defaultValue: 'applied' })
  const statusCfg = STATUS_CONFIG[watchedStatus] ?? STATUS_CONFIG.applied

  // Live character counters
  const watchedDesc  = useWatch({ control, name: 'jobDescription', defaultValue: '' })
  const watchedNotes = useWatch({ control, name: 'notes', defaultValue: '' })

  return (
    <div className="fixed inset-0 bg-neutral-text/50 z-40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-surface w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-border sticky top-0 bg-neutral-surface z-10 rounded-t-2xl">
          <h2 className="text-xl font-bold text-neutral-text">Add New Application</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-neutral-muted hover:bg-background-light rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {/* id="app-form" — footer ke submit button se connect karne ke liye */}
          <form id="app-form" onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Left Column */}
              <div className="space-y-1">
                
                <FormField
                  label="Job Title"
                  icon="title"
                  type="text"
                  placeholder="e.g. Senior Product Designer"
                  registration={register('jobTitle',RULES.jobTitle)}
                  error={errors.jobTitle}
                />

                <FormField
                  label="Company"
                  required
                  icon="domain"
                  type="text"
                  placeholder="Search company..."
                  registration={register('company',RULES.company)}
                  error={errors.company}
                />

                <FormField
                  label="Location"
                  icon="location_on"
                  type="text"
                  placeholder="e.g. Remote, New York, NY"
                  registration={register('location',RULES.location)}
                  error={errors.location}
                />

                <FormField
                  label="Application Date"
                  required
                  icon="calendar_today"
                  type="date"
                  registration={register('applicationDate', RULES.applicationDate)}
                  error={errors.applicationDate}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-1">

                {/* Status — children prop se custom select */}
                <FormField label="Status" required error={errors.status}>
                  <div className="relative">
                    <select
                      {...register('status')}
                      className={`inpttext w-full appearance-none pr-36 ${
                        errors.status
                          ? 'border-red-400'
                          : 'focus:border-primary focus:ring-2 focus:ring-primary/20'
                      }`}
                    >
                      {STATUS_OPTIONS.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    {/* Live status badge */}
                    <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${statusCfg.badgeCls}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dotColor}`} />
                        {statusCfg.label}
                      </span>
                    </div>
                    <span className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-neutral-muted">
                      <span className="material-symbols-outlined text-[20px]">expand_more</span>
                    </span>
                  </div>
                </FormField>

                {/* Salary Range */}
                <div className="mb-5">
                  <label className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text mb-1.5">
                    Salary Range
                    <span className="ml-1 font-normal normal-case text-neutral-muted">(optional)</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-muted text-sm font-semibold">$</span>
                      <input
                        {...register('salaryMin')}
                        type="number" min="0" placeholder="Min"
                        className={`inpttext w-full pl-7 ${
                          errors.salaryMin ? 'border-red-400' : 'focus:border-primary focus:ring-2 focus:ring-primary/20'
                        }`}
                      />
                      {errors.salaryMin && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.salaryMin.message}</p>
                      )}
                    </div>
                    <span className="text-neutral-muted font-medium mt-2.5 shrink-0">—</span>
                    <div className="relative flex-1">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-muted text-sm font-semibold">$</span>
                      <input
                        {...register('salaryMax')}
                        type="number" min="0" placeholder="Max"
                        className={`inpttext w-full pl-7 ${
                          errors.salaryMax ? 'border-red-400' : 'focus:border-primary focus:ring-2 focus:ring-primary/20'
                        }`}
                      />
                      {errors.salaryMax && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.salaryMax.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <FormField
                  label="Job Post URL"
                  icon="link"
                  type="url"
                  placeholder="https://..."
                  registration={register('jobPostUrl', RULES.jobPostUrl)}
                  error={errors.jobPostUrl}
                />
              </div>
            </div>

            {/* Full Width — Description + Notes */}
            <div className="space-y-5 pt-2">

              {/* Job Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text">
                    Job Description <span className="text-danger">*</span>
                  </label>
                  <span className={`text-[10px] font-medium tabular-nums ${
                    watchedDesc.length > 4800 ? 'text-red-400' :
                    watchedDesc.length > 4000 ? 'text-amber-400' : 'text-neutral-muted'
                  }`}>
                    {watchedDesc.length} / 5000
                  </span>
                </div>
                <textarea
                  {...register('jobDescription', RULES.jobDescription)}
                  
                  placeholder="Paste the full job description here..."
                  className={`inpttext w-full resize-none ${
                    errors.jobDescription
                      ? 'border-red-400 focus:border-red-500'
                      : 'focus:border-primary focus:ring-2 focus:ring-primary/20'
                  }`}
                />
                {errors.jobDescription && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {errors.jobDescription.message}
                  </p>
                )}
              </div>

              {/* Notes */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text">
                    Notes
                    <span className="ml-1 font-normal normal-case text-neutral-muted">(optional)</span>
                  </label>
                  <span className={`text-[10px] font-medium tabular-nums ${
                    watchedNotes.length > 900 ? 'text-amber-400' : 'text-neutral-muted'
                  }`}>
                    {watchedNotes.length} / 1000
                  </span>
                </div>
                <textarea
                  {...register('notes', RULES.notes)}
                  placeholder="Add any personal notes, referral info, etc."
                  className={`inpttext w-full resize-none ${
                    errors.notes ? 'border-red-400' : 'focus:border-primary focus:ring-2 focus:ring-primary/20'
                  }`}
                />
                {errors.notes && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.notes.message}</p>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer — button bahar hai toh form="app-form" se connect */}
        <div className="p-6 border-t border-neutral-border bg-neutral-surface rounded-b-2xl sticky bottom-0 flex justify-end gap-3 z-10">
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
              <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
            )}
            Add Application
          </button>
        </div>

      </div>
    </div>
  )
}

export default ApplicationForm