import React from "react";

const OptimizeResume = () => {
  return (
    <div class="flex-1 overflow-y-auto custom-scrollbar">
      <div class="max-w-4xl mx-auto p-8 space-y-12 pb-32">
      <section class="space-y-8">
<div class="flex items-center justify-between">
<div>
<div class="flex items-center gap-2 text-primary mb-1">
<span class="material-symbols-outlined text-xl">auto_awesome</span>
<span class="text-xs font-bold uppercase tracking-wider">AI Optimization Ready</span>
</div>
<h2 class="text-2xl font-extrabold text-neutral-text tracking-tight">Optimization Results</h2>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-12 gap-6">
<div class="md:col-span-5 lg:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-neutral-border flex flex-col items-center">
<h3 class="text-sm font-bold text-neutral-muted mb-6">ATS Match Score</h3>
<div class="relative flex items-center justify-center">
<svg class="w-40 h-40 transform -rotate-90">
<circle class="text-slate-100" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" stroke-width="12"></circle>
<circle class="text-success" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" stroke-dasharray="440" stroke-dashoffset="79.2" stroke-linecap="round" stroke-width="12"></circle>
</svg>
<div class="absolute inset-0 flex flex-col items-center justify-center">
<span class="text-4xl font-black text-neutral-text">82<span class="text-xl font-bold text-neutral-muted">%</span></span>
<span class="text-[10px] bg-success/10 text-success font-black px-2 py-0.5 rounded-full mt-1">OPTIMIZED</span>
</div>
</div>
<p class="mt-6 text-xs text-neutral-muted text-center font-medium leading-relaxed px-2">
                                Your resume matches 82% of the job requirements. Add missing keywords to reach 95%+.
                            </p>
</div>
<div class="md:col-span-7 lg:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-neutral-border">
<div class="flex justify-between items-center mb-5">
<h3 class="text-sm font-bold text-neutral-text">Missing Keywords</h3>
<span class="text-[10px] font-black text-neutral-muted bg-slate-100 px-2 py-1 rounded">5 DETECTED</span>
</div>
<div class="flex flex-wrap gap-2.5">
<span class="group flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100 hover:bg-blue-100 cursor-pointer transition-colors">
                                    User Research <span class="material-symbols-outlined text-sm">add</span>
</span>
<span class="group flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100 hover:bg-blue-100 cursor-pointer transition-colors">
                                    Design Systems <span class="material-symbols-outlined text-sm">add</span>
</span>
<span class="group flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100 hover:bg-blue-100 cursor-pointer transition-colors">
                                    Stakeholder Management <span class="material-symbols-outlined text-sm">add</span>
</span>
<span class="group flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100 hover:bg-blue-100 cursor-pointer transition-colors">
                                    Figma Prototyping <span class="material-symbols-outlined text-sm">add</span>
</span>
<span class="group flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100 hover:bg-blue-100 cursor-pointer transition-colors">
                                    A/B Testing <span class="material-symbols-outlined text-sm">add</span>
</span>
</div>
<div class="mt-6 p-4 bg-slate-50 rounded-xl border border-dashed border-neutral-border">
<div class="flex gap-3">
<span class="material-symbols-outlined text-primary">lightbulb</span>
<p class="text-xs text-neutral-muted leading-relaxed">
<span class="font-bold text-neutral-text text-xs block mb-1">AI Tip:</span>
                                        Integrating <span class="text-primary font-bold">"Design Systems"</span> into your current role description could boost your score by 8%.
                                    </p>
</div>
</div>
</div>
</div>
<div class="bg-white rounded-2xl shadow-sm border border-neutral-border overflow-hidden">
<div class="p-6 border-b border-neutral-border flex justify-between items-center bg-slate-50/30">
<h3 class="text-base font-bold text-neutral-text">Priority Action Items</h3>
<span class="px-2 py-1 bg-warning/10 text-warning text-[10px] font-black rounded uppercase">Attention Required</span>
</div>
<div class="divide-y divide-neutral-border">
<div class="p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors group">
<div class="mt-1 h-6 w-6 rounded-full bg-warning/20 text-warning flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-lg font-bold">priority_high</span>
</div>
<div class="flex-1">
<h4 class="text-sm font-bold text-neutral-text group-hover:text-primary transition-colors">Quantify Achievements</h4>
<p class="text-xs text-neutral-muted mt-1 leading-relaxed">Your "Senior Designer" role lacks metrics. Add data like "% growth" or "revenue impact" to stand out to recruiters.</p>
</div>
<button class="text-xs font-bold text-primary px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary hover:text-white transition-all">Resolve</button>
</div>
<div class="p-5 flex items-start gap-4 hover:bg-slate-50 transition-colors group">
<div class="mt-1 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-lg font-bold">reorder</span>
</div>
<div class="flex-1">
<h4 class="text-sm font-bold text-neutral-text group-hover:text-primary transition-colors">Education Formatting</h4>
<p class="text-xs text-neutral-muted mt-1 leading-relaxed">Move your certifications below professional experience to align with standard tech industry templates.</p>
</div>
<button class="text-xs font-bold text-primary px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary hover:text-white transition-all">Apply</button>
</div>
</div>
</div>
<div class="bg-white rounded-2xl shadow-sm border border-neutral-border overflow-hidden">
<div class="p-6 border-b border-neutral-border flex justify-between items-center bg-slate-50/50">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-primary">history_edu</span>
<h3 class="text-base font-bold text-neutral-text">Experience Optimization</h3>
</div>
</div>
<div class="p-6">
<div class="mb-6">
<div class="flex items-center gap-2 mb-1">
<h4 class="text-sm font-bold text-neutral-text">Senior Product Designer</h4>
<span class="text-xs text-neutral-muted">• TechCorp Solutions</span>
</div>
<div class="flex items-center gap-2">
<span class="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-black rounded uppercase">AI Optimized</span>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<div class="space-y-3">
<div class="flex items-center gap-2 text-danger">
<span class="material-symbols-outlined text-sm">history</span>
<span class="text-[10px] font-black uppercase tracking-widest">Original Version</span>
</div>
<div class="bg-slate-50 border border-neutral-border rounded-xl p-5 min-h-[140px]">
<p class="text-sm text-neutral-muted leading-relaxed">
                                            Designed user interfaces for mobile apps. Worked with the development team to ensure designs were implemented correctly. Managed a team of 2 junior designers.
                                        </p>
</div>
</div>
<div class="space-y-3">
<div class="flex items-center gap-2 text-success">
<span class="material-symbols-outlined text-sm">auto_awesome</span>
<span class="text-[10px] font-black uppercase tracking-widest">AI Recommended</span>
</div>
<div class="bg-primary-light/30 border border-primary/10 rounded-xl p-5 min-h-[140px] relative">
<p class="text-sm text-neutral-800 leading-relaxed">
                                            Spearheaded <span class="bg-yellow-200/60 rounded px-1 font-medium">end-to-end UI design</span> for high-traffic mobile apps, resulting in a <span class="bg-yellow-200/60 rounded px-1 font-medium">22% increase in user engagement</span>. Collaborated cross-functionally with engineering via <span class="bg-yellow-200/60 rounded px-1 font-medium">Agile workflows</span> to ensure pixel-perfect delivery.
                                        </p>
<div class="mt-4 pt-4 border-t border-primary/10 flex justify-end gap-3">
<button class="px-3 py-1.5 text-xs font-bold text-neutral-muted hover:text-neutral-text transition-colors">Discard</button>
<button class="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark shadow-sm transition-all flex items-center gap-1.5">
<span class="material-symbols-outlined text-sm">check</span>
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
