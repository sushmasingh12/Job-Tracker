import React from "react";

const Resume = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl mx-auto p-8 space-y-12 pb-32">
      <section className="bg-neutral-surface rounded-2xl border border-neutral-border p-8 shadow-sm space-y-8">
<div>
<h1 className="text-2xl font-extrabold text-neutral-text mb-2">Customize Your Resume</h1>
<p className="text-neutral-muted text-sm leading-relaxed">Tailor your experience for specific job descriptions using advanced AI matching.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div className="space-y-6">
<div className="space-y-3">
<label className="block text-sm font-semibold text-neutral-text">Target Job Application</label>
<div className="relative group">
<select className="w-full rounded-xl border-neutral-border bg-white text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 appearance-none py-3 px-4 transition-all">
<option value="1">Senior UI/UX Designer - Tech Innovators Inc.</option>
<option value="2">Product Design Lead - Fintech Solutions</option>
<option value="3">Frontend Specialist - Global Scale</option>
</select>
<span className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-neutral-muted">
<span className="material-symbols-outlined">unfold_more</span>
</span>
</div>
<button className="text-primary text-xs font-semibold flex items-center gap-1 hover:underline">
<span className="material-symbols-outlined text-sm">add_circle</span>
                                    Add new job description
                                </button>
</div>
<div className="space-y-3">
<label className="block text-sm font-semibold text-neutral-text">Upload Resume</label>
<div className="border-2 border-dashed border-neutral-border rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary hover:bg-primary-light/30 transition-all cursor-pointer group bg-slate-50/50">
<div className="h-12 w-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-primary text-2xl">upload_file</span>
</div>
<h3 className="text-sm font-bold text-neutral-text">Drag and drop your resume</h3>
<p className="text-xs text-neutral-muted mt-1 font-medium italic">PDF or DOCX (max 5MB)</p>
</div>
<div className="bg-white rounded-xl p-4 flex items-center gap-4 border border-neutral-border shadow-sm">
<div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 shrink-0">
<span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between mb-1.5">
<span className="text-sm font-semibold text-neutral-text truncate">Alex_Chen_Design_2024.pdf</span>
<span className="text-xs font-bold text-success">100%</span>
</div>
<div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
<div className="bg-success h-full rounded-full transition-all duration-500" style={{width: "100%"}}></div>
</div>
</div>
<button className="p-1 text-neutral-muted hover:text-danger transition-colors">
<span className="material-symbols-outlined">delete</span>
</button>
</div>
</div>
</div>
<div className="space-y-3">
<label className="block text-sm font-semibold text-neutral-text">Resume Content</label>
<textarea className="w-full rounded-xl border-neutral-border text-sm focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-neutral-muted/50 resize-none h-full min-h-[250px] p-4 font-mono leading-relaxed bg-slate-50/30" placeholder="Paste your resume text here to analyze..."></textarea>
</div>
</div>
<div className="pt-4 border-t border-neutral-border flex justify-center">
<button className="w-full max-w-md bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-3">
<span className="material-symbols-outlined">temp_preferences_custom</span>
                            Customize with AI
                        </button>
</div>
</section>
      </div>
    </div>
  );
};

export default Resume;
