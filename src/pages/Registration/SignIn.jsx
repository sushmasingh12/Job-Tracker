import { useState } from "react";
import { Link } from "react-router-dom";
import { SocialButtons, Divider, Spinner, PasswordInput, ArrowIcon } from "./AuthComponent";

// ─── Overlay: Sign In side (shown on right — "New here?") ────────────────────

function SignInOverlay() {
  return (
    <div className="overlay-wrap absolute top-0 bottom-0 w-1/2 z-50">
      <div className="overlay-panel relative w-full h-full bg-sidebar flex flex-col justify-between px-[46px] py-[44px] overflow-hidden">
        <div className="overlay-glow" />

        {/* Logo */}
        <Link href="/" className="font-playfair text-[20px] font-bold text-white no-underline flex items-center gap-2 relative z-10">
          <div className="w-2 h-2 bg-primary rounded-full" />
          ApplyIQ
        </Link>

        {/* Body */}
        <div className="o-body relative z-10">
          <div className="o-content">
            <div className="flex items-center gap-[9px] mb-5 text-[10px] font-semibold tracking-[2.5px] uppercase text-primary-light opacity-85">New here?</div>

            <h2 className="font-playfair text-[clamp(26px,3vw,40px)] font-black text-white leading-[1.05] tracking-[-1.5px] mb-4">
              Start your journey <em>today</em>
            </h2>

            <p className="text-[14px] font-light text-white/50 leading-[1.7] max-w-[300px] mb-7">
              Create a free account and let AI handle the heavy lifting of your entire job search.
            </p>

            <button className="inline-flex items-center gap-2 py-3 px-[26px] font-dm text-[13px] font-medium text-white bg-primary border-[1.5px] border-primary rounded-lg cursor-pointer transition-all self-start hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(25,118,210,0.4)] [&>svg]:transition-transform hover:[&>svg]:translate-x-[3px]">
              Create Account
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ width: 14, height: 14 }}>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer — Trust signals */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 pt-5 border-t border-white/10">
          <div className="flex">
              <div className="w-7 h-7 rounded-full border-2 border-slate-800 flex items-center justify-center text-[9px] font-semibold text-white -ml-[6px]" style={{ background: "#1976d2" }}>JL</div>
              <div className="w-7 h-7 rounded-full border-2 border-slate-800 flex items-center justify-center text-[9px] font-semibold text-white -ml-[6px]" style={{ background: "#9c27b0" }}>MK</div>
              <div className="w-7 h-7 rounded-full border-2 border-slate-800 flex items-center justify-center text-[9px] font-semibold text-white -ml-[6px]" style={{ background: "#0e7c6a" }}>SR</div>
              <div className="w-7 h-7 rounded-full border-2 border-slate-800 flex items-center justify-center text-[9px] font-semibold text-white -ml-[6px]" style={{ background: "#b45309" }}>DP</div>
            </div>
            <div className="text-[11px]  leading-[1.5]" style={{color:"rgba(255,255,255,0.8)"}}>
              <strong>12,000+ job seekers</strong><br />
              landed roles with ApplyIQ
            </div>
          </div>

          <div className="flex items-center gap-[9px] py-[10px] px-[14px] mt-3 bg-white/[0.04] border border-white/[0.08] rounded-full">
            <div className="w-[7px] h-[7px] rounded-full bg-success shrink-0" />
            <div className="live-txt">
              <strong>284 people</strong> got hired this month
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Sign In Form ─────────────────────────────────────────────────────────────

function SignInForm() {
  

  return (
    <div className="form-pane pane-signin bg-white px-[46px] py-10 flex flex-col justify-center overflow-hidden relative">
      <div className="pane-inner w-full max-w-[340px] mx-auto">

        <h1 className="font-playfair text-[26px] font-bold text-neutral-text tracking-tight mb-1">
          Welcome back
        </h1>
        <p className="text-[13px] text-neutral-muted font-light mb-[26px]">
          No account yet?{" "}
          <span
            className="text-primary font-medium border-b border-transparent hover:border-primary transition-all cursor-pointer"
          >
            Create one →
          </span>
        </p>

        <SocialButtons />
        <Divider />

        

        <form>

          {/* Email */}
          <div className="field mb-[13px] relative">
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text mb-[5px]" htmlFor="si-email">
              Email
            </label>
            <input
              type="email"
              id="si-email"
              className="inp w-full px-[14px] py-[11px] font-dm text-[13px] text-neutral-text bg-bg-light border-[1.5px] border-neutral-border rounded-lg transition-all"
              placeholder="you@email.com"
            />
          </div>

          {/* Password */}
          <div className="field mb-[13px] relative">
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text mb-[5px]" htmlFor="si-pw">
              Password
            </label>
            <PasswordInput
              placeholder="••••••••"
            />
            <div className="flex items-center justify-between mt-[6px]">
              <label className="flex items-center gap-[6px] cursor-pointer">
                <input type="checkbox" className="w-[13px] h-[13px] accent-primary cursor-pointer" />
                <span className="text-[12px] text-neutral-muted font-light">Remember me</span>
              </label>
              <button  className="text-[12px] text-neutral-muted border-b border-transparent hover:text-primary hover:border-primary-light transition-all">
                Forgot password?
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            
            className="submit-btn w-full py-[13px] font-dm text-[14px] font-medium text-white border-none rounded-lg cursor-pointer transition-all flex items-center justify-center gap-[7px] relative overflow-hidden hover:-translate-y-px active:translate-y-0"
            style={{
              background:"#1976d2",
              boxShadow: "0 4px 16px rgba(25,118,210,0.3)",
            }}
          >
            <span>Sign In</span>
            {/* {!loading && !success && <ArrowIcon />}
            <Spinner visible={loading} /> */}
          </button>

        </form>

        {/* Security note */}
        <div className="flex items-center justify-center gap-[5px] mt-[10px] text-[10px] text-neutral-muted">
          <svg className="w-[10px] h-[10px]" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          256-bit SSL — your data is always protected
        </div>

      </div>
    </div>
  );
}

// ─── Sign In Page ─────────────────────────────────────────────────────────────

export default function SignIn() {

  return (
    <div className="font-dm bg-sidebar min-h-screen flex items-center justify-center overflow-hidden relative">

      {/* Background */}
      <div className="hero-grid-bg"/>
      <div className="blob-a fixed rounded-full pointer-events-none blur-[90px]" style={{ animation: "blobDrift 14s ease-in-out infinite" }} />
      <div className="blob-b fixed rounded-full pointer-events-none blur-[90px]" style={{ animation: "blobDrift 10s ease-in-out infinite reverse" }} />

      {/* Auth Card */}
      <div
        className="auth-card relative w-230 h-147.5 rounded-2xl overflow-hidden z-10"
        style={{ animation: "cardIn 0.55s cubic-bezier(.76,0,.24,1) forwards" }}
      >

        {/* Form (left half) + empty right half placeholder */}
        <div className="absolute inset-0 grid grid-cols-2">
          <SignInForm  />
          <div className="bg-white" /> {/* right half — overlay covers this */}
        </div>

        {/* Overlay slides on the right */}
        <SignInOverlay />

      </div>
    </div>
  );
}