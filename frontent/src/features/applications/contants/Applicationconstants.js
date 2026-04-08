// APPLICATIONS_DATA has been removed — data now comes from the backend API.
// (previously used as static mock; fetched via applicationsSlice → fetchApplications thunk)

export const STATUS_FILTERS = ["All", "Applied", "Interview", "Offer", "Hired", "Rejected"];

export const STATUS_CONFIG = {
  Applied: {
    label:    "Applied",
    badgeCls: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20",
    dotColor: null,
    bar:      "bg-blue-500/80",
  },
  Interview: {
    label:    "Interview",
    badgeCls: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20",
    dotColor: "bg-amber-500 animate-pulse",
    bar:      "bg-amber-500/80",
  },
  Offer: {
    label:    "Offer",
    badgeCls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20",
    dotColor: null,
    bar:      "bg-emerald-500/80",
    icon:     "check",
  },
  Hired: {
    label:    "Hired",
    badgeCls: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20",
    dotColor: "bg-purple-500",
    bar:      "bg-purple-500/80",
    icon:     "workspace_premium",
  },
  Rejected: {
    label:    "Rejected",
    badgeCls: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20",
    dotColor: null,
    bar:      "bg-red-500/60",
  },
};