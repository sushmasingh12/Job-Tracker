// ─── Single Card ──────────────────────────────────────────────────────────────
function StatItem({ label, value, icon, iconBg, iconColor, footer, footerText }) {
  return (
    <div className="relative bg-neutral-surface rounded-xl shadow-sm border border-neutral-border p-6 hover:shadow-md transition-shadow overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-medium text-neutral-muted">{label}</p>
          <h3 className="text-xl font-bold text-neutral-text mt-2">{value}</h3>
        </div>
        <div className={`p-1 ${iconBg} ${iconColor} rounded-lg`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center text-xs">
        {footer || <span className="text-neutral-muted">{footerText}</span>}
      </div>
    </div>
  );
}

// ─── Stats Grid ───────────────────────────────────────────────────────────────
const StatsCard = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <StatItem key={i} {...stat} />
      ))}
    </div>
  );
};

export default StatsCard;