import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:            null,   
    isAuthenticated: false,
    isLoading:       false,
    error:           null,
    isInitialized:   false, // New field to track if we've checked the session
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user            = user;
      state.isAuthenticated = !!user;
      state.error           = null;
      state.isInitialized   = true;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error     = action.payload;
      state.isLoading = false;
    },

    logout: (state) => {
      state.user            = null;
      state.isAuthenticated = false;
      state.error           = null;
      state.isLoading       = false;
    },

    clearError: (state) => {
      state.error = null;
    },
    
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    }
  },
});

export const { setCredentials, setLoading, setError, logout, clearError, setInitialized } =
  authSlice.actions;

export default authSlice.reducer;

// ── Selectors ──────────────────────────────────────────
export const selectCurrentUser     = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading     = (state) => state.auth.isLoading;
export const selectAuthError       = (state) => state.auth.error;
export const selectIsInitialized   = (state) => state.auth.isInitialized;