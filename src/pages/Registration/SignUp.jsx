import { useState } from "react";
import {Link} from "react-router-dom";

import {
  SocialButtons,
  Divider,
  Spinner,
  PasswordInput,
  ArrowIcon,
  getStrength,
} from "./AuthComponent";

// ─── Overlay: Sign Up side (shown on left — "Already a member?") ──────────────

function SignUpOverlay() {
  return (
    <div
      className="overlay-wrap absolute top-0 bottom-0 w-1/2 z-50"
      style={{ left: 0 }}
    >
      <div className="overlay-panel relative w-full h-full bg-sidebar flex flex-col justify-between px-[46px] py-[44px] overflow-hidden">
        <div
          className="overlay-glow"
          style={{ bottom: -80, right: -80, left: "auto" }}
        />

        <Link
          href="/"
          className="font-playfair text-[20px] font-bold text-white no-underline flex items-center gap-2 relative z-10"
        >
          <div className="w-2 h-2 bg-primary rounded-full" />
          JobTracker
        </Link>

        <div className="relative z-10">
          <div className="o-content">
            <div className="flex items-center gap-[9px] mb-5 text-[10px] font-semibold tracking-[2.5px] uppercase text-primary-light opacity-85">
              Already a member?
            </div>

            <h2 className="font-playfair font-black text-white leading-[1.05] tracking-[-1.5px] mb-4">
              Good to have you{" "}
              <em className="not-italic italic text-primary-light">back</em>
            </h2>

            <p className="text-[14px] font-light text-white/50 leading-[1.7] max-w-[300px] mb-7">
              Sign in to pick up right where you left off. Your applications are
              waiting.
            </p>

            <button className="inline-flex items-center gap-2 py-3 px-[26px] font-dm text-[13px] font-medium text-white bg-primary border-[1.5px] border-primary rounded-lg cursor-pointer transition-all self-start hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(25,118,210,0.4)] [&>svg]:transition-transform hover:[&>svg]:translate-x-[3px]">
              Sign In
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                className="w-[14px] h-[14px]"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <div className="mt-7 pt-[22px] border-t border-white/10">
              <p className="text-[13px] font-light italic text-white/60 leading-[1.65] mb-[10px]">
                "I had 5 interviews in 2 weeks after ApplyIQ tailored my
                resume."
              </p>

              <div className="text-[12px] font-medium text-primary-light">
                Maya K.
              </div>

              <div className="text-[11px] text-white/35 mt-px">
                UX Designer @ Figma
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <div className="flex items-center gap-[9px] py-[10px] px-[14px] mt-3 bg-white/[0.04] border border-white/[0.08] rounded-full">
            <div className="pulse-dot w-[7px] h-[7px] rounded-full bg-success shrink-0" />

            <div className="text-[11px] text-white/[0.42] leading-[1.4]">
              <strong className="text-white/[0.82] font-medium">
                284 people
              </strong>{" "}
              got hired this month using ApplyIQ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sign Up Form ─────────────────────────────────────────────────────────────

function SignUpForm() {
  return (
    // form-pane::before glow → stays in App.css
    <div className="form-pane pane-signup bg-white px-[46px] py-10 flex flex-col justify-center overflow-hidden relative">
      <div className="pane-inner w-full max-w-[340px] mx-auto">
        <h1 className="font-playfair text-[26px] font-bold text-neutral-text tracking-tight mb-1">
          Create account
        </h1>
        <p className="text-[13px] text-neutral-muted font-light mb-[26px]">
          Already have one?{" "}
          <span className="text-primary font-medium border-b border-transparent hover:border-primary transition-all cursor-pointer">
            Sign in →
          </span>
        </p>

        <SocialButtons />
        <Divider />

        <form>
          {/* Name row */}
          <div className="grid grid-cols-2 gap-[10px] mb-[13px]">
            <div className="relative">
              <label
                className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text mb-[5px]"
                htmlFor="su-first"
              >
                First
              </label>
              <input
                type="text"
                id="su-first"
                className="inp w-full px-[14px] py-[11px] font-dm text-[13px] text-neutral-text bg-bg-light border-[1.5px] border-neutral-border rounded-lg transition-all"
                placeholder="Alex"
              />
            </div>
            <div className="relative">
              <label
                className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text mb-[5px]"
                htmlFor="su-last"
              >
                Last
              </label>
              <input
                type="text"
                id="su-last"
                className="inp w-full px-[14px] py-[11px] font-dm text-[13px] text-neutral-text bg-bg-light border-[1.5px] border-neutral-border rounded-lg transition-all"
                placeholder="Morgan"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-[13px] relative">
            <label
              className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text mb-[5px]"
              htmlFor="su-email"
            >
              Email
            </label>
            <input
              type="email"
              id="su-email"
              className="inp w-full px-[14px] py-[11px] font-dm text-[13px] text-neutral-text bg-bg-light border-[1.5px] border-neutral-border rounded-lg transition-all"
              placeholder="alex@email.com"
            />
          </div>

          {/* Password + Strength */}
          <div className="mb-[13px] relative">
            <label
              className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text mb-[5px]"
              htmlFor="su-pw"
            >
              Password
            </label>
            <PasswordInput placeholder="8+ characters" />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 mb-4">
            <input
              type="checkbox"
              id="su-terms"
              className="w-[13px] h-[13px] accent-primary cursor-pointer mt-[2px] shrink-0"
            />
            <label
              className="text-[12px] text-neutral-muted leading-relaxed font-light"
              htmlFor="su-terms"
            >
              I agree to{" "}
              <button className="text-primary font-medium border-b border-primary-light">
                Terms
              </button>{" "}
              &amp;{" "}
              <button className="text-primary font-medium border-b border-primary-light">
                Privacy Policy
              </button>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-[13px] font-dm text-[14px] font-medium text-white border-none rounded-lg cursor-pointer transition-all flex items-center justify-center gap-[7px] relative overflow-hidden hover:-translate-y-px active:translate-y-0"
            style={{
              background: "#1976d2",
              boxShadow: "0 4px 16px rgba(25,118,210,0.3)",
            }}
          >
            <span>Create Account</span>
            {/* {!loading && !success && <ArrowIcon />}
            <Spinner visible={loading} /> */}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Sign Up Page ─────────────────────────────────────────────────────────────

export default function SignUp() {
  return (
    <div className="font-dm bg-sidebar min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Background */}
      <div className="hero-grid-bg" />
      <div
        className="blob-a fixed rounded-full pointer-events-none blur-[90px]"
        style={{ animation: "blobDrift 14s ease-in-out infinite" }}
      />
      <div
        className="blob-b fixed rounded-full pointer-events-none blur-[90px]"
        style={{ animation: "blobDrift 10s ease-in-out infinite reverse" }}
      />

      {/* auth-card: complex multi-layer box-shadow → stays in App.css */}
      <div
        className="auth-card signup-mode relative w-[920px] h-[590px] rounded-2xl overflow-hidden z-10"
        style={{ animation: "cardIn 0.55s cubic-bezier(.76,0,.24,1) forwards" }}
      >
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="bg-white" />
          <SignUpForm />
        </div>
        <SignUpOverlay />
      </div>
    </div>
  );
}
