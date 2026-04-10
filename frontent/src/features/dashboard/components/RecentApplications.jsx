const STATUS_STYLES = {
  Applied:    "bg-blue-100 text-blue-800",
  Interview:  "bg-orange-100 text-orange-800",
  Reviewing:  "bg-gray-100 text-gray-800",
  Rejected:   "bg-red-100 text-red-800",
  Offer:      "bg-green-100 text-green-800",
  Hired:      "bg-purple-100 text-purple-800",
};

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
const RecentApplications = ({ applications = [], onViewAll }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-neutral-text">Recent Applications</h2>
        {applications.length > 0 && (
          <button
            onClick={onViewAll}
            className="text-sm font-medium text-primary hover:text-primary-dark hover:underline"
          >
            View All
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-4">
        {applications.length > 0 ? (
          applications.map((app) => (
            <ApplicationRow key={app.id} {...app} />
          ))
        ) : (
          <div className="bg-neutral-surface border border-neutral-border border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-4xl text-neutral-muted mb-2">
              post_add
            </span>
            <p className="text-neutral-text font-medium">No applications found</p>
            <p className="text-neutral-muted text-sm mt-1">Start tracking your job search by adding one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentApplications;