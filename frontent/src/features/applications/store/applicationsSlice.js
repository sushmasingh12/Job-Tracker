import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import applicationService from "../services/applicationService";

const PER_PAGE = 10;

// ── Async Thunks ──────────────────────────────────────────────────────────────

export const fetchApplications = createAsyncThunk(
  "applications/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      return await applicationService.getAll(params);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const createApplicationThunk = createAsyncThunk(
  "applications/create",
  async (formData, { rejectWithValue }) => {
    try {
      return await applicationService.create(formData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const updateApplicationThunk = createAsyncThunk(
  "applications/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      return await applicationService.update(id, formData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const patchStatusThunk = createAsyncThunk(
  "applications/patchStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await applicationService.patchStatus(id, status);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const fetchApplicationByIdThunk = createAsyncThunk(
  "applications/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await applicationService.getById(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const deleteApplicationThunk = createAsyncThunk(
  "applications/delete",
  async (id, { rejectWithValue }) => {
    try {
      return await applicationService.remove(id); // returns id string
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const saveApplicationCoverLetterThunk = createAsyncThunk(
  "applications/saveCoverLetter",
  async ({ id, content }, { rejectWithValue }) => {
    try {
      return await applicationService.saveCoverLetterToApplication(id, content);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const saveApplicationResumeThunk = createAsyncThunk(
  "applications/saveResume",
  async ({ id, content, templateId }, { rejectWithValue }) => {
    try {
      return await applicationService.saveResumeToApplication(id, {
        content,
        templateId,
      });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const downloadApplicationMaterialThunk = createAsyncThunk(
  "applications/downloadMaterial",
  async ({ id, type, format = "pdf" }, { rejectWithValue }) => {
    try {
      await applicationService.downloadApplicationMaterial(id, type, format);
      return { id, type, format };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

// ── Slice ─────────────────────────────────────────────────────────────────────

const initialState = {
  applications: [], // all transformed apps from API
  stats: [], // [{_id: "Applied", count: N}, ...]
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
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ── fetchApplications ──────────────────────────────────────────────────
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = action.payload.applications;
        state.stats = action.payload.stats;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // ── createApplicationThunk ─────────────────────────────────────────────
    builder
      .addCase(createApplicationThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createApplicationThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // Prepend so the newest app appears at the top of the list
        state.applications.unshift(action.payload);
        state.currentPage = 1;
      })
      .addCase(createApplicationThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // ── updateApplicationThunk ─────────────────────────────────────────────
    builder
      .addCase(updateApplicationThunk.fulfilled, (state, action) => {
        const idx = state.applications.findIndex(
          (app) => String(app.id) === String(action.payload.id),
        );
        if (idx !== -1) state.applications[idx] = action.payload;
      })
      .addCase(updateApplicationThunk.rejected, (state, action) => {
        state.error = action.payload;
      });

    // ── patchStatusThunk ───────────────────────────────────────────────────
    builder
      .addCase(patchStatusThunk.fulfilled, (state, action) => {
        const idx = state.applications.findIndex(
          (app) => String(app.id) === String(action.payload.id),
        );
        if (idx !== -1) state.applications[idx] = action.payload;
      })
      .addCase(patchStatusThunk.rejected, (state, action) => {
        state.error = action.payload;
      });

    // ── fetchApplicationByIdThunk ──────────────────────────────────────────
    builder
      .addCase(fetchApplicationByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchApplicationByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // Upsert into applications array so selectApplicationById works
        const idx = state.applications.findIndex(
          (app) => String(app.id) === String(action.payload.id),
        );
        if (idx !== -1) {
          state.applications[idx] = action.payload;
        } else {
          state.applications.push(action.payload);
        }
      })
      .addCase(fetchApplicationByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // ── deleteApplicationThunk ─────────────────────────────────────────────
    builder
      .addCase(deleteApplicationThunk.fulfilled, (state, action) => {
        state.applications = state.applications.filter(
          (app) => String(app.id) !== String(action.payload),
        );
      })
      .addCase(deleteApplicationThunk.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder.addCase(
      saveApplicationCoverLetterThunk.fulfilled,
      (state, action) => {
        const updated = action.payload;
        const index = state.applications.findIndex(
          (app) => app.id === updated.id,
        );
        if (index !== -1) {
          state.applications[index] = updated;
        } else {
          state.applications.unshift(updated);
        }
      },
    );

    builder.addCase(
      saveApplicationResumeThunk.fulfilled,
      (state, action) => {
        const updated = action.payload;
        const index = state.applications.findIndex(
          (app) => String(app.id) === String(updated.id),
        );
        if (index !== -1) {
          state.applications[index] = updated;
        } else {
          state.applications.unshift(updated);
        }
      },
    );
  },
});

export const {
  setActiveFilter,
  setSearchQuery,
  setCurrentPage,
  selectApplication,
  clearSelectedApplication,
  clearError,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;

export const selectApplicationsState = (state) => state.applications;
export const selectApplications = (state) => state.applications.applications;
export const selectActiveFilter = (state) => state.applications.activeFilter;
export const selectSearchQuery = (state) => state.applications.searchQuery;
export const selectCurrentPage = (state) => state.applications.currentPage;
export const selectPerPage = (state) => state.applications.perPage;
export const selectIsLoading = (state) => state.applications.isLoading;
export const selectError = (state) => state.applications.error;
export const selectStats = (state) => state.applications.stats;

// ── Memoized Selectors ─────────────────────────────────────────────────────────

export const selectFilteredApplications = createSelector(
  [selectApplications, selectActiveFilter, selectSearchQuery],
  (applications, activeFilter, searchQuery) => {
    const q = searchQuery.toLowerCase().trim();

    return applications.filter((app) => {
      const matchesFilter =
        activeFilter === "All" || app.status === activeFilter;

      const matchesSearch =
        !q ||
        app.role.toLowerCase().includes(q) ||
        app.company.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  },
);

export const selectPaginatedApplications = createSelector(
  [selectFilteredApplications, selectCurrentPage, selectPerPage],
  (filtered, currentPage, perPage) => {
    const startIndex = (currentPage - 1) * perPage;
    return filtered.slice(startIndex, startIndex + perPage);
  },
);

export const selectPaginationMeta = createSelector(
  [selectFilteredApplications, selectPerPage, selectCurrentPage],
  (filtered, perPage, currentPage) => ({
    total: filtered.length,
    perPage,
    currentPage,
    totalPages: Math.ceil(filtered.length / perPage),
  }),
);

export const selectApplicationById = createSelector(
  [selectApplications, (_state, id) => id],
  (applications, id) =>
    applications.find((app) => String(app.id) === String(id)),
);
