import express from "express";
import rateLimit from "express-rate-limit";
import { register, login, logout, getMe, googleCallback } from "./auth_Controller.js";
import { protect } from "./auth_Middleware.js";

const router = express.Router();

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.get("/me", protect, getMe);
router.post("/google", authLimiter, googleCallback);  // Google OAuth route

export default router;