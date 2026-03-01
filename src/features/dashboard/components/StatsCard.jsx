// features/dashboard/components/StatsCard.jsx

const STATS = [
  {
    label: "Total Applications",
    value: "42",
    icon: "folder_open",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    footer: <span className="text-neutral-muted">Lifetime total</span>,
  },
  {
    label: "This Week",
    value: "8",
    icon: "calendar_today",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    footer: (
      <div className="flex items-center gap-1">
        <span className="text-success flex items-center font-medium bg-success/10 px-1.5 py-0.5 rounded">
          <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>
          12%
        </span>
        <span className="text-neutral-muted">vs last week</span>
      </div>
    ),
  },
  {
    label: "Interviews",
    value: "5",
    icon: "video_camera_front",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    footer: <span className="text-warning font-medium">2 scheduled soon</span>,
  },
  {
    label: "Response Rate",
    value: "14%",
    icon: "mark_email_read",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    footer: (
      <div className="flex items-center gap-1">
        <span className="text-success flex items-center font-medium bg-success/10 px-1.5 py-0.5 rounded">
          <span className="material-symbols-outlined text-sm mr-0.5">arrow_upward</span>
          2.1%
        </span>
        <span className="text-neutral-muted">vs avg</span>
      </div>
    ),
  },
];

// ─── Single Card ──────────────────────────────────────────────────────────────
function StatItem({ label, value, icon, iconBg, iconColor, footer }) {
  return (
    <div className="bg-neutral-surface rounded-xl p-6 shadow-sm border border-neutral-border hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-medium text-neutral-muted">{label}</p>
          <h3 className="text-xl font-bold text-neutral-text mt-2">{value}</h3>
        </div>
        <div className={`p-1 ${iconBg} ${iconColor} rounded-lg`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center text-xs">{footer}</div>
    </div>
  );
}

// ─── Stats Grid ───────────────────────────────────────────────────────────────
// Props:
//   stats (optional) → array of stat objects to override defaults
const StatsCard = ({ stats = STATS }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <StatItem key={i} {...stat} />
      ))}
    </div>
  );
};

export default StatsCard;