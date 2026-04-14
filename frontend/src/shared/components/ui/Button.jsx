const variants = {
    primary: "text-white border-none hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(25,118,210,0.4)]",
    ghost:   "bg-transparent text-primary border border-primary hover:bg-primary-light",
    social:  "bg-white border-[1.5px] border-neutral-border text-neutral-text hover:border-primary hover:bg-primary-light",
  };
export const Button = ({
    children,
    variant = "primary",
    loading = false,
    fullWidth = false,
    type = "button",
    disabled,
    onClick,
    className = "",
  }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`
          py-3.25 px-6.5 font-dm text-[13px] font-medium rounded-lg cursor-pointer
          transition-all flex items-center justify-center gap-1.75
          disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
          active:translate-y-0
          ${variants[variant]}
          ${fullWidth ? "w-full text-[14px]" : ""}
          ${className}
        `}
        style={
          variant === "primary"
            ? { background: "#1976d2", boxShadow: "0 4px 16px rgba(25,118,210,0.3)" }
            : {}
        }
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <span>Please wait...</span>
          </>
        ) : children}
      </button>
    );
  }