const AuthLayout =({ children, mode = "login" }) => {
  return (
    <div className="font-dm bg-sidebar min-h-screen flex items-center justify-center overflow-hidden relative">

      {/* Background effects */}
      <div className="hero-grid-bg" />
      <div
        className="blob-a fixed rounded-full pointer-events-none blur-[90px]"
        style={{ animation: "blobDrift 14s ease-in-out infinite" }}
      />
      <div
        className="blob-b fixed rounded-full pointer-events-none blur-[90px]"
        style={{ animation: "blobDrift 10s ease-in-out infinite reverse" }}
      />

      {/* Auth Card */}
      <div
        className={`auth-card ${mode === "register" ? "signup-mode" : ""} 
          relative w-230 h-147.5 rounded-2xl overflow-hidden z-10`}
        style={{ animation: "cardIn 0.55s cubic-bezier(.76,0,.24,1) forwards" }}
      >
        {children}
      </div>

    </div>
  );
}

export default AuthLayout