
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../../../shared/components/ui/icons";
import { getStrength } from "../utils/passwordStrength";

export function PasswordField({
  label,
  registration,
  error,
  watchValue = "",   // ← strength ke liye watch("password") pass karo
  showStrength = false,
  placeholder = "Enter password",
}) {
  const [show, setShow] = useState(false);
  const strength = showStrength ? getStrength(watchValue) : null;

  return (
    <div className="mb-3.25 relative">
      <label className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text mb-1.25">
        {label}
      </label>

      {/* Input + Eye toggle */}
      <div className="relative">
        <input
          {...registration}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className={`inpttext w-full pr-10 ${error ? "border-red-400" : ""}`}
        />
        <button
          type="button"
          className="absolute right-2.75 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-neutral-muted flex p-1 hover:text-primary transition-colors"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>

      {/* Strength bar — sirf tab dikhega jab showStrength=true */}
      {showStrength && watchValue && (
        <div className="mt-1.5">
          <div className="flex gap-1 mb-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full transition-all duration-300"
                style={{
                  background: i <= strength.score ? strength.color : "#e5e7eb",
                }}
              />
            ))}
          </div>
          {strength.label && (
            <p className="text-[11px] font-medium" style={{ color: strength.color }}>
              {strength.label}
            </p>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-[11px] text-red-500 mt-1">{error.message}</p>
      )}
    </div>
  );
}