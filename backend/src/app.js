import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import authRouter from "./features/auth/auth_Routes.js";
import coverLetterRouter from "./features/coverLetter/coverLetter_Routes.js";
import appRouter from "./features/applications/app_Routes.js";
import resumeRouter from "./features/resume/resume_Routes.js";
import interviewRouter from "./features/interview/Interview_Routes.js";

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
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

export default app;