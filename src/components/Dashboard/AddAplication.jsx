import React from "react";

const AddAplication = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased min-h-screen flex flex-col text-neutral-text relative">
      <div className="fixed inset-0 bg-neutral-text/50 z-40 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-neutral-surface w-full max-w-[800px] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
          <div className="flex items-center justify-between p-6 border-b border-neutral-border sticky top-0 bg-neutral-surface z-10 rounded-t-2xl">
            <h2 className="text-xl font-bold text-neutral-text">
              Add New Application
            </h2>
            <button className="p-2 text-neutral-muted hover:bg-background-light rounded-full transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="p-6 overflow-y-auto custom-scrollbar">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-text mb-1.5">
                      Job Title <span className="text-danger">*</span>
                    </label>
                    <input
                      className="inpttext pl-10 focus:border-primary focus:ring-primary placeholder:text-neutral-muted/70"
                      placeholder="e.g. Senior Product Designer"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-text mb-1.5">
                      Company <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-muted">
                        <span className="material-symbols-outlined text-[20px]">
                          search
                        </span>
                      </span>
                      <input
                        className="inpttext pl-10 focus:border-primary focus:ring-primary placeholder:text-neutral-muted/70"
                        placeholder="Search company..."
                        type="text"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-text mb-1.5">
                      Location
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-muted">
                        <span className="material-symbols-outlined text-[20px]">
                          location_on
                        </span>
                      </span>
                      <input
                        className="inpttext pl-10 focus:border-primary focus:ring-primary placeholder:text-neutral-muted/70"
                        placeholder="e.g. Remote, New York, NY"
                        type="text"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-text mb-1.5">
                      Application Date <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-muted">
                        <span className="material-symbols-outlined text-[20px]">
                          calendar_today
                        </span>
                      </span>
                      <input
                        className="inpttext pl-10 focus:border-primary focus:ring-primary placeholder:text-neutral-muted/70"
                        type="date"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-text mb-1.5">
                      Status <span className="text-danger">*</span>
                    </label>
                    <div className="relative">
                      <select className="inpttext focus:border-primary focus:ring-primary appearance-none bg-none pr-10">
                        <option selected="" value="applied">
                          Applied
                        </option>
                        <option value="interview">Interview</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-neutral-muted">
                        <span className="material-symbols-outlined">
                          expand_more
                        </span>
                      </span>
                      <div className="absolute inset-y-0 right-10 flex items-center pointer-events-none">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          Applied
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-text mb-1.5">
                      Salary Range (Optional)
                    </label>
                    <div className="flex gap-2">
                      <div className="relative w-1/2">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-muted text-sm">
                          $
                        </span>
                        <input
                          className="inpttext pl-6 focus:border-primary focus:ring-primary placeholder:text-neutral-muted/70"
                          placeholder="Min"
                          type="number"
                        />
                      </div>
                      <div className="relative w-1/2">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-muted text-sm">
                          $
                        </span>
                        <input
                          className="inpttext pl-6 focus:border-primary focus:ring-primary placeholder:text-neutral-muted/70"
                          placeholder="Max"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-text mb-1.5">
                      Job Post URL
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-muted">
                        <span className="material-symbols-outlined text-[20px]">
                          link
                        </span>
                      </span>
                      <input
                        className="inpttext pl-10 focus:border-primary focus:ring-primary placeholder:text-neutral-muted/70"
                        placeholder="https://..."
                        type="url"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-5 pt-2">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="block text-sm font-medium text-neutral-text">
                      Job Description <span className="text-danger">*</span>
                    </label>
                    <span className="text-xs text-neutral-muted">0/5000</span>
                  </div>
                  <textarea
                    className="inpttext pl-10 focus:border-primary focus:ring-primary placeholder:text-neutral-muted/70 resize-none"
                    placeholder="Paste the full job description here..."
                    rows="4"
                  ></textarea>
                </div>
                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="block text-sm font-medium text-neutral-text">
                      Notes
                    </label>
                    <span className="text-xs text-neutral-muted">0/1000</span>
                  </div>
                  <textarea
                    className="inpttext pl-10 focus:border-primary focus:ring-primary placeholder:text-neutral-muted/70 resize-none"
                    placeholder="Add any personal notes, referral info, etc."
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
          <div className="p-6 border-t border-neutral-border bg-neutral-surface rounded-b-2xl sticky bottom-0 flex justify-end gap-3 z-10">
            <button className="px-5 py-2.5 rounded-lg border border-neutral-border text-neutral-text font-medium hover:bg-background-light transition-colors text-sm">
              Cancel
            </button>
            <button className="px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-sm text-sm">
              Add Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAplication;
