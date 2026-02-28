import { GoogleIcon, LinkedInIcon } from "../../../shared/components/ui/icons";

export function SocialButtons() {
    return (
      <div className="grid grid-cols-2 gap-2 mb-4.5">
        <button type="button" className="soc-btn flex items-center justify-center gap-1.75 py-2.5 px-3 bg-white border-[1.5px] border-neutral-border rounded-lg text-[12px] font-medium text-neutral-text cursor-pointer transition-all hover:border-primary hover:bg-primary-light">
          <GoogleIcon /> Google
        </button>
        <button type="button" className="soc-btn flex items-center justify-center gap-1.75 py-2.5 px-3 bg-white border-[1.5px] border-neutral-border rounded-lg text-[12px] font-medium text-neutral-text cursor-pointer transition-all hover:border-primary hover:bg-primary-light">
          <LinkedInIcon /> LinkedIn
        </button>
      </div>
    );
  }