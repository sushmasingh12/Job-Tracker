import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const TOKEN_KEY = "auth_token";

const settingsApi = axios.create({
  baseURL: `${API_URL}/settings`,
  headers: {
    "Content-Type": "application/json",
  },
});

settingsApi.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchSettingsService = async () => {
  const { data } = await settingsApi.get("/");
  return data;
};

export const updateSettingsService = async (payload) => {
  const { data } = await settingsApi.put("/", payload);
  return data;
};
