import express from "express";
import authRouter from "./features/auth/auth_Routes.js";

const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api/auth", authRouter);

export default app