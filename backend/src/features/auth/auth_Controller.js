import User from "./auth_Model.js";
import * as authService from "./auth_Services.js";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiError from "../../shared/utils/ApiError.js";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ── Register ──────────────────────────────────────────────────────────────

export const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(res, req.body);
  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: user,
  });
});

// ── Login ─────────────────────────────────────────────────────────────────

export const login = asyncHandler(async (req, res) => {
  const user = await authService.loginUser(res, req.body);
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: user,
  });
});

// ── Logout ────────────────────────────────────────────────────────────────

export const logout = asyncHandler(async (req, res) => {
  authService.logoutUser(res);
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
    data: {},
  });
});

// ── Get Me ────────────────────────────────────────────────────────────────

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
  });
});

// ── Google OAuth Callback ─────────────────────────────────────────────────

export const googleCallback = asyncHandler(async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    throw new ApiError(400, "Google credential is required");
  }

  // Google ka ID token verify karo
  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new ApiError(401, "Invalid Google token");
  }

  const {
    sub: googleId,
    email,
    given_name: firstname,
    family_name: lastname,
  } = payload;

  const user = await authService.googleAuthUser(res, {
    googleId,
    email,
    firstname: firstname || email.split("@")[0], // fallback agar name na ho
    lastname: lastname || "",
  });

  res.status(200).json({
    success: true,
    message: "Google login successful",
    data: user,
  });
});