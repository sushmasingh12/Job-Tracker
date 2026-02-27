import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div>
      {/* <!-- ── NAV ── --> */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-15 py-4.5 bg-white/94 nav-blur border-b border-neutral-border shadow-[0_1px_10px_rgba(17,25,33,0.06)]"
        style={{ paddingLeft: "60px", paddingRight: "60px" }}
      >
        <Link className="flex items-center gap-2 font-playfair text-[22px] font-bold tracking-tight text-neutral-text no-underline">
          <div className="w-2.25 h-2.25 bg-primary rounded-full"></div>
          JobTracker
        </Link>

        <div className="flex gap-2.5">
          <Link to="/login" className="inline-flex items-center px-5 py-2.25 text-sm font-medium text-primary bg-transparent border-[1.5px] border-primary rounded-md cursor-pointer transition-all duration-200 no-underline hover:bg-primary-light">
            Sign In
          </Link>
          <Link to="/login" className="inline-flex items-center gap-1.5 px-5 py-2.25 text-sm font-medium text-white bg-primary border-[1.5px] border-primary rounded-md cursor-pointer transition-all duration-200 no-underline hover:bg-primary-dark hover:border-primary-dark hover:shadow-[0_4px_14px_rgba(25,118,210,0.3)]">
            Get Started →
          </Link>
        </div>
      </nav>

      {/* <!-- ── HERO ── --> */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-18 overflow-hidden">
        {/* <!-- Hero Left --> */}
        <div
          className="flex flex-col justify-center relative z-10"
          style={{ padding: "80px 56px" }}
        >
          <div className="anim-1 inline-flex items-center gap-1.75 text-[11px] font-semibold tracking-[2px] uppercase text-primary bg-primary-light px-3.5 py-1.5 rounded-full w-fit mb-6">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            AI-Powered Job Search
          </div>

          <h1 className="anim-2 font-playfair text-hero font-black leading-[1.05] tracking-[-2px] text-neutral-text mb-5.5">
            Land your <em className="italic text-primary">dream job</em> with
            less chaos
          </h1>

          <p className="anim-3 text-[17px] font-light leading-[1.72] text-neutral-muted max-w-105 mb-9.5">
            ApplyIQ centralizes every application, generates tailored resumes
            and cover letters, and coaches you through every stage — so you
            spend less time organizing and more time winning offers.
          </p>

          <div className="anim-4 flex gap-3.5 items-center">
            <button onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2 px-7.5 py-3.5 text-[15px] font-medium text-white bg-primary border-2 border-primary rounded-lg cursor-pointer transition-all duration-200 no-underline shadow-[0_4px_18px_rgba(25,118,210,0.28)] hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(25,118,210,0.38)]"
            >
              Start for free →
            </button>
            <button
              
              className="flex items-center gap-1.5 text-sm text-neutral-muted no-underline transition-colors duration-200 hover:text-primary"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon
                  points="10,8 16,12 10,16"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
              Watch demo
            </button>
          </div>

          <div className="anim-5 flex gap-9 mt-12.5 pt-8.5 border-t border-neutral-border">
            <div className="flex flex-col gap-0.75">
              <div className="font-playfair text-[30px] font-bold tracking-[-1px] text-neutral-text">
                4.2×
              </div>
              <div className="text-xs text-neutral-muted">
                More interview invites
              </div>
            </div>
            <div className="flex flex-col gap-0.75">
              <div className="font-playfair text-[30px] font-bold tracking-[-1px] text-neutral-text">
                12k+
              </div>
              <div className="text-xs text-neutral-muted">Offers secured</div>
            </div>
            <div className="flex flex-col gap-0.75">
              <div className="font-playfair text-[30px] font-bold tracking-[-1px] text-neutral-text">
                38%
              </div>
              <div className="text-xs text-neutral-muted">
                Faster job search
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Hero Right --> */}
        <div className="hidden lg:block relative overflow-hidden bg-sidebar border-l border-white/6">
          <div className="hero-grid-bg"></div>

          {/* <!-- Glow blobs --> */}
          <div className="glow-blue absolute -bottom-20 -left-20 w-105 h-105 rounded-full pointer-events-none"></div>
          <div className="glow-purple absolute -top-15 -right-15 w-70 h-70 rounded-full pointer-events-none"></div>

          {/* <!-- Main card --> */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] w-85">
            <div className="animate-float bg-white border border-neutral-border rounded-[14px] p-[20px_22px] shadow-[0_12px_40px_rgba(17,25,33,0.22)]">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-playfair font-bold text-[15px]">
                    S
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-text">
                      Stripe
                    </div>
                    <div className="text-xs text-neutral-muted mt-px">
                      Senior Product Designer
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-500/10 text-green-700">
                  Interview
                </span>
              </div>
              <div className="flex gap-3.5 pt-3 border-t border-neutral-border">
                <div className="flex items-center gap-1 text-[11px] text-neutral-muted">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Applied Feb 3
                </div>
                <div className="flex items-center gap-1 text-[11px] text-neutral-muted">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Remote · SF
                </div>
                <div className="flex items-center gap-1 text-[11px] text-neutral-muted">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  $140–175k
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Score floating card --> */}
          <div
            className="animate-float-slow absolute bg-white border border-neutral-border rounded-xl p-[14px_18px] shadow-[0_8px_28px_rgba(17,25,33,0.18)] w-33"
            style={{ top: "18%", right: "36px" }}
          >
            <div className="font-playfair text-[36px] font-bold text-green-500 leading-none">
              92
            </div>
            <div className="text-[11px] text-neutral-muted mt-0.75">
              Resume Match Score
            </div>
          </div>

          {/* <!-- AI suggestion floating card --> */}
          <div
            className="animate-float-delay absolute bg-white border border-neutral-border rounded-xl p-[14px_18px] shadow-[0_8px_28px_rgba(17,25,33,0.18)] w-46.5"
            style={{ bottom: "22%", left: "32px" }}
          >
            <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-secondary mb-1.25 flex items-center gap-1">
              ✦ AI Suggestion
            </div>
            <div className="text-xs text-neutral-text leading-normal">
              Add "stakeholder alignment" to boost match by 8 pts
            </div>
          </div>
        </div>
      </section>

      {/* <!-- ── MARQUEE ── --> */}
      <div className="border-t border-b border-white/5 py-3.75 bg-sidebar overflow-hidden">
        <div className="animate-marquee flex gap-14 whitespace-nowrap">
          <div className="flex items-center gap-4.5 shrink-0 text-[11px] font-medium tracking-[1.5px] uppercase text-white/40 marquee-item">
            Application Tracking
          </div>
          <div className="flex items-center gap-4.5 shrink-0 text-[11px] font-medium tracking-[1.5px] uppercase text-white/40 marquee-item">
            AI Resume Builder
          </div>
          <div className="flex items-center gap-4.5 shrink-0 text-[11px] font-medium tracking-[1.5px] uppercase text-white/40 marquee-item">
            Cover Letter Generator
          </div>
          <div className="flex items-center gap-4.5 shrink-0 text-[11px] font-medium tracking-[1.5px] uppercase text-white/40 marquee-item">
            Interview Prep
          </div>
          <div className="flex items-center gap-4.5 shrink-0 text-[11px] font-medium tracking-[1.5px] uppercase text-white/40 marquee-item">
            Job Match Scores
          </div>
          <div className="flex items-center gap-4.5 shrink-0 text-[11px] font-medium tracking-[1.5px] uppercase text-white/40 marquee-item">
            Follow-up Reminders
          </div>
          <div className="flex items-center gap-4.5 shrink-0 text-[11px] font-medium tracking-[1.5px] uppercase text-white/40 marquee-item">
            Analytics Dashboard
          </div>
          {/* <!-- Duplicate for seamless loop --> */}
          <div className="flex items-center gap-4.5 shrink-0 text-[11px] font-medium tracking-[1.5px] uppercase text-white/40 marquee-item">
            Application Tracking
          </div>
          <div className="flex items-center gap-4.5 shrink-0 text-[11px] font-medium tracking-[1.5px] uppercase text-white/40 marquee-item">
            AI Resume Builder
          </div>
          <div className="flex items-center gap-4.5 shrink-0 text-[11px] font-medium tracking-[1.5px] uppercase text-white/40 marquee-item">
            Cover Letter Generator
          </div>
          <div className="flex items-center gap-4.5 shrink-0 text-[11px] font-medium tracking-[1.5px] uppercase text-white/40 marquee-item">
            Interview Prep
          </div>
          <div className="flex items-center gap-4.5 shrink-0 text-[11px] font-medium tracking-[1.5px] uppercase text-white/40 marquee-item">
            Job Match Scores
          </div>
          <div className="flex items-center gap-4.5 shrink-0 text-[11px] font-medium tracking-[1.5px] uppercase text-white/40 marquee-item">
            Follow-up Reminders
          </div>
          <div className="flex items-center gap-4.5 shrink-0 text-[11px] font-medium tracking-[1.5px] uppercase text-white/40 marquee-item">
            Analytics Dashboard
          </div>
        </div>
      </div>

      {/* <!-- ── FEATURES ── --> */}
      <section className="py-15 px-5 md:py-25 md:px-15 max-w-300 mx-auto">
        <div className="section-label-line flex items-center gap-2.5 text-[11px] font-semibold tracking-[2.5px] uppercase text-primary mb-3">
          Core Features
        </div>
        <h2 className="font-playfair text-sec font-bold tracking-[-1.5px] text-neutral-text leading-[1.1] max-w-130 mb-16">
          Every tool you need to <em className="italic text-primary">win</em>{" "}
          the job search
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
          <div className="bg-white border border-neutral-border rounded-[14px] p-[34px_28px] transition-all duration-200 hover:border-primary hover:shadow-[0_8px_30px_rgba(25,118,210,0.1)] hover:-translate-y-0.75">
            <div className="w-11 h-11 bg-primary-light rounded-[10px] flex items-center justify-center mb-4.5">
              <svg
                className="w-5 h-5 stroke-primary"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.8"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h6M9 12h6M9 15h4" />
              </svg>
            </div>
            <div className="font-playfair text-lg font-bold text-neutral-text mb-2.25 tracking-[-0.2px]">
              Smart Application Tracker
            </div>
            <div className="text-sm leading-[1.7] text-neutral-muted font-light">
              Visualize every application on a kanban board. Track status from
              Saved → Applied → Interviewing → Offer across all platforms.
            </div>
          </div>

          <div className="bg-white border border-neutral-border rounded-[14px] p-[34px_28px] transition-all duration-200 hover:border-primary hover:shadow-[0_8px_30px_rgba(25,118,210,0.1)] hover:-translate-y-0.75">
            <div className="w-11 h-11 bg-primary-light rounded-[10px] flex items-center justify-center mb-4.5">
              <svg
                className="w-5 h-5 stroke-primary"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.8"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="font-playfair text-lg font-bold text-neutral-text mb-2.25 tracking-[-0.2px]">
              AI Resume Tailoring
            </div>
            <div className="text-sm leading-[1.7] text-neutral-muted font-light">
              Paste a job description and get a customized resume in seconds. AI
              matches your skills to each role's requirements automatically.
            </div>
          </div>

          <div className="bg-white border border-neutral-border rounded-[14px] p-[34px_28px] transition-all duration-200 hover:border-primary hover:shadow-[0_8px_30px_rgba(25,118,210,0.1)] hover:-translate-y-0.75">
            <div className="w-11 h-11 bg-primary-light rounded-[10px] flex items-center justify-center mb-4.5">
              <svg
                className="w-5 h-5 stroke-primary"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.8"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="font-playfair text-lg font-bold text-neutral-text mb-2.25 tracking-[-0.2px]">
              Cover Letter Writer
            </div>
            <div className="text-sm leading-[1.7] text-neutral-muted font-light">
              Generate compelling, personalized cover letters that speak
              directly to each company's culture and specific role requirements.
            </div>
          </div>

          <div className="bg-white border border-neutral-border rounded-[14px] p-[34px_28px] transition-all duration-200 hover:border-primary hover:shadow-[0_8px_30px_rgba(25,118,210,0.1)] hover:-translate-y-0.75">
            <div className="w-11 h-11 bg-primary-light rounded-[10px] flex items-center justify-center mb-4.5">
              <svg
                className="w-5 h-5 stroke-primary"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
            </div>
            <div className="font-playfair text-lg font-bold text-neutral-text mb-2.25 tracking-[-0.2px]">
              Follow-up Reminders
            </div>
            <div className="text-sm leading-[1.7] text-neutral-muted font-light">
              Never miss the right moment. Get smart reminders for follow-ups,
              deadlines, and check-ins based on each company's typical timeline.
            </div>
          </div>

          <div className="bg-white border border-neutral-border rounded-[14px] p-[34px_28px] transition-all duration-200 hover:border-primary hover:shadow-[0_8px_30px_rgba(25,118,210,0.1)] hover:-translate-y-0.75">
            <div className="w-11 h-11 bg-primary-light rounded-[10px] flex items-center justify-center mb-4.5">
              <svg
                className="w-5 h-5 stroke-primary"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.8"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div className="font-playfair text-lg font-bold text-neutral-text mb-2.25 tracking-[-0.2px]">
              Interview Prep Coach
            </div>
            <div className="text-sm leading-[1.7] text-neutral-muted font-light">
              Practice with AI-generated questions tailored to the specific role
              and company. Get real-time feedback on every answer.
            </div>
          </div>

          <div className="bg-white border border-neutral-border rounded-[14px] p-[34px_28px] transition-all duration-200 hover:border-primary hover:shadow-[0_8px_30px_rgba(25,118,210,0.1)] hover:-translate-y-0.75">
            <div className="w-11 h-11 bg-primary-light rounded-[10px] flex items-center justify-center mb-4.5">
              <svg
                className="w-5 h-5 stroke-primary"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.8"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <div className="font-playfair text-lg font-bold text-neutral-text mb-2.25 tracking-[-0.2px]">
              Search Analytics
            </div>
            <div className="text-sm leading-[1.7] text-neutral-muted font-light">
              Understand your job search performance. Identify patterns,
              optimize your strategy, and see exactly where you're winning.
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ── HOW IT WORKS ── --> */}
      <section className="bg-background-dark py-25 px-15" id="how">
        <div className="max-w-300 mx-auto">
          <div className="section-label-line flex items-center gap-2.5 text-[11px] font-semibold tracking-[2.5px] uppercase text-blue-100/80 mb-3">
            How It Works
          </div>
          <h2 className="font-playfair text-sec font-bold tracking-[-1.5px] text-white leading-[1.1] max-w-130 mb-16">
            From application to <em className="italic text-blue-100">offer</em>{" "}
            in four steps
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <div className="font-playfair text-[52px] font-black text-white/5 leading-none mb-3 tracking-[-2px]">
                01
              </div>
              <div className="w-9 h-0.75 bg-primary rounded-full mb-4"></div>
              <div className="font-playfair text-[17px] font-bold text-white mb-2">
                Import Your Profile
              </div>
              <div className="text-[13px] leading-[1.7] text-white/40 font-light">
                Upload your existing resume or connect LinkedIn. ApplyIQ builds
                your comprehensive skills profile instantly.
              </div>
            </div>

            <div className="relative">
              <div className="font-playfair text-[52px] font-black text-white/5 leading-none mb-3 tracking-[-2px]">
                02
              </div>
              <div className="w-9 h-0.75 bg-primary rounded-full mb-4"></div>
              <div className="font-playfair text-[17px] font-bold text-white mb-2">
                Add Job Listings
              </div>
              <div className="text-[13px] leading-[1.7] text-white/40 font-light">
                Paste a job URL or description. ApplyIQ analyzes it and shows
                your match score with tailored suggestions.
              </div>
            </div>

            <div className="relative">
              <div className="font-playfair text-[52px] font-black text-white/5 leading-none mb-3 tracking-[-2px]">
                03
              </div>
              <div className="w-9 h-0.75 bg-primary rounded-full mb-4"></div>
              <div className="font-playfair text-[17px] font-bold text-white mb-2">
                Apply with AI
              </div>
              <div className="text-[13px] leading-[1.7] text-white/40 font-light">
                Generate a targeted resume and cover letter in one click.
                Review, edit, and submit — all in under 10 minutes.
              </div>
            </div>

            <div className="relative">
              <div className="font-playfair text-[52px] font-black text-white/5 leading-none mb-3 tracking-[-2px]">
                04
              </div>
              <div className="w-9 h-0.75 bg-primary rounded-full mb-4"></div>
              <div className="font-playfair text-[17px] font-bold text-white mb-2">
                Track & Optimize
              </div>
              <div className="text-[13px] leading-[1.7] text-white/40 font-light">
                Monitor every application, get interview coaching, and use
                analytics to continuously refine your approach.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- ── TESTIMONIALS ── --> */}
      <section className="py-25 px-15 max-w-300 mx-auto">
        <div className="section-label-line flex items-center gap-2.5 text-[11px] font-semibold tracking-[2.5px] uppercase text-primary mb-3">
          Success Stories
        </div>
        <h2 className="font-playfair text-sec font-bold tracking-[-1.5px] text-neutral-text leading-[1.1] max-w-130">
          Real people, <em className="italic text-primary">real offers</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 mt-13">
          <div className="bg-white border border-neutral-border p-7.5 rounded-[14px] transition-all duration-200 hover:border-primary hover:-translate-y-0.75 hover:shadow-[0_10px_32px_rgba(25,118,210,0.1)]">
            <span className="block font-playfair text-[52px] font-black text-primary/60 leading-[0.8] mb-3.5">
              "
            </span>
            <p className="text-sm leading-[1.7] text-neutral-text font-light mb-5">
              I was applying for 3 months with zero callbacks. ApplyIQ rewrote
              my resume with better keyword matching and I had 5 interviews
              within two weeks.
            </p>
            <div className="flex items-center gap-2.75 pt-4 border-t border-neutral-border">
              <div className="w-8.5 h-8.5 bg-primary rounded-full flex items-center justify-center text-white text-[11px] font-semibold">
                MK
              </div>
              <div>
                <div className="text-[13px] font-medium text-neutral-text">
                  Maya K.
                </div>
                <div className="text-[11px] text-neutral-muted mt-px">
                  Now: UX Designer @ Figma
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-neutral-border p-7.5 rounded-[14px] transition-all duration-200 hover:border-primary hover:-translate-y-0.75 hover:shadow-[0_10px_32px_rgba(25,118,210,0.1)]">
            <span className="block font-playfair text-[52px] font-black text-primary/60 leading-[0.8] mb-3.5">
              "
            </span>
            <p className="text-sm leading-[1.7] text-neutral-text font-light mb-5">
              The cover letter AI is unreal. Each one sounds completely personal
              — not like a template. Hiring managers actually comment on them
              during interviews.
            </p>
            <div className="flex items-center gap-2.75 pt-4 border-t border-neutral-border">
              <div className="w-8.5 h-8.5 rounded-full flex items-center justify-center text-white text-[11px] font-semibold bg-secondary">
                JR
              </div>
              <div>
                <div className="text-[13px] font-medium text-neutral-text">
                  James R.
                </div>
                <div className="text-[11px] text-neutral-muted mt-px">
                  Now: PM @ Notion
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-neutral-border p-7.5 rounded-[14px] transition-all duration-200 hover:border-primary hover:-translate-y-0.75 hover:shadow-[0_10px_32px_rgba(25,118,210,0.1)]">
            <span className="block font-playfair text-[52px] font-black text-primary/60 leading-[0.8] mb-3.5">
              "
            </span>
            <p className="text-sm leading-[1.7] text-neutral-text font-light mb-5">
              Managing 40+ applications felt overwhelming. The tracker and
              reminders kept me on top of every opportunity. Landed a 40% salary
              increase.
            </p>
            <div className="flex items-center gap-2.75 pt-4 border-t border-neutral-border">
              <div className="w-8.5 h-8.5 rounded-full flex items-center justify-center text-white text-[11px] font-semibold bg-success">
                SP
              </div>
              <div>
                <div className="text-[13px] font-medium text-neutral-text">
                  Sarah P.
                </div>
                <div className="text-[11px] text-neutral-muted mt-px">
                  Now: Senior Engineer @ Vercel
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
