import axios from "axios";
import Cookies from "js-cookie";


const COOKIE_OPTIONS = {
  expires: 7,                       
  secure: import.meta.env.PROD,     
  sameSite: "strict",               
  
};

const TOKEN_KEY = "auth_token";
const USER_KEY  = "auth_user";

// ─── Axios Instance ────────────────────────────────────────────────────────
const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  
});


api.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN_KEY); 
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


const saveAuth = (token, userInfo) => {
  Cookies.set(TOKEN_KEY, token, COOKIE_OPTIONS);
  Cookies.set(USER_KEY, JSON.stringify(userInfo), COOKIE_OPTIONS);
};

const clearAuth = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USER_KEY);
};


export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};


export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  const { data } = response.data;

  if (data?.token) {
    const { token, ...userInfo } = data;
    saveAuth(token, userInfo);
  }

  return response.data;
};

// ─── Logout ────────────────────────────────────────────────────────────────
export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.warn("Backend logout warning:", error);
  } finally {
    clearAuth();
  }
};


export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// ─── Public Helpers ────────────────────────────────────────────────────────
export const getStoredUser  = () => {
  const raw = Cookies.get(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const getStoredToken = () => Cookies.get(TOKEN_KEY);

export const isAuthenticated = () => !!Cookies.get(TOKEN_KEY);