const FILTERS = [
  { id: 'all', label: 'All Questions', icon: 'apps' },
  { id: 'behavioral', label: 'Behavioral', icon: 'psychology' },
  { id: 'technical', label: 'Technical', icon: 'code' },
  { id: 'leadership', label: 'Leadership', icon: 'groups' },
  { id: 'product', label: 'Product Sense', icon: 'lightbulb' },
  { id: 'situational', label: 'Situational', icon: 'fork_right' },
  { id: 'bookmarked', label: 'Bookmarked', icon: 'bookmark' },
];

const QuestionFilters = ({ activeFilter, onFilterChange, questions, bookmarkedCount }) => {
  // Count per type
  const counts = questions.reduce((acc, q) => {
    const t = q.type?.toLowerCase() || 'behavioral';
    acc[t] = (acc[t] || 0) + 1;
    return acc;
  }, {});
  counts.all = questions.length;
  counts.bookmarked = bookmarkedCount || 0;

  return (
    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
      <span className="text-xs font-semibold text-neutral-muted uppercase tracking-wider mr-0.5 sm:mr-1">
        Filter:
      </span>
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter.id;
        const count = counts[filter.id];
        if (count === undefined || count === 0) return null;

        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all border ${isActive
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                : 'bg-white border-neutral-border text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300'
              }`}
          >
            <span className="material-symbols-outlined text-[13px] sm:text-[14px]">
              {filter.icon}
            </span>
            {filter.label}
            {count !== undefined && (
              <span
                className={`text-xs px-1 sm:px-1.5 py-0.5 rounded-full font-semibold ${isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-neutral-100 text-neutral-500'
                  }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionFilters;
