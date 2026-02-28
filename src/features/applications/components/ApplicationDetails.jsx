import React from "react";

const ApplicationDetails = () => {
  return (
    <div class="flex-1 overflow-auto bg-background-light dark:bg-background-dark p-4 lg:p-8">
      <div class="flex flex-col lg:flex-row gap-6 h-[calc(100%2rem)]">
        <div class="flex-1 lg:w-3/5 flex flex-col gap-6 overflow-y-auto pr-2">
          <div class="relative rounded-2xl bg-neutral-surface dark:bg-dark border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm p-6 shadow-sm overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div class="flex items-start justify-between gap-4 mb-6">
              <div class="flex items-center gap-5">
                <div class="h-20 w-20 rounded-2xl flex items-center justify-center bg-indigo-600/10 text-3xl font-bold text-indigo-600 dark:text-indigo-400 shadow-inner border border-indigo-200 dark:border-indigo-500/30 shrink-0">
                  S
                </div>
                <div>
                  <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Senior Frontend Developer
                  </h1>
                  <div class="flex items-center gap-3 mt-2 text-sm">
                    <span class="font-semibold text-slate-700 dark:text-slate-200 text-lg">
                      Stripe
                    </span>
                    <span class="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                    <span class="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <span class="material-symbols-outlined text-[16px]">
                        location_on
                      </span>
                      San Francisco, CA (Remote)
                    </span>
                  </div>
                  <div class="flex gap-3 mt-3">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      Full-time
                    </span>
                    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/30">
                      $180k - $240k
                    </span>
                    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/30">
                      Posted 3 days ago
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-end gap-2">
                <div class="absolute top-6 right-6 flex flex-col items-center">
                  <div class="relative h-10 w-10 flex items-center justify-center">
                    <svg class="h-full w-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        class="text-slate-100 dark:text-slate-700/50"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                      ></path>
                      <path
                        class="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        stroke-dasharray="78, 100"
                        stroke-width="3"
                      ></path>
                    </svg>
                    <div class="absolute flex flex-col items-center">
                      <span class="text-xs font-bold text-slate-500 dark:text-white">
                        78%
                      </span>
                    </div>
                  </div>
                  <span class="text-xs font-semibold text-emerald-500 mt-1">
                    High Match
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1 flex flex-col bg-neutral-surface dark:bg-dark border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden">
            <div class="flex items-center border-b border-slate-200 dark:border-slate-700/50 px-2 pt-2">
              <button class="px-6 py-3 text-sm font-medium border-b-2 border-primary text-primary dark:text-blue-400">
                Overview
              </button>
              <button class="px-6 py-3 text-sm font-medium border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                Resume
              </button>
              <button class="px-6 py-3 text-sm font-medium border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                Cover Letter
              </button>
              <button class="px-6 py-3 text-sm font-medium border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                Notes
              </button>
              <button class="px-6 py-3 text-sm font-medium border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                Timeline
              </button>
            </div>
            <div class="p-6 overflow-y-auto custom-scrollbar flex-1 relative">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                About the Role
              </h3>
              <div class="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                <p class="mb-4">
                  We are looking for an experienced Senior Frontend Developer to
                  join our core product team. You will be responsible for
                  building high-quality, performant user interfaces that power
                  millions of transactions daily.
                </p>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  Key Responsibilities:
                </h4>
                <ul class="list-disc pl-5 mb-4 space-y-1">
                  <li>
                    Architect and build scalable frontend applications using
                    React and TypeScript.
                  </li>
                  <li>
                    Collaborate with designers and backend engineers to deliver
                    seamless user experiences.
                  </li>
                  <li>
                    Optimize application performance for maximum speed and
                    scalability.
                  </li>
                  <li>
                    Mentor junior developers and contribute to engineering best
                    practices.
                  </li>
                </ul>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  Requirements:
                </h4>
                <ul class="list-disc pl-5 mb-4 space-y-1">
                  <li>
                    5+ years of experience with modern JavaScript frameworks
                    (React, Vue, Angular).
                  </li>
                  <li>
                    Strong understanding of web fundamentals (HTML, CSS,
                    accessibility).
                  </li>
                  <li>
                    Experience with state management libraries (Redux, Zustand,
                    Recoil).
                  </li>
                  <li>
                    Familiarity with build tools (Webpack, Vite) and CI/CD
                    pipelines.
                  </li>
                </ul>
                <h4 class="text-sm font-bold text-slate-900 dark:text-white mb-2">
                  Benefits:
                </h4>
                <ul class="list-disc pl-5 space-y-1">
                  <li>Competitive salary and equity package.</li>
                  <li>Comprehensive health, dental, and vision insurance.</li>
                  <li>Remote-first culture with flexible working hours.</li>
                  <li>Annual learning and development stipend.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="w-[30%] space-y-6">
          <div class="relative rounded-2xl bg-neutral-surface dark:bg-dark border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm p-6 shadow-sm overflow-hidden">
            <h3 class="text-sm font-bold text-neutral-text uppercase tracking-wider mb-6">
              Status History
            </h3>
            <div class="space-y-6">
              <div class="flex gap-3 relative">
                <div class="h-6 w-6 rounded-full bg-orange-500 flex items-center justify-center shrink-0 z-10">
                  <span class="material-symbols-outlined text-white text-sm">
                    chat_bubble
                  </span>
                </div>
                <div class="absolute left-3 top-6 bottom-0 w-px h-6 bg-neutral-border -translate-x-1/2"></div>
                <div>
                  <p class="text-sm font-bold text-neutral-text">
                    Interviewing
                  </p>
                  <p class="text-xs text-neutral-muted">Today, 10:45 AM</p>
                </div>
              </div>
              <div class="flex gap-3 relative">
                <div class="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0 z-10">
                  <span class="material-symbols-outlined text-white text-sm">
                    check_circle
                  </span>
                </div>
                <div class="absolute left-3 top-6 bottom-0 w-px h-6 bg-neutral-border -translate-x-1/2"></div>
                <div>
                  <p class="text-sm font-medium text-neutral-text">
                    Application Reviewed
                  </p>
                  <p class="text-xs text-neutral-muted">Oct 25, 2023</p>
                </div>
              </div>
              <div class="flex gap-3">
                <div class="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center shrink-0 z-10">
                  <span class="material-symbols-outlined text-white text-sm">
                    send
                  </span>
                </div>
                <div>
                  <p class="text-sm font-medium text-neutral-text">Applied</p>
                  <p class="text-xs text-neutral-muted">Oct 24, 2023</p>
                </div>
              </div>
            </div>
          </div>
          <div class="relative rounded-2xl bg-neutral-surface dark:bg-dark border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm p-6 shadow-sm overflow-hidden">
            <h3 class="text-sm font-bold text-neutral-text uppercase tracking-wider mb-6">
              Application Materials
            </h3>
            <div class="space-y-4">
              <div class="group p-3 rounded-lg border border-neutral-border hover:border-primary transition-colors bg-neutral-surface">
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 rounded bg-red-50 text-danger flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined">description</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-neutral-text truncate">
                      Resume_Custom.pdf
                    </p>
                    <p class="text-[10px] text-neutral-muted font-medium">
                      Optimized for Stripe
                    </p>
                  </div>
                </div>
                <div class="mt-3 flex gap-2">
                  <button class="flex-1 text-[10px] font-bold py-1.5 rounded bg-background-light hover:bg-neutral-border transition-colors flex items-center justify-center gap-1 uppercase">
                    <span class="material-symbols-outlined text-sm">
                      download
                    </span>
                    Download
                  </button>
                  <button class="flex-1 text-[10px] font-bold py-1.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center justify-center gap-1 uppercase">
                    <span class="material-symbols-outlined text-sm">
                      autorenew
                    </span>
                    Regenerate
                  </button>
                </div>
              </div>
              <div class="group p-3 rounded-lg border border-neutral-border hover:border-primary transition-colors bg-neutral-surface">
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 rounded bg-blue-50 text-primary flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined font-variation-fill">
                      article
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-neutral-text truncate">
                      Cover_Letter_Final.pdf
                    </p>
                    <p class="text-[10px] text-neutral-muted font-medium">
                      Generated by AI
                    </p>
                  </div>
                </div>
                <div class="mt-3 flex gap-2">
                  <button class="flex-1 text-[10px] font-bold py-1.5 rounded bg-background-light hover:bg-neutral-border transition-colors flex items-center justify-center gap-1 uppercase">
                    <span class="material-symbols-outlined text-sm">
                      download
                    </span>
                    Download
                  </button>
                  <button class="flex-1 text-[10px] font-bold py-1.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center justify-center gap-1 uppercase">
                    <span class="material-symbols-outlined text-sm">
                      autorenew
                    </span>
                    Regenerate
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-sidebar rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
            <div class="relative z-10">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                JobTrackr Insight
              </h3>
              <p class="text-sm font-medium leading-relaxed">
                Your profile matches{" "}
                <span class="text-primary-light font-bold">87%</span>
                of the requirements for this role. Key missing skill:{" "}
                <span class="bg-slate-700 px-1.5 rounded text-xs">
                  Framer AI
                </span>
              </p>
              <button class="mt-4 w-full py-2 bg-primary hover:bg-primary-dark rounded text-xs font-bold transition-colors">
                VIEW MATCH REPORT
              </button>
            </div>
            <span class="material-symbols-outlined absolute -right-4 -bottom-4 text-7xl text-white/5 font-variation-fill">
              psychology
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
