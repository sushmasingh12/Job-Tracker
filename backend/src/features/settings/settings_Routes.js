import express from "express";
import { protect } from "../auth/auth_Middleware.js";
import {
  getSettings,
  updateSettings,
  changePassword,
  sendEmailOtp,
  verifyEmailOtp,
  uploadAvatar,
  deleteAccount,
} from "./settings_Controller.js";
import {
  validateSettingsPayload,
  validatePasswordChange,
  validateSendEmailOtp,
  validateVerifyEmailOtp,
  validateAvatarUpload,
  validateDeleteAccount,
} from "./settings_Middleware.js";

// Avatar upload middleware — swap with your multer/cloudinary setup.
// Example using multer-storage-cloudinary:
//   import { avatarUpload } from "../utils/cloudinaryUpload.js";
// For now we use a no-op so the route file is importable without the dependency.
import multer from "multer";
const avatarUpload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// All routes below require a valid JWT
router.use(protect);

// ── Core settings ─────────────────────────────────────────────────────────────
router.get("/",    getSettings);
router.put("/",    validateSettingsPayload, updateSettings);

// ── Password change ───────────────────────────────────────────────────────────
router.post("/change-password", validatePasswordChange, changePassword);

// ── Email change (2-step OTP flow) ───────────────────────────────────────────
router.post("/email/send-otp",   validateSendEmailOtp,   sendEmailOtp);
router.post("/email/verify-otp", validateVerifyEmailOtp, verifyEmailOtp);

// ── Avatar upload ─────────────────────────────────────────────────────────────
// avatarUpload.single("avatar") parses multipart/form-data
router.post("/avatar", avatarUpload.single("avatar"), validateAvatarUpload, uploadAvatar);

// ── Account deletion ──────────────────────────────────────────────────────────
router.delete("/account", validateDeleteAccount, deleteAccount);

export default router;