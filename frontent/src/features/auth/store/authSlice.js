import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


const storedUser  = Cookies.get("auth_user");
const storedToken = Cookies.get("auth_token");

const user = storedUser ? JSON.parse(storedUser) : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:            user || null,   
    token:           storedToken || null,
    isAuthenticated: !!user,
    isLoading:       false,
    error:           null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user            = user;
      state.token           = token;
      state.isAuthenticated = true;
      state.error           = null;
      
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
      state.token           = null;
      state.isAuthenticated = false;
      state.error           = null;
      state.isLoading       = false;
      Cookies.remove("auth_token");
      Cookies.remove("auth_user");
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setCredentials, setLoading, setError, logout, clearError } =
  authSlice.actions;

export default authSlice.reducer;

// ── Selectors ──────────────────────────────────────────
export const selectCurrentUser     = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading     = (state) => state.auth.isLoading;
export const selectAuthError       = (state) => state.auth.error;
export const selectToken           = (state) => state.auth.token;