// features/dashboard/components/RecentApplications.jsx

const STATUS_STYLES = {
  Applied:    "bg-blue-100 text-blue-800",
  Interview:  "bg-orange-100 text-orange-800",
  Reviewing:  "bg-gray-100 text-gray-800",
  Rejected:   "bg-red-100 text-red-800",
  Offered:    "bg-green-100 text-green-800",
};

// Placeholder data — replace with API data via useDashboard hook
const RECENT_APPS = [
  { id: 1, title: "Senior Product Designer", company: "Google",  location: "Mountain View, CA", status: "Applied",   date: "Oct 24", icon: "domain"     },
  { id: 2, title: "Frontend Developer",       company: "Stripe",  location: "Remote",            status: "Interview", date: "Oct 22", icon: "business"   },
  { id: 3, title: "UX Researcher",            company: "Airbnb",  location: "San Francisco, CA", status: "Reviewing", date: "Oct 20", icon: "apartment"  },
  { id: 4, title: "Product Manager",          company: "Shopify", location: "Ottawa, ON",        status: "Rejected",  date: "Oct 18", icon: "storefront" },
  { id: 5, title: "Design System Lead",       company: "Figma",   location: "Remote",            status: "Applied",   date: "Oct 15", icon: "hub"        },
];

// ─── Single Application Row ───────────────────────────────────────────────────
function ApplicationRow({ title, company, location, status, date, icon }) {
  return (
    <div className="bg-neutral-surface border border-neutral-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-colors shadow-sm">
      {/* Company icon */}
      <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-gray-400">{icon}</span>
      </div>

      {/* Job info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-base font-semibold text-neutral-text truncate">{title}</h4>
        <p className="text-sm text-neutral-muted truncate">{company} • {location}</p>
      </div>

      {/* Status + date */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status] ?? "bg-gray-100 text-gray-800"}`}>
          {status}
        </span>
        <span className="text-xs text-neutral-muted">{date}</span>
      </div>
    </div>
  );
}

// ─── RecentApplications ───────────────────────────────────────────────────────
// Props:
//   applications (optional) → array of app objects to override defaults
//   onViewAll    (optional) → callback for "View All" click
const RecentApplications = ({ applications = RECENT_APPS, onViewAll }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-text">Recent Applications</h2>
        <button
          onClick={onViewAll}
          className="text-sm font-medium text-primary hover:text-primary-dark hover:underline"
        >
          View All
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {applications.map((app) => (
          <ApplicationRow key={app.id} {...app} />
        ))}
      </div>
    </div>
  );
};

export default RecentApplications;