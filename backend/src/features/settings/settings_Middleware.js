import mongoose from "mongoose";

// ── Generic: reject empty body ────────────────────────────────────────────────
export const validateSettingsPayload = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ success: false, message: "Request body cannot be empty." });
  }
  next();
};

// ── POST /change-password ────────────────────────────────────────────────────
export const validatePasswordChange = (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword?.trim()) {
    return res.status(400).json({ success: false, message: "Current password is required." });
  }

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: "New password must be at least 8 characters.",
    });
  }

  if (currentPassword === newPassword) {
    return res.status(400).json({
      success: false,
      message: "New password must be different from the current password.",
    });
  }

  next();
};

// ── POST /email/send-otp ──────────────────────────────────────────────────────
export const validateSendEmailOtp = (req, res, next) => {
  const { newEmail } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!newEmail?.trim()) {
    return res.status(400).json({ success: false, message: "New email address is required." });
  }

  if (!emailRegex.test(newEmail.trim())) {
    return res.status(400).json({ success: false, message: "Invalid email format." });
  }

  next();
};

// ── POST /email/verify-otp ────────────────────────────────────────────────────
export const validateVerifyEmailOtp = (req, res, next) => {
  const { newEmail, otp } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!newEmail?.trim() || !emailRegex.test(newEmail.trim())) {
    return res.status(400).json({ success: false, message: "Valid new email is required." });
  }

  if (!otp || !/^\d{6}$/.test(String(otp).trim())) {
    return res.status(400).json({ success: false, message: "OTP must be a 6-digit number." });
  }

  next();
};

// ── POST /avatar ──────────────────────────────────────────────────────────────
export const validateAvatarUpload = (req, res, next) => {
  // If using multer this will be set by the upload middleware before this runs.
  // We also allow passing a URL in body for flexibility.
  if (!req.file && !req.body?.avatarUrl?.trim()) {
    return res.status(400).json({ success: false, message: "Avatar file or URL is required." });
  }
  next();
};

// ── DELETE /account ───────────────────────────────────────────────────────────
export const validateDeleteAccount = (req, res, next) => {
  const { password } = req.body;

  if (!password?.trim()) {
    return res.status(400).json({ success: false, message: "Password is required to delete account." });
  }

  next();
};