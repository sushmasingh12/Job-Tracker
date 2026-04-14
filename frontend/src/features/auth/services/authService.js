import axios from "axios";

// ─── Axios Instance ────────────────────────────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

// ─── Logout ────────────────────────────────────────────────────────────────
export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.warn("Backend logout warning:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};