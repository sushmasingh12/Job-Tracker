import React from 'react'

const Features = () => {
  return (
    <div>
    <section className="py-[100px] px-[60px] max-w-[1200px] mx-auto">
  <div className="section-label-line flex items-center gap-[10px] text-[11px] font-semibold tracking-[2.5px] uppercase text-primary mb-3">
    Core Features
  </div>
  <h2 className="font-playfair text-sec font-bold tracking-[-1.5px] text-neutral-text leading-[1.1] max-w-[520px] mb-16">
    Every tool you need to <em className="italic text-primary">win</em> the job search
  </h2>

  <div className="grid grid-cols-3 gap-[18px]">

    
    <div className="bg-white border border-neutral-border rounded-[14px] p-[34px_28px] transition-all duration-200 hover:border-primary hover:shadow-[0_8px_30px_rgba(25,118,210,0.1)] hover:-translate-y-[3px]">
      <div className="w-11 h-11 bg-primary-light rounded-[10px] flex items-center justify-center mb-[18px]">
        <svg className="w-5 h-5 stroke-primary" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>
      </div>
      <div className="font-playfair text-lg font-bold text-neutral-text mb-[9px] tracking-[-0.2px]">Smart Application Tracker</div>
      <div className="text-sm leading-[1.7] text-neutral-muted font-light">Visualize every application on a kanban board. Track status from Saved → Applied → Interviewing → Offer across all platforms.</div>
    </div>

    
    <div className="bg-white border border-neutral-border rounded-[14px] p-[34px_28px] transition-all duration-200 hover:border-primary hover:shadow-[0_8px_30px_rgba(25,118,210,0.1)] hover:-translate-y-[3px]">
      <div className="w-11 h-11 bg-primary-light rounded-[10px] flex items-center justify-center mb-[18px]">
        <svg className="w-5 h-5 stroke-primary" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      </div>
      <div className="font-playfair text-lg font-bold text-neutral-text mb-[9px] tracking-[-0.2px]">AI Resume Tailoring</div>
      <div className="text-sm leading-[1.7] text-neutral-muted font-light">Paste a job description and get a customized resume in seconds. AI matches your skills to each role's requirements automatically.</div>
    </div>

    
    <div className="bg-white border border-neutral-border rounded-[14px] p-[34px_28px] transition-all duration-200 hover:border-primary hover:shadow-[0_8px_30px_rgba(25,118,210,0.1)] hover:-translate-y-[3px]">
      <div className="w-11 h-11 bg-primary-light rounded-[10px] flex items-center justify-center mb-[18px]">
        <svg className="w-5 h-5 stroke-primary" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      </div>
      <div className="font-playfair text-lg font-bold text-neutral-text mb-[9px] tracking-[-0.2px]">Cover Letter Writer</div>
      <div className="text-sm leading-[1.7] text-neutral-muted font-light">Generate compelling, personalized cover letters that speak directly to each company's culture and specific role requirements.</div>
    </div>

 
    <div className="bg-white border border-neutral-border rounded-[14px] p-[34px_28px] transition-all duration-200 hover:border-primary hover:shadow-[0_8px_30px_rgba(25,118,210,0.1)] hover:-translate-y-[3px]">
      <div className="w-11 h-11 bg-primary-light rounded-[10px] flex items-center justify-center mb-[18px]">
        <svg className="w-5 h-5 stroke-primary" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
      </div>
      <div className="font-playfair text-lg font-bold text-neutral-text mb-[9px] tracking-[-0.2px]">Follow-up Reminders</div>
      <div className="text-sm leading-[1.7] text-neutral-muted font-light">Never miss the right moment. Get smart reminders for follow-ups, deadlines, and check-ins based on each company's typical timeline.</div>
    </div>

    
    <div className="bg-white border border-neutral-border rounded-[14px] p-[34px_28px] transition-all duration-200 hover:border-primary hover:shadow-[0_8px_30px_rgba(25,118,210,0.1)] hover:-translate-y-[3px]">
      <div className="w-11 h-11 bg-primary-light rounded-[10px] flex items-center justify-center mb-[18px]">
        <svg className="w-5 h-5 stroke-primary" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
      </div>
      <div className="font-playfair text-lg font-bold text-neutral-text mb-[9px] tracking-[-0.2px]">Interview Prep Coach</div>
      <div className="text-sm leading-[1.7] text-neutral-muted font-light">Practice with AI-generated questions tailored to the specific role and company. Get real-time feedback on every answer.</div>
    </div>

    
    <div className="bg-white border border-neutral-border rounded-[14px] p-[34px_28px] transition-all duration-200 hover:border-primary hover:shadow-[0_8px_30px_rgba(25,118,210,0.1)] hover:-translate-y-[3px]">
      <div className="w-11 h-11 bg-primary-light rounded-[10px] flex items-center justify-center mb-[18px]">
        <svg className="w-5 h-5 stroke-primary" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
      </div>
      <div className="font-playfair text-lg font-bold text-neutral-text mb-[9px] tracking-[-0.2px]">Search Analytics</div>
      <div className="text-sm leading-[1.7] text-neutral-muted font-light">Understand your job search performance. Identify patterns, optimize your strategy, and see exactly where you're winning.</div>
    </div>

  </div>
</section>
{/* <!-- ── HOW IT WORKS ── --> */}
<section className="bg-background-dark py-[100px] px-[60px]" id="how">
  <div className="max-w-[1200px] mx-auto">

    <div className="section-label-line flex items-center gap-[10px] text-[11px] font-semibold tracking-[2.5px] uppercase text-blue-100/80 mb-3">
      How It Works
    </div>
    <h2 className="font-playfair text-sec font-bold tracking-[-1.5px] text-white leading-[1.1] max-w-[520px] mb-16">
      From application to <em className="italic text-blue-100">offer</em> in four steps
    </h2>

    <div className="grid grid-cols-4 gap-9">

      <div className="relative">
        <div className="font-playfair text-[52px] font-black text-white/[0.05] leading-none mb-3 tracking-[-2px]">01</div>
        <div className="w-9 h-[3px] bg-primary rounded-full mb-4"></div>
        <div className="font-playfair text-[17px] font-bold text-white mb-2">Import Your Profile</div>
        <div className="text-[13px] leading-[1.7] text-white/40 font-light">Upload your existing resume or connect LinkedIn. ApplyIQ builds your comprehensive skills profile instantly.</div>
      </div>

      <div className="relative">
        <div className="font-playfair text-[52px] font-black text-white/[0.05] leading-none mb-3 tracking-[-2px]">02</div>
        <div className="w-9 h-[3px] bg-primary rounded-full mb-4"></div>
        <div className="font-playfair text-[17px] font-bold text-white mb-2">Add Job Listings</div>
        <div className="text-[13px] leading-[1.7] text-white/40 font-light">Paste a job URL or description. ApplyIQ analyzes it and shows your match score with tailored suggestions.</div>
      </div>

      <div className="relative">
        <div className="font-playfair text-[52px] font-black text-white/[0.05] leading-none mb-3 tracking-[-2px]">03</div>
        <div className="w-9 h-[3px] bg-primary rounded-full mb-4"></div>
        <div className="font-playfair text-[17px] font-bold text-white mb-2">Apply with AI</div>
        <div className="text-[13px] leading-[1.7] text-white/40 font-light">Generate a targeted resume and cover letter in one click. Review, edit, and submit — all in under 10 minutes.</div>
      </div>

      <div className="relative">
        <div className="font-playfair text-[52px] font-black text-white/[0.05] leading-none mb-3 tracking-[-2px]">04</div>
        <div className="w-9 h-[3px] bg-primary rounded-full mb-4"></div>
        <div className="font-playfair text-[17px] font-bold text-white mb-2">Track & Optimize</div>
        <div className="text-[13px] leading-[1.7] text-white/40 font-light">Monitor every application, get interview coaching, and use analytics to continuously refine your approach.</div>
      </div>

    </div>
  </div>
</section>

{/* <!-- ── TESTIMONIALS ── --> */}
<section className="py-[100px] px-[60px] max-w-[1200px] mx-auto">
  <div className="section-label-line flex items-center gap-[10px] text-[11px] font-semibold tracking-[2.5px] uppercase text-primary mb-3">
    Success Stories
  </div>
  <h2 className="font-playfair text-sec font-bold tracking-[-1.5px] text-neutral-text leading-[1.1] max-w-[520px]">
    Real people, <em className="italic text-primary">real offers</em>
  </h2>

  <div className="grid grid-cols-3 gap-[18px] mt-[52px]">

    <div className="bg-white border border-neutral-border p-[30px] rounded-[14px] transition-all duration-200 hover:border-primary hover:-translate-y-[3px] hover:shadow-[0_10px_32px_rgba(25,118,210,0.1)]">
      <span className="block font-playfair text-[52px] font-black text-primary/60 leading-[0.8] mb-[14px]">"</span>
      <p className="text-sm leading-[1.7] text-neutral-text font-light mb-5">I was applying for 3 months with zero callbacks. ApplyIQ rewrote my resume with better keyword matching and I had 5 interviews within two weeks.</p>
      <div className="flex items-center gap-[11px] pt-4 border-t border-neutral-border">
        <div className="w-[34px] h-[34px] bg-primary rounded-full flex items-center justify-center text-white text-[11px] font-semibold">MK</div>
        <div>
          <div className="text-[13px] font-medium text-neutral-text">Maya K.</div>
          <div className="text-[11px] text-neutral-muted mt-[1px]">Now: UX Designer @ Figma</div>
        </div>
      </div>
    </div>

    <div className="bg-white border border-neutral-border p-[30px] rounded-[14px] transition-all duration-200 hover:border-primary hover:-translate-y-[3px] hover:shadow-[0_10px_32px_rgba(25,118,210,0.1)]">
      <span className="block font-playfair text-[52px] font-black text-primary/60 leading-[0.8] mb-[14px]">"</span>
      <p className="text-sm leading-[1.7] text-neutral-text font-light mb-5">The cover letter AI is unreal. Each one sounds completely personal — not like a template. Hiring managers actually comment on them during interviews.</p>
      <div className="flex items-center gap-[11px] pt-4 border-t border-neutral-border">
        <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-white text-[11px] font-semibold bg-secondary">JR</div>
        <div>
          <div className="text-[13px] font-medium text-neutral-text">James R.</div>
          <div className="text-[11px] text-neutral-muted mt-[1px]">Now: PM @ Notion</div>
        </div>
      </div>
    </div>

    <div className="bg-white border border-neutral-border p-[30px] rounded-[14px] transition-all duration-200 hover:border-primary hover:-translate-y-[3px] hover:shadow-[0_10px_32px_rgba(25,118,210,0.1)]">
      <span className="block font-playfair text-[52px] font-black text-primary/60 leading-[0.8] mb-[14px]">"</span>
      <p className="text-sm leading-[1.7] text-neutral-text font-light mb-5">Managing 40+ applications felt overwhelming. The tracker and reminders kept me on top of every opportunity. Landed a 40% salary increase.</p>
      <div className="flex items-center gap-[11px] pt-4 border-t border-neutral-border">
        <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-white text-[11px] font-semibold bg-success">SP</div>
        <div>
          <div className="text-[13px] font-medium text-neutral-text">Sarah P.</div>
          <div className="text-[11px] text-neutral-muted mt-[1px]">Now: Senior Engineer @ Vercel</div>
        </div>
      </div>
    </div>

  </div>
</section>

{/* <!-- ── CTA ── --> */}
<div className="cta-section mx-[60px] mb-[100px] bg-background-dark rounded-[18px] p-[70px_80px] grid grid-cols-2 items-center gap-[60px] relative overflow-hidden">
  <div>
    <div className="cta-eyebrow-line flex items-center gap-2 text-[11px] font-semibold tracking-[2.5px] uppercase text-blue-100 mb-4">
      Start Today
    </div>
    <h2 className="font-playfair text-[40px] font-bold text-white tracking-[-1.5px] leading-[1.1] mb-[14px]">
      Your next <em className="italic text-blue-100">offer</em> starts here
    </h2>
    <p className="text-[15px] text-white/52 font-light leading-[1.65]">Join 12,000+ job seekers who found their next role faster with ApplyIQ. Free to start, no credit card needed.</p>
  </div>

  <div className="flex flex-col gap-[11px]">
    <input type="email" placeholder="Enter your email address"
           className="px-4 py-[13px] font-dm text-sm bg-white/[0.07] border border-white/[0.14] rounded-lg text-white outline-none transition-colors duration-200 placeholder-white/30 focus:border-primary"/>
    <button className="py-[14px] font-dm text-[15px] font-medium bg-primary text-white border-none rounded-lg cursor-pointer transition-all duration-200 shadow-[0_4px_18px_rgba(25,118,210,0.38)] hover:bg-primary-dark hover:-translate-y-[1px] hover:shadow-[0_8px_26px_rgba(25,118,210,0.45)]">
      Create Free Account →
    </button>
    <p className="text-[11px] text-white/25 text-center">By signing up you agree to our Terms of Service &amp; Privacy Policy</p>
  </div>
</div>

{/* <!-- ── FOOTER ── --> */}
<footer className="border-t border-neutral-border px-[60px] py-[42px] flex items-center justify-between bg-white">
  <div className="flex items-center gap-[7px] font-playfair text-lg font-bold text-neutral-text">
    <div className="w-[7px] h-[7px] bg-primary rounded-full"></div>
    ApplyIQ
  </div>

  <ul className="flex gap-[26px] list-none">
    <li><a href="#" className="text-[13px] text-neutral-muted no-underline transition-colors duration-200 hover:text-primary">Features</a></li>
    <li><a href="#" className="text-[13px] text-neutral-muted no-underline transition-colors duration-200 hover:text-primary">Pricing</a></li>
    <li><a href="#" className="text-[13px] text-neutral-muted no-underline transition-colors duration-200 hover:text-primary">Blog</a></li>
    <li><a href="#" className="text-[13px] text-neutral-muted no-underline transition-colors duration-200 hover:text-primary">Privacy</a></li>
    <li><a href="#" className="text-[13px] text-neutral-muted no-underline transition-colors duration-200 hover:text-primary">Terms</a></li>
  </ul>

  <div className="text-xs text-neutral-muted">© 2026 ApplyIQ. All rights reserved.</div>
</footer>
</div>
  )
}

export default Features