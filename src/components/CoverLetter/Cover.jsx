import React from "react";

const Cover = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="p-8 space-y-12 pb-32">
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-neutral-text">
              Generate Cover Letter
            </h1>
            <span className="text-sm font-medium text-neutral-muted">
              Step 3 of 4
            </span>
          </div>
          <div className="w-full bg-neutral-border rounded-full h-2.5 overflow-hidden">
            <div className="bg-primary h-2.5 rounded-full w-[75%] transition-all duration-500"></div>
          </div>
          <div className="flex justify-between mt-2 text-xs font-medium text-neutral-muted">
            <span className="text-primary">Job Details</span>
            <span className="text-primary">Experience</span>
            <span className="text-primary">Choose Tone</span>
            <span>Review</span>
          </div>
        </div>
        <div className="bg-neutral-surface rounded-xl shadow-sm border border-neutral-border p-8">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold text-neutral-text mb-2">
              How should this cover letter sound?
            </h2>
            <p className="text-neutral-muted">
              Select a tone that best matches the company culture and your
              personal brand.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="radiogroup">
            <label className="relative cursor-pointer group">
              <input
                checked=""
                className="peer sr-only"
                name="tone"
                type="radio"
                value="professional"
              />
              <div className="h-full p-6 rounded-xl border-2 border-neutral-border bg-neutral-surface hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary-light/10 transition-all shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 h-12 w-12 rounded-full bg-primary-light flex items-center justify-center text-primary peer-checked:bg-primary peer-checked:text-white transition-colors">
                    <span className="material-symbols-outlined text-2xl">
                      business_center
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-text peer-checked:text-primary">
                      Professional
                    </h3>
                    <p className="text-sm text-neutral-muted mt-1">
                      Formal, respectful, and strictly business-oriented. Best
                      for corporate, legal, or finance roles.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-border/50">
                  <p className="text-xs text-neutral-muted italic font-medium bg-background-light p-3 rounded">
                    "I am writing to express my formal interest in the Senior
                    Manager position..."
                  </p>
                </div>
                <div className="absolute top-6 right-6 opacity-0 peer-checked:opacity-100 transition-opacity text-primary">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
              </div>
            </label>
            <label className="relative cursor-pointer group">
              <input
                className="peer sr-only"
                name="tone"
                type="radio"
                value="enthusiastic"
              />
              <div className="h-full p-6 rounded-xl border-2 border-neutral-border bg-neutral-surface hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary-light/10 transition-all shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 peer-checked:bg-primary peer-checked:text-white transition-colors">
                    <span className="material-symbols-outlined text-2xl">star</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-text peer-checked:text-primary">
                      Enthusiastic
                    </h3>
                    <p className="text-sm text-neutral-muted mt-1">
                      Energetic, passionate, and eager. Ideal for startups,
                      sales, or customer-facing roles.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-border/50">
                  <p className="text-xs text-neutral-muted italic font-medium bg-background-light p-3 rounded">
                    "I was absolutely thrilled to see an opening for the
                    Marketing Lead role at your innovative company..."
                  </p>
                </div>
                <div className="absolute top-6 right-6 opacity-0 peer-checked:opacity-100 transition-opacity text-primary">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
              </div>
            </label>
            <label className="relative cursor-pointer group">
              <input
                className="peer sr-only"
                name="tone"
                type="radio"
                value="conservative"
              />
              <div className="h-full p-6 rounded-xl border-2 border-neutral-border bg-neutral-surface hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary-light/10 transition-all shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 peer-checked:bg-primary peer-checked:text-white transition-colors">
                    <span className="material-symbols-outlined text-2xl">
                      shield
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-text peer-checked:text-primary">
                      Conservative
                    </h3>
                    <p className="text-sm text-neutral-muted mt-1">
                      Traditional, concise, and direct. Suitable for government,
                      academic, or highly regulated industries.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-border/50">
                  <p className="text-xs text-neutral-muted italic font-medium bg-background-light p-3 rounded">
                    "Please accept this letter and the attached resume as an
                    application for the Analyst vacancy."
                  </p>
                </div>
                <div className="absolute top-6 right-6 opacity-0 peer-checked:opacity-100 transition-opacity text-primary">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
              </div>
            </label>
            <label className="relative cursor-pointer group">
              <input
                className="peer sr-only"
                name="tone"
                type="radio"
                value="creative"
              />
              <div className="h-full p-6 rounded-xl border-2 border-neutral-border bg-neutral-surface hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary-light/10 transition-all shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 peer-checked:bg-primary peer-checked:text-white transition-colors">
                    <span className="material-symbols-outlined text-2xl">
                      palette
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-text peer-checked:text-primary">
                      Creative
                    </h3>
                    <p className="text-sm text-neutral-muted mt-1">
                      Original, storytelling-focused, and unique. Perfect for
                      design, media, or advertising agencies.
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-border/50">
                  <p className="text-xs text-neutral-muted italic font-medium bg-background-light p-3 rounded">
                    "Design isn't just my job; it's how I solve problems. That's
                    why your mission at CreativeCo resonated with me..."
                  </p>
                </div>
                <div className="absolute top-6 right-6 opacity-0 peer-checked:opacity-100 transition-opacity text-primary">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
              </div>
            </label>
          </div>
          <div className="mt-10 pt-6 border-t border-neutral-border flex justify-end gap-4">
            <button className="px-6 py-3 rounded-lg border border-neutral-border text-neutral-text font-medium hover:bg-background-light hover:text-neutral-text transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back
            </button>
            <button className="px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-dark shadow-md shadow-primary/20 transition-all flex items-center gap-2">
              Next Step
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
