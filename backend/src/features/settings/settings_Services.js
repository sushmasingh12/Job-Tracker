import crypto from "crypto";
import bcrypt from "bcryptjs";
import Settings from "./settings_Model.js";
import User from "../auth/auth_Model.js";

// ── Keys allowed for bulk update (PATCH /settings) ───────────────────────────
const ALLOWED_KEYS = ["profile", "account", "notifications", "privacy"];

// ─────────────────────────────────────────────────────────────────────────────
// Helper: deep-merge two objects one level down (handles nested like profile.links)
// ─────────────────────────────────────────────────────────────────────────────
const deepMergeSection = (target, incoming) => {
  for (const key of Object.keys(incoming)) {
    const val = incoming[key];
    if (
      val !== null &&
      typeof val === "object" &&
      !Array.isArray(val) &&
      typeof target[key] === "object" &&
      target[key] !== null
    ) {
      // one level deeper (e.g. profile.links)
      Object.assign(target[key], val);
    } else {
      target[key] = val;
    }
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Fetch settings (create with defaults if not found)
// ─────────────────────────────────────────────────────────────────────────────
export const fetchUserSettings = async (userId) => {
  let settings = await Settings.findOne({ user: userId }).select("-pendingEmailChange");
  const user = await User.findById(userId);

  if (!settings) {
    settings = new Settings({ user: userId });
  }

  let modified = false;

  // Seed from auth user on first load
  if (user) {
    if (!settings.profile.fullName && (user.firstname || user.lastname)) {
      settings.profile.fullName = `${user.firstname || ""} ${user.lastname || ""}`.trim();
      modified = true;
    }
    if (!settings.profile.email && user.email) {
      settings.profile.email = user.email;
      modified = true;
    }
    if (!settings.account.emailVerified && user.isEmailVerified) {
      settings.account.emailVerified = user.isEmailVerified;
      modified = true;
    }
  }

  if (modified || settings.isNew) await settings.save();

  return settings;
};

// ─────────────────────────────────────────────────────────────────────────────
// Bulk update settings (profile, notifications, privacy, account)
// ─────────────────────────────────────────────────────────────────────────────
export const updateUserSettings = async (userId, data) => {
  let settings = await Settings.findOne({ user: userId });
  if (!settings) settings = new Settings({ user: userId });

  for (const key of ALLOWED_KEYS) {
    if (data[key] !== undefined) {
      deepMergeSection(settings[key], data[key]);
      settings.markModified(key);
    }
  }

  await settings.save();
  return settings;
};

// ─────────────────────────────────────────────────────────────────────────────
// Change password
// ─────────────────────────────────────────────────────────────────────────────
export const changeUserPassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch)
    throw Object.assign(new Error("Current password is incorrect"), { status: 400 });

  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();
};

// ─────────────────────────────────────────────────────────────────────────────
// Email change — Step 1: generate & store OTP, return it for sending via email
// In production the caller (controller) sends the OTP via your email provider.
// ─────────────────────────────────────────────────────────────────────────────
export const createEmailChangeOtp = async (userId, newEmail) => {
  // Check uniqueness across Users and Settings
  const [existingUser, existingSettings] = await Promise.all([
    User.findOne({ email: newEmail.toLowerCase() }),
    Settings.findOne({ "profile.email": newEmail.toLowerCase(), user: { $ne: userId } }),
  ]);

  if (existingUser || existingSettings)
    throw Object.assign(new Error("Email is already in use"), { status: 409 });

  // Generate a 6-digit OTP
  const plainOtp = String(Math.floor(100000 + Math.random() * 900000));
  const hashedOtp = await bcrypt.hash(plainOtp, 10);

  const settings = await Settings.findOneAndUpdate(
    { user: userId },
    {
      pendingEmailChange: {
        newEmail: newEmail.toLowerCase(),
        otp: hashedOtp,
        otpExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 min
      },
    },
    { upsert: true, new: true }
  );

  // Return plain OTP so the controller can email it
  return { plainOtp, pendingEmail: newEmail };
};

// ─────────────────────────────────────────────────────────────────────────────
// Email change — Step 2: verify OTP & commit new email
// ─────────────────────────────────────────────────────────────────────────────
export const verifyEmailChangeOtp = async (userId, newEmail, otp) => {
  const settings = await Settings.findOne({ user: userId });
  if (!settings) throw Object.assign(new Error("Settings not found"), { status: 404 });

  const pending = settings.pendingEmailChange;

  if (!pending?.otp || !pending?.otpExpires)
    throw Object.assign(new Error("No pending email change found"), { status: 400 });

  if (pending.newEmail !== newEmail.toLowerCase())
    throw Object.assign(new Error("Email mismatch"), { status: 400 });

  if (new Date() > pending.otpExpires)
    throw Object.assign(new Error("OTP has expired. Please request a new one."), { status: 400 });

  const isMatch = await bcrypt.compare(otp, pending.otp);
  if (!isMatch)
    throw Object.assign(new Error("Invalid OTP"), { status: 400 });

  // Commit: update settings + auth user
  settings.profile.email = newEmail.toLowerCase();
  settings.pendingEmailChange = { newEmail: null, otp: null, otpExpires: null };
  settings.markModified("profile");
  settings.markModified("pendingEmailChange");
  await settings.save();

  await User.findByIdAndUpdate(userId, { email: newEmail.toLowerCase() });

  return newEmail.toLowerCase();
};

// ─────────────────────────────────────────────────────────────────────────────
// Update avatar URL (after file upload to S3/Cloudinary)
// ─────────────────────────────────────────────────────────────────────────────
export const updateUserAvatar = async (userId, avatarUrl) => {
  const settings = await Settings.findOneAndUpdate(
    { user: userId },
    { $set: { "profile.avatar": avatarUrl } },
    { new: true, upsert: true }
  );
  return settings.profile.avatar;
};

// ─────────────────────────────────────────────────────────────────────────────
// Delete account (hard delete: user + settings)
// ─────────────────────────────────────────────────────────────────────────────
export const deleteUserAccount = async (userId, password) => {
  const user = await User.findById(userId).select("+password");
  if (!user) throw Object.assign(new Error("User not found"), { status: 404 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    throw Object.assign(new Error("Password is incorrect"), { status: 401 });

  await Promise.all([
    User.findByIdAndDelete(userId),
    Settings.findOneAndDelete({ user: userId }),
  ]);
};