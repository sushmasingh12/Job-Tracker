import { sendEmailOtpMail } from "../../utils/mailer.js";
import {
  fetchUserSettings,
  updateUserSettings,
  changeUserPassword,
  createEmailChangeOtp,
  verifyEmailChangeOtp,
  updateUserEmailDirectly,
  updateUserAvatar,
  deleteUserAccount,
} from "./settings_Services.js";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiError from "../../shared/utils/ApiError.js";

const getUserId = (req) => req.user?._id || req.user?.id;

// ── GET /settings ─────────────────────────────────────────────────────────────
export const getSettings = asyncHandler(async (req, res) => {
  const settings = await fetchUserSettings(getUserId(req));
  res.status(200).json({
    success: true,
    message: "Settings fetched successfully",
    data: settings,
  });
});

// ── PUT /settings ─────────────────────────────────────────────────────────────
export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await updateUserSettings(getUserId(req), req.body);
  res.status(200).json({
    success: true,
    message: "Settings updated successfully",
    data: settings,
  });
});

// ── POST /settings/change-password ───────────────────────────────────────────
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await changeUserPassword(getUserId(req), currentPassword, newPassword);
  res.status(200).json({
    success: true,
    message: "Password updated successfully",
    data: {},
  });
});

// ── POST /settings/email/send-otp ─────────────────────────────────────────────
export const sendEmailOtp = asyncHandler(async (req, res) => {
  const { newEmail } = req.body;
  const { plainOtp, pendingEmail } = await createEmailChangeOtp(getUserId(req), newEmail);

  await sendEmailOtpMail({
    to: pendingEmail,
    otp: plainOtp,
    subject: "Your email change verification code",
  });

  res.status(200).json({
    success: true,
    message: `OTP sent to ${pendingEmail}. Valid for 10 minutes.`,
    data: { pendingEmail },
  });
});

// ── POST /settings/email/verify-otp ──────────────────────────────────────────
export const verifyEmailOtp = asyncHandler(async (req, res) => {
  const { newEmail, otp } = req.body;
  const confirmedEmail = await verifyEmailChangeOtp(getUserId(req), newEmail, otp);
  res.status(200).json({
    success: true,
    message: "Email verified and updated successfully",
    data: { email: confirmedEmail },
  });
});

// ── POST /settings/email/direct-change ───────────────────────────────────────
export const directChangeEmail = asyncHandler(async (req, res) => {
  const { newEmail } = req.body;
  const confirmedEmail = await updateUserEmailDirectly(getUserId(req), newEmail);
  res.status(200).json({
    success: true,
    message: "Email updated successfully",
    data: { email: confirmedEmail },
  });
});

// ── POST /settings/avatar ────────────────────────────────────────────────────
export const uploadAvatar = asyncHandler(async (req, res) => {
  const avatarUrl = req.file?.path || req.file?.secure_url || req.body?.avatarUrl;

  if (!avatarUrl) {
    throw new ApiError(400, "No avatar file or URL provided");
  }

  const url = await updateUserAvatar(getUserId(req), avatarUrl);
  res.status(200).json({
    success: true,
    message: "Avatar updated successfully",
    data: { avatarUrl: url },
  });
});

// ── DELETE /settings/account ──────────────────────────────────────────────────
export const deleteAccount = asyncHandler(async (req, res) => {
  const { password } = req.body;
  await deleteUserAccount(getUserId(req), password);
  res
    .clearCookie("auth_token")
    .status(200)
    .json({
      success: true,
      message: "Account deleted permanently",
      data: {},
    });
});