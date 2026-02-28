



// ─── Overlay: Sign Up side (shown on left — "Already a member?") ──────────────

function SignUpOverlay({ onSignIn }) {
  return (
    <div
      className="overlay-wrap absolute top-0 bottom-0 w-1/2 z-50"
      style={{ left: 0 }}
    >
      <div className="overlay-panel relative w-full h-full bg-sidebar flex flex-col justify-between px-11.5 py-11 overflow-hidden">
        <div
          className="overlay-glow"
          style={{ bottom: -80, right: -80, left: "auto" }}
        />

        <div className="font-playfair text-[20px] font-bold text-white no-underline flex items-center gap-2 relative z-10">
          <div className="w-2 h-2 bg-primary rounded-full" />
          JobTracker
        </div>

        <div className="relative z-10">
          <div className="o-content">
            <div className="flex items-center gap-2.25 mb-5 text-[10px] font-semibold tracking-[2.5px] uppercase text-primary-light opacity-85">
              Already a member?
            </div>

            <h2 className="font-playfair font-black text-white leading-[1.05] tracking-[-1.5px] mb-4">
              Good to have you{" "}
              <em className="not-italic text-primary-light">back</em>
            </h2>

            <p className="text-[14px] font-light text-white/50 leading-[1.7] max-w-75 mb-7">
              Sign in to pick up right where you left off. Your applications are
              waiting.
            </p>

            <button
              onClick={onSignIn}
              className="inline-flex items-center gap-2 py-3 px-6.5 font-dm text-[13px] font-medium text-white bg-primary border-[1.5px] border-primary rounded-lg cursor-pointer transition-all self-start hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(25,118,210,0.4)] [&>svg]:transition-transform hover:[&>svg]:translate-x-0.75"
            >
              Sign In
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                className="w-3.5 h-3.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <div className="mt-7 pt-5.5 border-t border-white/10">
              <p className="text-[13px] font-light italic text-white/60 leading-[1.65] mb-2.5">
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
          <div className="flex items-center gap-2.25 py-2.5 px-3.5 mt-3 bg-white/4 border border-white/8 rounded-full">
            <div className="pulse-dot w-1.75 h-1.75 rounded-full bg-success shrink-0" />

            <div className="text-[11px] text-white/42 leading-[1.4]">
              <strong className="text-white/82 font-medium">284 people</strong>{" "}
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
    <div className="form-pane pane-signup bg-white px-11.5 py-10 flex flex-col justify-center overflow-hidden relative">
      <div className="pane-inner w-full max-w-85 mx-auto">
        <h1 className="font-playfair text-[26px] font-bold text-neutral-text tracking-tight mb-1">
          Create account
        </h1>
        <p className="text-[13px] text-neutral-muted font-light mb-6.5">
          Already have one?{" "}
          <span
            onClick={onSignIn}
            className="text-primary font-medium border-b border-transparent hover:border-primary transition-all cursor-pointer"
          >
            Sign in →
          </span>
        </p>

        <SocialButtons />
        <Divider />

        <form onSubmit={handleSubmit}>
          {/* Name row */}
          <div className="grid grid-cols-2 gap-2.5 mb-3.25">
            <div className="relative">
              <label
                className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text mb-1.25"
                htmlFor="su-first"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={state.firstname}
                onChange={handleChange}
                className="inpttext"
                placeholder="Alex"
              />
            </div>
            <div className="relative">
              <label
                className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text mb-1.25"
                htmlFor="su-last"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={state.lastname}
                onChange={handleChange}
                className="inpttext"
                placeholder="Morgan"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3.25 relative">
            <label
              className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text mb-1.25"
              htmlFor="su-email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              className="inpttext"
              placeholder="alex@email.com"
            />
          </div>

          {/* Password + Strength */}
          <div className="mb-3.25 relative">
            <label
              className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text mb-1.25"
              htmlFor="su-pw"
            >
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              value={state.password}
              onChange={handleChange}
              className="inpttext"
              placeholder="Enter password"
            />
            <button
              type="button"
              className="absolute right-2.75 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-neutral-muted flex p-1 hover:text-primary transition-colors"
              onClick={() => setShow((s) => !s)}
            >
              {show ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {/* Password + Strength */}
          <div className="mb-3.25 relative">
            <label
              className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text mb-1.25"
              htmlFor="su-pw"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmpass ? "text" : "password"}
              name="confirmpassword"
              value={state.confirmpassword}
              onChange={handleChange}
              className="inpttext"
              placeholder="Confirm password"
            />
            <button
              type="button"
              className="absolute right-2.75 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-neutral-muted flex p-1 hover:text-primary transition-colors"
              onClick={() => setShowConfirmpass((s) => !s)}
            >
              {showConfirmpass ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 mb-4">
            <input
              type="checkbox"
              id="su-terms"
              className="w-3.25 h-3.25 accent-primary cursor-pointer mt-0.5 shrink-0"
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
            className="w-full py-3.25 font-dm text-[14px] font-medium text-white border-none rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1.75 relative overflow-hidden hover:-translate-y-px active:translate-y-0"
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
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/login");
  };
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
        className="auth-card signup-mode relative w-230 h-147.5 rounded-2xl overflow-hidden z-10"
        style={{ animation: "cardIn 0.55s cubic-bezier(.76,0,.24,1) forwards" }}
      >
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="bg-white" />
          <SignUpForm onSignIn={handleSignUp} />
        </div>
        <SignUpOverlay onSignIn={handleSignUp} />
      </div>
    </div>
  );
}
