import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import authRouter from "./features/auth/auth_Routes.js";
import coverLetterRouter from "./features/coverLetter/coverLetter_Routes.js";
import appRouter from "./features/applications/app_Routes.js";
import resumeRouter from "./features/resume/resume_Routes.js";
import interviewRouter from "./features/interview/interview_Routes.js";
import settingsRouter from "./features/settings/settings_Routes.js";
import dashboardRouter from "./features/dashboard/dashboard_Routes.js";
import notFound from "./shared/middleware/notFound.js";
import errorHandler from "./shared/middleware/errorHandler.js";

const app = express();

// Security & Utility Middleware
app.use(helmet());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(",").map(url => url.trim()) 
  : [];

app.use(cors({
  origin: (origin, callback) => {
    // 1. Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const isDevelopment = process.env.NODE_ENV === "development";
    const isLocalhost = origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1");

    // 2. Allow if origin is in allowedOrigins or if it's a localhost request in development
    if (allowedOrigins.includes(origin) || (isDevelopment && isLocalhost)) {
      callback(null, true);
    } else {
      console.error(`[CORS Error] Origin "${origin}" is not allowed.`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// ── Rate Limiting ─────────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Increased for development: 500 requests per 15 mins
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Increased for development: 100 attempts per 15 mins
  message: {
    success: false,
    message: "Too many login/register attempts, please try again after 15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply global limiter to all routes
app.use("/api", globalLimiter);
// Apply stricter limit to auth routes
app.use("/api/auth", authLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
app.use("/api/auth", authRouter);
app.use("/api/coverLetter", coverLetterRouter);
app.use("/api/applications", appRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/dashboard", dashboardRouter);

// Centralized Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;