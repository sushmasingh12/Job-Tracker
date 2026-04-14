import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const settingsApi = axios.create({
  baseURL: `${API_URL}/settings`,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// ── Core settings ─────────────────────────────────────────────────────────────

export const fetchSettingsService = async () => {
  const { data } = await settingsApi.get("/");
  return data;
};

export const updateSettingsService = async (payload) => {
  const { data } = await settingsApi.put("/", payload);
  return data;
};

// ── Password change ───────────────────────────────────────────────────────────

export const changePasswordService = async ({ currentPassword, newPassword }) => {
  const { data } = await settingsApi.post("/change-password", {
    currentPassword,
    newPassword,
  });
  return data;
};

// ── Email change — OTP flow ───────────────────────────────────────────────────
// Step 1: send 6-digit OTP to the new email address
export const sendEmailOtpService = async ({ newEmail }) => {
  const { data } = await settingsApi.post("/email/send-otp", { newEmail });
  return data;
};

// Step 2: verify OTP → backend updates email and returns confirmed address
export const verifyEmailOtpService = async ({ newEmail, otp }) => {
  const { data } = await settingsApi.post("/email/verify-otp", { newEmail, otp });
  return data; // { email: confirmedEmail }
};

// ── Account deletion ──────────────────────────────────────────────────────────

export const deleteAccountService = async ({ password }) => {
  const { data } = await settingsApi.delete("/account", { data: { password } });
  return data;
};

// ── Avatar upload ─────────────────────────────────────────────────────────────

export const uploadAvatarService = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  const { data } = await settingsApi.post("/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data; // { avatarUrl: '...' }
};