import User from "./auth_Model.js";
import * as authService from "./auth_Services.js";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiError from "../../shared/utils/ApiError.js";

export const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(res, req.body);
  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const user = await authService.loginUser(res, req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: user,
  });
});

export const logout = asyncHandler(async (req, res) => {
  authService.logoutUser(res);
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
    data: {},
  });
});

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