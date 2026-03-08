export const FormField = ({
  label,
  registration,
  icons,
  error,
  type = "text",
  placeholder,
  className = "",
  children,
  
}) => {
  return (
    <div className={`field mb-3.25 relative ${className}`}>
      {label && (
        <label className="block text-[10px] font-semibold tracking-widest uppercase text-neutral-text mb-1.25">
          {label}
        </label>
      )}
      <div className="relative">
        {icons && !children && (
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-muted z-10">
            <span className="material-symbols-outlined text-[20px]">{icons}</span>
          </span>
        )}

        {children ?? (
          <input
            {...registration}
            type={type}
            placeholder={placeholder}
            className={`inpttext w-full transition-colors
              ${icons ? "pl-10" : ""}
              ${error
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "focus:border-primary focus:ring-2 focus:ring-primary/20"
              }`}
          />
        )}
      </div>
      
      
      {error && (
        <p className="text-[11px] text-danger mt-1 flex items-center gap-1">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error.message}
        </p>
      )}
    </div>
  );
};
