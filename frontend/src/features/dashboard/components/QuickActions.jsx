import { useNavigate } from "react-router-dom";

const ACTIONS = [
  {
    id: "cover-letter",
    title: "Generate Cover Letter",
    description: "AI-powered customization",
    icon: "auto_fix_high",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    iconHoverBg: "group-hover:bg-purple-600",
    href: "/ai/cover-letter",
  },
  {
    id: "resume",
    title: "Customize Resume",
    description: "Tailor for specific job",
    icon: "edit_document",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    iconHoverBg: "group-hover:bg-blue-600",
    href: "/ai/resume",
  },
];

// ─── Single Action Button ─────────────────────────────────────────────────────
function ActionItem({ title, description, icon, iconBg, iconColor, iconHoverBg, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full group flex items-center justify-between p-4 rounded-lg bg-white border border-neutral-border hover:border-primary hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-full ${iconBg} ${iconColor} flex items-center justify-center ${iconHoverBg} group-hover:text-white transition-colors`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div className="text-left">
          <h4 className="text-sm font-semibold text-neutral-text">{title}</h4>
          <p className="text-xs text-neutral-muted">{description}</p>
        </div>
      </div>
      <span className="material-symbols-outlined text-neutral-muted group-hover:text-primary transition-colors">
        chevron_right
      </span>
    </button>
  );
}

// ─── Pro Tip Banner ───────────────────────────────────────────────────────────
function ProTip({ tip, linkText, linkHref }) {
  return (
    <div className="bg-blue-600 rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
      <div className="relative z-10">
        <h4 className="font-bold mb-1">Pro Tip</h4>
        <p className="text-sm text-blue-100 mb-3">{tip}</p>
        <button
          type="button"
          className="text-xs font-bold underline decoration-blue-300 hover:text-blue-100 bg-transparent border-none p-0 cursor-pointer"
        >
          {linkText}
        </button>
      </div>
      <div className="absolute -bottom-6 -right-6 text-blue-500 opacity-30 rotate-12">
        <span className="material-symbols-outlined text-9xl">lightbulb</span>
      </div>
    </div>
  );
}


const QuickActions = ({ actions = ACTIONS, onAction }) => {
  const navigate = useNavigate();

  const handleAction = (action) => {
    if (action.href) {
      navigate(action.href);
    }
    onAction?.(action.id);
  };

  return (
    <div className="space-y-8">
      {/* Actions Panel */}
      <div className="bg-gradient-to-br from-neutral-surface to-background-light rounded-xl border border-neutral-border p-6 shadow-sm">
        <h3 className="text-lg font-bold text-neutral-text mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {actions.map((action) => (
            <ActionItem
              key={action.id}
              {...action}
              onClick={() => handleAction(action)}
            />
          ))}
        </div>
      </div>

      {/* Pro Tip */}
      <ProTip
        tip="Following up within 3 days increases response rates by 15%."
        linkText="View follow-up templates"
        linkHref="#"
      />
    </div>
  );
};

export default QuickActions;