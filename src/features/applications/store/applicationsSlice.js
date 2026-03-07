import { createSlice } from "@reduxjs/toolkit";
import { APPLICATIONS_DATA } from "../contants/Applicationconstants";


const PER_PAGE = 10;

const initialState = {
  applications: APPLICATIONS_DATA,
  activeFilter: "All",
  searchQuery: "",
  currentPage: 1,
  perPage: PER_PAGE,
  selectedApplication: null,
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
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
  },
});

export const {
  setActiveFilter,
  setSearchQuery,
  setCurrentPage,
  selectApplication,
  clearSelectedApplication,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;

// ── Selectors ────────────────────────────────────────────────────────────────


export const selectFilteredApplications = (state) => {
  const { applications, activeFilter, searchQuery } = state.applications;
  return applications.filter((app) => {
    const matchesFilter = activeFilter === "All" || app.status === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      app.role.toLowerCase().includes(q) ||
      app.company.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });
};


export const selectPaginatedApplications = (state) => {
  const filtered = selectFilteredApplications(state);
  const { currentPage, perPage } = state.applications;
  return filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
};


export const selectPaginationMeta = (state) => {
  const filtered = selectFilteredApplications(state);
  return {
    total: filtered.length,
    perPage: state.applications.perPage,
    currentPage: state.applications.currentPage,
  };
};