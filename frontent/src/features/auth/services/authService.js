import axios from "axios";
import Cookies from "js-cookie";

const COOKIE_OPTIONS = {
  expires: 7,
  secure: import.meta.env.PROD,
  sameSite: "strict",
};

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const api = axios.create({
    baseURL: API_URL,
  headers: { "Content-Type": "application/json" },

});