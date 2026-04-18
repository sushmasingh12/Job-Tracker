import jwt from "jsonwebtoken";
import User from "./auth_Model.js";

export const protect = async (req, res, next) => {
  const token = req.cookies?.auth_token;

  if (!token) {
    console.warn("[Auth Middleware] No token found in cookies");
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("[Auth Middleware] Token verified for userId:", decoded.userId);
    
    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      console.warn("[Auth Middleware] User not found for ID:", decoded.userId);
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    console.error("[Auth Middleware] JWT Verification Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
};