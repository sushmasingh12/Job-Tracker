import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import authRouter from "./features/auth/auth_Routes.js";
import coverLetterRouter from "./features/coverLetter/coverLetter_Routes.js";
import appRouter from "./features/applications/app_Routes.js";
import resumeRouter from "./features/resume/resume_Routes.js";
import interviewRouter from "./features/interview/Interview_Routes.js";
import settingsRouter from "./features/settings/settings_Routes.js";
import dashboardRouter from "./features/dashboard/dashboard_Routes.js";
import notFound from "./shared/middleware/notFound.js";
import errorHandler from "./shared/middleware/errorHandler.js";

const app = express();

// Security & Utility Middleware
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(",").map(url => url.trim()) 
  : [];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

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

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
  });
});
// Centralized Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
