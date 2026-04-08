import React from "react";
import useCoverTone from "../hooks/useCoverTone";


const TONES = [
  {
    value: "professional",
    label: "Professional",
    icon: "business_center",
    color: "bg-primary-light text-primary",
    desc: "Formal, respectful, and strictly business-oriented. Best for corporate, legal, or finance roles.",
    example: '"I am writing to express my formal interest in the Senior Manager position..."',
  },
  {
    value: "enthusiastic",
    label: "Enthusiastic",
    icon: "star",
    color: "bg-yellow-100 text-yellow-600",
    desc: "Energetic, passionate, and eager. Ideal for startups, sales, or customer-facing roles.",
    example: '"I was absolutely thrilled to see an opening for the Marketing Lead role..."',
  },
  {
    value: "conservative",
    label: "Conservative",
    icon: "shield",
    color: "bg-slate-100 text-slate-600",
    desc: "Traditional, concise, and direct. Suitable for government, academic, or highly regulated industries.",
    example: '"Please accept this letter and the attached resume as an application for the Analyst vacancy."',
  },
  {
    value: "creative",
    label: "Creative",
    icon: "palette",
    color: "bg-purple-100 text-purple-600",
    desc: "Original, storytelling-focused, and unique. Perfect for design, media, or advertising agencies.",
    example: '"Design isn\'t just my job; it\'s how I solve problems. That\'s why your mission resonated with me..."',
  },
];

const CoverTone = () => {
  const { selectedTone, handleToneChange } = useCoverTone();

  return (
    <div className="bg-neutral-surface rounded-xl shadow-sm border border-neutral-border p-8">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-neutral-text mb-2">
          How should this cover letter sound?
        </h2>
        <p className="text-neutral-muted">
          Select a tone that best matches the company culture and your personal
          brand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="radiogroup">
        {TONES.map((t) => (
          <label
            key={t.value}
            className="relative cursor-pointer group"
            onClick={() => handleToneChange(t.value)}
          >
            <div
              className={`h-full p-6 rounded-xl border-2 transition-all shadow-sm ${
                selectedTone === t.value
                  ? "border-primary bg-primary-light/10"
                  : "border-neutral-border bg-neutral-surface hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`shrink-0 h-12 w-12 rounded-full flex items-center justify-center transition-colors ${
                    selectedTone === t.value ? "bg-primary text-white" : t.color
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {t.icon}
                  </span>
                </div>
                <div>
                  <h3
                    className={`font-bold ${
                      selectedTone === t.value
                        ? "text-primary"
                        : "text-neutral-text"
                    }`}
                  >
                    {t.label}
                  </h3>
                  <p className="text-sm text-neutral-muted mt-1">{t.desc}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-border/50">
                <p className="text-xs text-neutral-muted italic font-medium bg-background-light p-3 rounded">
                  {t.example}
                </p>
              </div>
              {selectedTone === t.value && (
                <div className="absolute top-6 right-6 text-primary">
                  <span className="material-symbols-outlined">
                    check_circle
                  </span>
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CoverTone;