
import sendMail from "../../utils/mailer.js";
import {
  fetchUserSettings,
  updateUserSettings,
  changeUserPassword,
  createEmailChangeOtp,
  verifyEmailChangeOtp,
  updateUserAvatar,
  deleteUserAccount,
} from "./settings_Services.js";


const getUserId = (req) => req.user?._id || req.user?.id;

// ── GET /settings ─────────────────────────────────────────────────────────────
export const getSettings = async (req, res) => {
  try {
    const settings = await fetchUserSettings(getUserId(req));
    res.status(200).json({ success: true, settings });
  } catch (err) {
    console.error("getSettings:", err);
    res.status(500).json({ success: false, message: "Server error while fetching settings" });
  }
};

// ── PUT /settings ─────────────────────────────────────────────────────────────
export const updateSettings = async (req, res) => {
  try {
    const settings = await updateUserSettings(getUserId(req), req.body);
    res.status(200).json({ success: true, settings });
  } catch (err) {
    console.error("updateSettings:", err);
    res.status(500).json({ success: false, message: "Server error while updating settings" });
  }
};

// ── POST /settings/change-password ───────────────────────────────────────────
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await changeUserPassword(getUserId(req), currentPassword, newPassword);
    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("changePassword:", err);
    const status = err.status || 500;
    res.status(status).json({ success: false, message: err.message });
  }
};

// ── POST /settings/email/send-otp ─────────────────────────────────────────────
// Step 1: generate OTP and email it to the new address
export const sendEmailOtp = async (req, res) => {
  try {
    const { newEmail } = req.body;
    const { plainOtp, pendingEmail } = await createEmailChangeOtp(getUserId(req), newEmail);

    // Send OTP via email (swap sendEmailOtpMail with your transporter)
    await sendEmailOtpMail({
      to: pendingEmail,
      otp: plainOtp,
      subject: "Your email change verification code",
    });

    res.status(200).json({
      success: true,
      message: `OTP sent to ${pendingEmail}. Valid for 10 minutes.`,
    });
  } catch (err) {
    console.error("sendEmailOtp:", err);
    const status = err.status || 500;
    res.status(status).json({ success: false, message: err.message });
  }
};

// ── POST /settings/email/verify-otp ──────────────────────────────────────────
// Step 2: verify OTP and commit new email
export const verifyEmailOtp = async (req, res) => {
  try {
    const { newEmail, otp } = req.body;
    const confirmedEmail = await verifyEmailChangeOtp(getUserId(req), newEmail, otp);
    res.status(200).json({ success: true, email: confirmedEmail });
  } catch (err) {
    console.error("verifyEmailOtp:", err);
    const status = err.status || 500;
    res.status(status).json({ success: false, message: err.message });
  }
};

// ── POST /settings/avatar ────────────────────────────────────────────────────
// Expects req.file to be set by multer (or similar), already uploaded to S3/Cloudinary
// For a simpler setup, you can also accept a URL in req.body.avatarUrl
export const uploadAvatar = async (req, res) => {
  try {
    // If using multer + Cloudinary the URL comes from req.file.path or req.file.secure_url
    const avatarUrl = req.file?.path || req.file?.secure_url || req.body?.avatarUrl;

    if (!avatarUrl) {
      return res.status(400).json({ success: false, message: "No avatar file or URL provided" });
    }

    const url = await updateUserAvatar(getUserId(req), avatarUrl);
    res.status(200).json({ success: true, avatarUrl: url });
  } catch (err) {
    console.error("uploadAvatar:", err);
    res.status(500).json({ success: false, message: "Failed to update avatar" });
  }
};

// ── DELETE /settings/account ──────────────────────────────────────────────────
export const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;
    await deleteUserAccount(getUserId(req), password);
    res
      .clearCookie("auth_token")
      .status(200)
      .json({ success: true, message: "Account deleted permanently" });
  } catch (err) {
    console.error("deleteAccount:", err);
    const status = err.status || 500;
    res.status(status).json({ success: false, message: err.message });
  }
};