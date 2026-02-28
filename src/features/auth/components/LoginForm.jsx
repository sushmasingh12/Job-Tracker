import { Button } from "../../../shared/components/ui/Button";
import { Divider } from "../../../shared/components/ui/Divider";
import { FormField } from "../../../shared/components/ui/FormField";
import { useLogin } from "../hooks/useAuth";
import { PasswordField } from "./PasswordField";
import { SocialButtons } from "./SocialButtons";
import { useNavigate } from "react-router-dom";

export const SignInOverlay = ({onCreateAccount}) => {
  return (
    <div className="overlay-wrap absolute top-0 bottom-0 w-1/2 z-50">
      <div className="overlay-panel relative w-full h-full bg-sidebar flex flex-col justify-between px-11.5 py-11 overflow-hidden">
        <div className="overlay-glow" />

        {/* Logo */}
        <div className="font-playfair text-[20px] font-bold text-white no-underline flex items-center gap-2 relative z-10">
          <div className="w-2 h-2 bg-primary rounded-full" />
          JobTracker
        </div>

        {/* Body */}
        <div className="o-body relative z-10">
          <div className="o-content">
            <div className="flex items-center gap-2.25 mb-5 text-[10px] font-semibold tracking-[2.5px] uppercase text-primary-light opacity-85">New here?</div>

            <h2 className="font-playfair text-[clamp(26px,3vw,40px)] font-black text-white leading-[1.05] tracking-[-1.5px] mb-4">
              Start your journey <em>today</em>
            </h2>

            <p className="text-[14px] font-light text-white/50 leading-[1.7] max-w-75 mb-7">
              Create a free account and let AI handle the heavy lifting of your entire job search.
            </p>

            <button onClick={onCreateAccount}  className="inline-flex items-center gap-2 py-3 px-6.5 font-dm text-[13px] font-medium text-white bg-primary border-[1.5px] border-primary rounded-lg cursor-pointer transition-all self-start hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(25,118,210,0.4)] [&>svg]:transition-transform hover:[&>svg]:translate-x-0.75">
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
              <div className="w-7 h-7 rounded-full border-2 border-slate-800 flex items-center justify-center text-[9px] font-semibold text-white -ml-1.5" style={{ background: "#1976d2" }}>JL</div>
              <div className="w-7 h-7 rounded-full border-2 border-slate-800 flex items-center justify-center text-[9px] font-semibold text-white -ml-1.5" style={{ background: "#9c27b0" }}>MK</div>
              <div className="w-7 h-7 rounded-full border-2 border-slate-800 flex items-center justify-center text-[9px] font-semibold text-white -ml-1.5" style={{ background: "#0e7c6a" }}>SR</div>
              <div className="w-7 h-7 rounded-full border-2 border-slate-800 flex items-center justify-center text-[9px] font-semibold text-white -ml-1.5" style={{ background: "#b45309" }}>DP</div>
            </div>
            <div className="text-[11px]  leading-normal" style={{color:"rgba(255,255,255,0.8)"}}>
              <strong>12,000+ job seekers</strong><br />
              landed roles with ApplyIQ
            </div>
          </div>

          <div className="flex items-center gap-2.25 py-2.5 px-3.5 mt-3 bg-white/4 border border-white/8 rounded-full">
            <div className="w-1.75 h-1.75 rounded-full bg-success shrink-0" />
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

export const SignInForm = ({onCreateAccount}) => {
  const {register, handleSubmit, errors, isSubmitting} =useLogin();
  return (
    <div className="form-pane pane-signin bg-white px-11.5 py-10 flex flex-col justify-center overflow-hidden relative">
      <div className="pane-inner w-full max-w-85 mx-auto">

        <h1 className="font-playfair text-[26px] font-bold text-neutral-text tracking-tight mb-1">
          Welcome back
        </h1>
        <p className="text-[13px] text-neutral-muted font-light mb-6.5">
          No account yet?{" "}
          <span onClick={onCreateAccount}
            className="text-primary font-medium border-b border-transparent hover:border-primary transition-all cursor-pointer"
          >
            Create one →
          </span>
        </p>

        <SocialButtons/>
        <Divider/>

        

        <form onSubmit={handleSubmit}>
          <FormField
          label="Email"
          type="email"
          placeholder="you@email.com"
          registration={register("email", {
            required:"Email is required",
            pattern:{value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email",
          }})}
          error={errors.email}
          />
          {/* <div className="field mb-3.25 relative">
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text mb-1.25" htmlFor="si-email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inpttext"
              placeholder="you@email.com"
            />
          </div> */}
         <PasswordField
         label="Password"
         placeholder="Enter password"
         registration={register("password", {
           required: "Password is required",
           minLength: { value: 6, message: "Min 6 characters" },
         })}
         error={errors.password}
         />
          
          <Button type="submit" loading={isSubmitting} fullWidth>
            Sign In
          </Button>

        </form>

        {/* Security note */}
        <div className="flex items-center justify-center gap-1.25 mt-2.5 text-[10px] text-neutral-muted">
          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
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

// export default function SignIn() {
//   const navigate = useNavigate()
//   const handleCreateAccount = ()=> {
//     navigate("/signup")
//   }
//   const handleSignIn= () => {
//     navigate("/dashboard")
//   }
//   return (
//     <div className="font-dm bg-sidebar min-h-screen flex items-center justify-center overflow-hidden relative">

//       {/* Background */}
//       <div className="hero-grid-bg"/>
//       <div className="blob-a fixed rounded-full pointer-events-none blur-[90px]" style={{ animation: "blobDrift 14s ease-in-out infinite" }} />
//       <div className="blob-b fixed rounded-full pointer-events-none blur-[90px]" style={{ animation: "blobDrift 10s ease-in-out infinite reverse" }} />

//       {/* Auth Card */}
//       <div
//         className="auth-card relative w-230 h-147.5 rounded-2xl overflow-hidden z-10"
//         style={{ animation: "cardIn 0.55s cubic-bezier(.76,0,.24,1) forwards" }}
//       >

//         {/* Form (left half) + empty right half placeholder */}
//         <div className="absolute inset-0 grid grid-cols-2">
//           <SignInForm onCreateAccount={handleCreateAccount} onSignIn={handleSignIn}/>
//           <div className="bg-white" /> {/* right half — overlay covers this */}
//         </div>

//         {/* Overlay slides on the right */}
//         <SignInOverlay onCreateAccount={handleCreateAccount}/>

//       </div>
//     </div>
//   );
// }