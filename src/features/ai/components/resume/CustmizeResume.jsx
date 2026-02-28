import React from "react";
import {useNavigate} from "react-router-dom"
const CustmizeResume = () => {
  const navigate = useNavigate()
  const handleResume = () => {
    navigate("/optimizeResume")
  }
  return (
    <main className="flex-1 overflow-y-auto no-scrollbar p-8">
      <section className="bg-neutral-surface rounded-2xl border border-neutral-border p-8 shadow-sm space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-text mb-2">
            Customize Your Resume
          </h1>
          <p className="text-neutral-muted text-sm leading-relaxed">
            Tailor your experience for specific job descriptions using advanced
            AI matching.
          </p>
        </div>
        <div className="space-y-10">
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold text-black">
                  Step 1: Choose Your Resume
                </h3>
                <p className="text-sm text-slate-400">
                  Select a base resume or upload a new one
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="inpttext p-4 rounded-2xl border-2 cursor-pointer relative transition-all hover:border-primary/50 hover:scale-[1.02]">
                <div className="flex items-start justify-between mb-8">
                  <div className="h-10 w-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
                    <span className="material-symbols-outlined">
                      picture_as_pdf
                    </span>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[14px]">
                      check
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-black truncate">
                    Product_Designer_2024.pdf
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Uploaded 2 days ago • 1.2MB
                  </p>
                </div>
              </div>
              <div className="inpttext p-4 rounded-2xl border-2 cursor-pointer relative transition-all hover:border-primary/50 hover:scale-[1.02]">
                <div className="flex items-start mb-8">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <span className="material-symbols-outlined">description</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200 truncate">
                    Senior_Lead_Roles.docx
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Uploaded 3 weeks ago • 840KB
                  </p>
                </div>
              </div>
              <label className="border-2 border-dashed border-slate-500 hover:border-primary/50 rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer bg-slate-300/20 transition-all group min-h-35">
                <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors text-3xl mb-2">
                  cloud_upload
                </span>
                <span className="text-sm font-medium text-slate-400 group-hover:text-slate-200">
                  Upload New
                </span>
                <span className="text-[10px] text-slate-600">
                  PDF, DOCX up to 10MB
                </span>
                <input className="hidden" type="file" />
              </label>
            </div>
          </section>
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold text-black">
                  Step 2: Target Job
                </h3>
                <p className="text-sm text-slate-400">
                  Provide the job details you want to match
                </p>
              </div>
            </div>
            <div className="inpttext rounded-2xl p-6 space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium neutral-text">
                  Select from Active Applications
                </label>
                <div className="relative group hover:scale-[1.02]">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-500">
                      search
                    </span>
                  </div>
                  <select className="w-full font-dm bg-neutral-surface border border-neutral-border text-slate-500 text-sm rounded-xl block p-3.5 pl-11 pr-10 focus:ring-primary focus:border-primary transition-all">
                    <option>Search your current applications...</option>
                    <option>Senior Product Designer @ Stripe</option>
                    <option>Product Lead @ Meta</option>
                    <option>Senior UX Engineer @ Vercel</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3.5 text-slate-500">
                    expand_more
                  </span>
                </div>
              </div>
              <div className="relative py-2 flex items-center">
                <div className="grow border-t border-slate-800"></div>
                <span className="shrink mx-4 text-xs font-bold text-slate-600 uppercase tracking-widest">
                  OR
                </span>
                <div className="grow border-t border-slate-800"></div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-neutral-text">
                    Paste Job Description
                  </label>
                  <span className="text-[10px] text-slate-500 italic">
                    Supports plain text
                  </span>
                </div>
                <textarea
                  className="w-full border border-neutral-border text-slate-600 text-sm rounded-xl p-4 min-h-40 focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-slate-300"
                  placeholder="Paste the job description or specific requirements here for a better AI analysis..."
                ></textarea>
              </div>
            </div>
          </section>
        </div>
        <div className="pt-4 border-t border-neutral-border flex justify-center">
          <button onClick={handleResume} className="w-full max-w-md bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-3">
            <span className="material-symbols-outlined">
              temp_preferences_custom
            </span>
            Customize with AI
          </button>
        </div>
      </section>
    </main>
  );
};

export default CustmizeResume;
