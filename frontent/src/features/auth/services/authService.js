import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Register new user
export const registerUser = async (userData) => {
    const response = await api.post("/auth/register", userData);
    
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    
    return response.data;
};

// Login user
export const loginUser = async (userData) => {
    const response = await api.post("/auth/login", userData);
    
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    
    return response.data;
};

// Logout user
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

// Get current user
export const getCurrentUser = async () => {
    const response = await api.get("/auth/me");
    return response.data;
};

// Get stored user from localStorage
export const getStoredUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

export default {
    registerUser,
    loginUser,
    logout,
    getCurrentUser,
    getStoredUser,
    isAuthenticated
};

