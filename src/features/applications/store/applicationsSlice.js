import { createSlice, createSelector } from "@reduxjs/toolkit";
import { APPLICATIONS_DATA } from "../contants/Applicationconstants";


const PER_PAGE = 10;

const initialState = {
  applications: APPLICATIONS_DATA,
  activeFilter: "All",
  searchQuery: "",
  currentPage: 1,
  perPage: PER_PAGE,
  selectedApplication: null,
  isLoading: false,
  error: null,
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    addApplication(state, action) {
      // Add new application to the beginning of the list
      state.applications.unshift(action.payload);
    },
    setActiveFilter(state, action) {
      state.activeFilter = action.payload;
      state.currentPage = 1; 
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      state.currentPage = 1; 
    },
    
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    selectApplication(state, action) {
      state.selectedApplication = action.payload; 
    },
    clearSelectedApplication(state) {
      state.selectedApplication = null;         
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  addApplication,
  setActiveFilter,
  setSearchQuery,
  setCurrentPage,
  selectApplication,
  clearSelectedApplication,
  setLoading,
  setError,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;

// ── Base Selectors ────────────────────────────────────────────────────────────────

export const selectApplicationsState = (state) => state.applications;
export const selectApplications = (state) => state.applications.applications;
export const selectActiveFilter = (state) => state.applications.activeFilter;
export const selectSearchQuery = (state) => state.applications.searchQuery;
export const selectCurrentPage = (state) => state.applications.currentPage;
export const selectPerPage = (state) => state.applications.perPage;

// ── Memoized Selectors ────────────────────────────────────────────────────────────────

// Memoized selector for filtered applications - only recomputes when applications, filter, or search changes
export const selectFilteredApplications = createSelector(
  [selectApplications, selectActiveFilter, selectSearchQuery],
  (applications, activeFilter, searchQuery) => {
    const q = searchQuery.toLowerCase().trim();
    
    return applications.filter((app) => {
      // Filter by status
      const matchesFilter = activeFilter === "All" || app.status === activeFilter;
      
      // Filter by search query (search in role and company)
      const matchesSearch = !q || 
        app.role.toLowerCase().includes(q) || 
        app.company.toLowerCase().includes(q);
      
      return matchesFilter && matchesSearch;
    });
  }
);

// Memoized selector for paginated applications - only recomputes when filtered results or pagination changes
export const selectPaginatedApplications = createSelector(
  [selectFilteredApplications, selectCurrentPage, selectPerPage],
  (filtered, currentPage, perPage) => {
    const startIndex = (currentPage - 1) * perPage;
    return filtered.slice(startIndex, startIndex + perPage);
  }
);

// Memoized selector for pagination metadata
export const selectPaginationMeta = createSelector(
  [selectFilteredApplications, selectPerPage, selectCurrentPage],
  (filtered, perPage, currentPage) => ({
    total: filtered.length,
    perPage,
    currentPage,
    totalPages: Math.ceil(filtered.length / perPage),
  })
);

// Selector to find application by ID
export const selectApplicationById = createSelector(
  [selectApplications, (_state, id) => id],
  (applications, id) => applications.find((app) => String(app.id) === String(id))
);
