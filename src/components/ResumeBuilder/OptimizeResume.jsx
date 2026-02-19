import React from "react";

const OptimizeResume = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="max-w-4xl mx-auto p-8 space-y-12 pb-32">
      <section className="space-y-8">
<div className="flex items-center justify-between">
<div>
<div className="flex items-center gap-2 text-primary mb-1">
<span className="material-symbols-outlined text-xl">auto_awesome</span>
<span className="text-xs font-bold uppercase tracking-wider">AI Optimization Ready</span>
</div>
<h2 className="text-2xl font-extrabold text-neutral-text tracking-tight">Optimization Results</h2>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
<div className="md:col-span-5 lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-neutral-border flex flex-col items-center">
<h3 className="text-sm font-bold text-neutral-muted mb-6">ATS Match Score</h3>
<div className="relative flex items-center justify-center">
<svg className="w-40 h-40 transform -rotate-90">
<circle className="text-slate-100" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" stroke-width="12"></circle>
<circle className="text-success" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" stroke-dasharray="440" stroke-dashoffset="79.2" stroke-linecap="round" stroke-width="12"></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-4xl font-black text-neutral-text">82<span className="text-xl font-bold text-neutral-muted">%</span></span>
<span className="text-[10px] bg-success/10 text-success font-black px-2 py-0.5 rounded-full mt-1">OPTIMIZED</span>
</div>
</div>
<p className="mt-6 text-xs text-neutral-muted text-center font-medium leading-relaxed px-2">
                                Your resume matches 82% of the job requirements. Add missing keywords to reach 95%+.
                            </p>
</div>
<div className="md:col-span-7 lg:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-neutral-border">
<div className="flex justify-between items-center mb-5">
<h3 className="text-sm font-bold text-neutral-text">Missing Keywords</h3>
<span className="text-[10px] font-black text-neutral-muted bg-slate-100 px-2 py-1 rounded">5 DETECTED</span>
</div>
<div className="flex flex-wrap gap-2.5">
<span className="group flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100 hover:bg-blue-100 cursor-pointer transition-colors">
                                    User Research <span className="material-symbols-outlined text-sm">add</span>
</span>
<span className="group flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100 hover:bg-blue-100 cursor-pointer transition-colors">
                                    Design Systems <span className="material-symbols-outlined text-sm">add</span>
</span>
<span className="group flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100 hover:bg-blue-100 cursor-pointer transition-colors">
                                    Stakeholder Management <span className="material-symbols-outlined text-sm">add</span>
</span>
<span className="group flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100 hover:bg-blue-100 cursor-pointer transition-colors">
                                    Figma Prototyping <span className="material-symbols-outlined text-sm">add</span>
</span>
<span className="group flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100 hover:bg-blue-100 cursor-pointer transition-colors">
                                    A/B Testing <span className="material-symbols-outlined text-sm">add</span>
</span>
</div>
<div className="mt-6 p-4 bg-slate-50 rounded-xl border border-dashed border-neutral-border">
<div className="flex gap-3">
<span className="material-symbols-outlined text-primary">lightbulb</span>
<p className="text-xs text-neutral-muted leading-relaxed">
<span className="font-bold text-neutral-text text-xs block mb-1">AI Tip:</span>
                                        Integrating <span className="text-primary font-bold">"Design Systems"</span> into your current role description could boost your score by 8%.
                                    </p>
</div>
</div>
</div>
</div>
<div className="bg-white rounded-2xl shadow-sm border border-neutral-border overflow-hidden">
<div className="p-6 border-b border-neutral-border flex justify-between items-center bg-slate-50/30">
<h3 className="text-base font-bold text-neutral-text">Priority Action Items</h3>
<span className="px-2 py-1 bg-warning/10 text-warning text-[10px] font-black rounded uppercase">Attention Required</span>
</div>
<div className="divide-y divide-neutral-border">
<div className="p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors group">
<div className="mt-1 h-6 w-6 rounded-full bg-warning/20 text-warning flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-lg font-bold">priority_high</span>
</div>
<div className="flex-1">
<h4 className="text-sm font-bold text-neutral-text group-hover:text-primary transition-colors">Quantify Achievements</h4>
<p className="text-xs text-neutral-muted mt-1 leading-relaxed">Your "Senior Designer" role lacks metrics. Add data like "% growth" or "revenue impact" to stand out to recruiters.</p>
</div>
<button className="text-xs font-bold text-primary px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary hover:text-white transition-all">Resolve</button>
</div>
<div className="p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors group">
<div className="mt-1 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-lg font-bold">reorder</span>
</div>
<div className="flex-1">
<h4 className="text-sm font-bold text-neutral-text group-hover:text-primary transition-colors">Education Formatting</h4>
<p className="text-xs text-neutral-muted mt-1 leading-relaxed">Move your certifications below professional experience to align with standard tech industry templates.</p>
</div>
<button className="text-xs font-bold text-primary px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary hover:text-white transition-all">Apply</button>
</div>
</div>
</div>
<div className="bg-white rounded-2xl shadow-sm border border-neutral-border overflow-hidden">
<div className="p-6 border-b border-neutral-border flex justify-between items-center bg-slate-50/50">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary">history_edu</span>
<h3 className="text-base font-bold text-neutral-text">Experience Optimization</h3>
</div>
</div>
<div className="p-6">
<div className="mb-6">
<div className="flex items-center gap-2 mb-1">
<h4 className="text-sm font-bold text-neutral-text">Senior Product Designer</h4>
<span className="text-xs text-neutral-muted">• TechCorp Solutions</span>
</div>
<div className="flex items-center gap-2">
<span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-black rounded uppercase">AI Optimized</span>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="space-y-3">
<div className="flex items-center gap-2 text-danger">
<span className="material-symbols-outlined text-sm">history</span>
<span className="text-[10px] font-black uppercase tracking-widest">Original Version</span>
</div>
<div className="bg-slate-50 border border-neutral-border rounded-xl p-5 min-h-[140px]">
<p className="text-sm text-neutral-muted leading-relaxed">
                                            Designed user interfaces for mobile apps. Worked with the development team to ensure designs were implemented correctly. Managed a team of 2 junior designers.
                                        </p>
</div>
</div>
<div className="space-y-3">
<div className="flex items-center gap-2 text-success">
<span className="material-symbols-outlined text-sm">auto_awesome</span>
<span className="text-[10px] font-black uppercase tracking-widest">AI Recommended</span>
</div>
<div className="bg-primary-light/30 border border-primary/10 rounded-xl p-5 min-h-[140px] relative">
<p className="text-sm text-neutral-800 leading-relaxed">
                                            Spearheaded <span className="bg-yellow-200/60 rounded px-1 font-medium">end-to-end UI design</span> for high-traffic mobile apps, resulting in a <span className="bg-yellow-200/60 rounded px-1 font-medium">22% increase in user engagement</span>. Collaborated cross-functionally with engineering via <span className="bg-yellow-200/60 rounded px-1 font-medium">Agile workflows</span> to ensure pixel-perfect delivery.
                                        </p>
<div className="mt-4 pt-4 border-t border-primary/10 flex justify-end gap-3">
<button className="px-3 py-1.5 text-xs font-bold text-neutral-muted hover:text-neutral-text transition-colors">Discard</button>
<button className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark shadow-sm transition-all flex items-center gap-1.5">
<span className="material-symbols-outlined text-sm">check</span>
                                                Apply
                                            </button>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
      </div>
    </div>
  );
};

export default OptimizeResume;
