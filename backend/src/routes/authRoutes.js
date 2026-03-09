import express from "express";
import { register, login, getMe } from "../controller/authController.js";

const router = express.Router();

// Route: POST /api/auth/register
router.post("/register", register);

// Route: POST /api/auth/login
router.post("/login", login);

// Route: GET /api/auth/me
router.get("/me", getMe);

export default router;

