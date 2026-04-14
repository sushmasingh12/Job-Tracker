import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveFilter,setSearchQuery } from "../store/applicationsSlice";
import { STATUS_FILTERS } from "../contants/Applicationconstants";


/**
 * Custom hook for debounced value - delays updating the value until after
 * the specified delay has elapsed since the last change
 */
const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const FilterBar = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.applications.activeFilter);
  const searchQuery = useSelector((state) => state.applications.searchQuery);
  
  // Local state for immediate UI feedback while typing
  const [localSearch, setLocalSearch] = useState(searchQuery);
  
  // Debounce the search to avoid excessive filtering
  const debouncedSearch = useDebounce(localSearch, 300);
  
  // Update Redux only when debounced value changes
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  const handleFilterClick = useCallback((filter) => {
    dispatch(setActiveFilter(filter));
  }, [dispatch]);

  return (
    <div className="mb-6 flex flex-col lg:flex-row gap-4 justify-between items-center">

      {/* Search Input with debounce */}
      <div className="relative w-full lg:w-96 group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="material-symbols-outlined text-slate-400 group-focus-within:text-blue-500 transition-colors text-[20px]">
            search
          </span>
        </div>
        <input
          className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/50 dark:bg-slate-800/40 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm backdrop-blur-md transition-all shadow-sm"
          placeholder="Search by role, company..."
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          aria-label="Search applications"
        />
        {/* Clear button */}
        {localSearch && (
          <button
            onClick={() => setLocalSearch("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            aria-label="Clear search"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* Filter Buttons */}
      <div 
        className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0"
        role="group"
        aria-label="Filter by status"
      >
        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-slate-200 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700/80 border border-transparent dark:border-slate-700"
            }`}
            aria-pressed={activeFilter === filter}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
