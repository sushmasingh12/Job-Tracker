import { useRegister } from "../hooks/useAuth";
import { SocialButtons } from "./SocialButtons";
import { Divider } from "../../../shared/components/ui/Divider";
import { FormField } from "../../../shared/components/ui/FormField";
import { PasswordField } from "./PasswordField";
import { Button } from "../../../shared/components/ui/Button";

export const SignUpOverlay = ({ onSignIn }) => {
  return (
    <div
  className="overlay-wrap hidden lg:block absolute top-0 bottom-0 w-1/2 z-20"
  style={{ left: 0 }}
>
  <div className="overlay-panel relative w-full h-full bg-sidebar flex flex-col justify-between px-5 py-8 sm:px-8 sm:py-10 lg:px-11.5 lg:py-11 overflow-hidden min-h-65 lg:min-h-full">
   <div
          className="overlay-glow"
          style={{ bottom: -80, right: -80, left: "auto" }}
        />

        <div className="font-playfair text-[18px] sm:text-[20px] font-bold text-white no-underline flex items-center gap-2 relative z-10">
          <div className="w-2 h-2 bg-primary rounded-full" />
          JobTracker
        </div>

        <div className="relative z-10 py-8 lg:py-0">
          <div className="o-content">
            <div className="flex items-center gap-2.25 mb-5 text-[10px] font-semibold tracking-[2.5px] uppercase text-primary-light opacity-85">
              Already a member?
            </div>

            <h2 className="font-playfair text-[28px] sm:text-[34px] lg:text-[40px] font-black text-white leading-[1.05] tracking-[-1.2px] lg:tracking-[-1.5px] mb-4">
              Good to have you{" "}
              <em className="not-italic text-primary-light">back</em>
            </h2>

            <p className="text-[13px] sm:text-[14px] font-light text-white/50 leading-[1.7] max-w-full lg:max-w-75 mb-7">
              Sign in to pick up right where you left off. Your applications are
              waiting.
            </p>

            <button
              onClick={onSignIn}
              className="inline-flex items-center justify-center gap-2 py-3 px-5 sm:px-6.5 font-dm text-[13px] font-medium text-white bg-primary border-[1.5px] border-primary rounded-lg cursor-pointer transition-all self-start hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(25,118,210,0.4)] [&>svg]:transition-transform hover:[&>svg]:translate-x-0.75"
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

        <div className="relative z-10">
          <div className="flex items-center gap-2.25 py-2.5 px-3.5 mt-3 bg-white/4 border border-white/8 rounded-full">
            <div className="pulse-dot w-1.75 h-1.75 rounded-full bg-success shrink-0" />
            <div className="text-[10px] sm:text-[11px] text-white/42 leading-[1.4]">
              <strong className="text-white/82 font-medium">284 people</strong>{" "}
              got hired this month using ApplyIQ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Sign Up Form ─────────────────────────────────────────────────────────────

export const SignUpForm = ({ onSignIn }) => {
  const { register, handleSubmit, errors, isSubmitting, watch, apiError } =
    useRegister();
  const passwordValue = watch("password");

  return (
    <div className="form-pane pane-signup bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-11.5 lg:py-10 flex flex-col justify-center overflow-hidden relative w-full order-2 lg:order-none">
      <div className="pane-inner w-full max-w-full sm:max-w-[520px] lg:max-w-85 mx-auto">
        <h1 className="font-playfair text-[24px] sm:text-[26px] font-bold text-neutral-text tracking-tight mb-1">
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

        {apiError && (
          <div className="flex items-center gap-2 mb-4 px-3.5 py-2.5 bg-red-50 border border-red-200 rounded-lg">
            <svg
              className="w-3.5 h-3.5 text-red-500 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-[12px] text-red-600 font-medium">{apiError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <FormField
              label="First Name"
              type="text"
              placeholder="Enter First Name"
              registration={register("firstname", {
                required: "First name is required",
              })}
              error={errors.firstname}
            />
            <FormField
              label="Last Name"
              type="text"
              placeholder="Enter Last Name"
              registration={register("lastname", {
                required: "Last name is required",
              })}
              error={errors.lastname}
            />
          </div>

          <FormField
            label="Email"
            type="email"
            placeholder="you@email.com"
            registration={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
            error={errors.email}
          />

          <PasswordField
            label="Password"
            placeholder="Enter password"
            registration={register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Min 6 characters" },
            })}
            error={errors.password}
          />

          <PasswordField
            label="Confirm Password"
            placeholder="confirm password"
            registration={register("confirmpassword", {
              required: "Password is required",
              validate: (val) =>
                val === passwordValue || "Passwords do not match",
            })}
            error={errors.confirmpassword}
          />

          <div className="flex items-start gap-2 mb-4">
            <input
              {...register("terms", {
                required: "Please accept terms to continue",
              })}
              type="checkbox"
              id="su-terms"
              className="w-3.25 h-3.25 accent-primary cursor-pointer mt-0.5 shrink-0"
            />
            <div>
              <label
                className="text-[12px] text-neutral-muted leading-relaxed font-light"
                htmlFor="su-terms"
              >
                I agree to{" "}
                <button
                  type="button"
                  className="text-primary font-medium border-b border-primary-light"
                >
                  Terms
                </button>{" "}
                &amp;{" "}
                <button
                  type="button"
                  className="text-primary font-medium border-b border-primary-light"
                >
                  Privacy Policy
                </button>
              </label>

              {errors.terms && (
                <p className="text-[11px] text-red-500 mt-0.5">
                  {errors.terms.message}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" loading={isSubmitting} fullWidth>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};