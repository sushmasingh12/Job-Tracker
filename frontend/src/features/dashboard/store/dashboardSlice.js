import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dashboardService from "../services/dashboardService";

const initialState = {
  stats: [],
  recentApps: [],
  trendData: [],
  loading: false,
  error: null,
};

export const fetchDashboardSummary = createAsyncThunk(
  "dashboard/fetchDashboardSummary",
  async (_, thunkAPI) => {
    try {
      const result = await dashboardService.getDashboardSummary();

      return {
        stats: Array.isArray(result?.stats) ? result.stats : [],
        recentApps: Array.isArray(result?.recentApplications)
          ? result.recentApplications
          : [],
        trendData: Array.isArray(result?.trendData) ? result.trendData : [],
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch dashboard data"
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
    resetDashboardState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.recentApps = action.payload.recentApps;
        state.trendData = action.payload.trendData;
      })
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch dashboard data";
      });
  },
});

export const { clearDashboardError, resetDashboardState } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;

export const selectDashboardStats = (state) => state.dashboard.stats;
export const selectDashboardRecentApps = (state) => state.dashboard.recentApps;
export const selectDashboardTrendData = (state) => state.dashboard.trendData;
export const selectDashboardLoading = (state) => state.dashboard.loading;
export const selectDashboardError = (state) => state.dashboard.error;