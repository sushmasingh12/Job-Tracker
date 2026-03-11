import User from "./auth_Model.js";
import * as authService from "./auth_Services.js";


export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(res, req.body);
    res.status(201).json({
      success: true,
      data: user,
      message: "Registration successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await authService.loginUser(res, req.body);

    return res.status(200).json({
      success: true,
      data: user,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    authService.logoutUser(res);
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("GetMe Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};