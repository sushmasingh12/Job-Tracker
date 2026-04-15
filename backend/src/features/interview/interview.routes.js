import { Router } from "express";
import { protect } from "../auth/auth_Middleware.js";

import {
  generateQuestions,
  saveAnswer,
  getAnswers,
  getInterviewHistory,
  setInterviewDate,
  deletePrep,
  getFeedback,
} from "./Interview_Controller.js";

import {
  validateGenerateQuestions,
  validateSaveAnswer,
  validateInterviewDate,
  validateJobIdParam,
  validateFeedbackRequest,
  rateLimitGenerateQuestions,
  interviewErrorHandler,
} from "./Interview_Middleware.js";

const router = Router();

router.use(protect);

router.post(
  "/generate",
  rateLimitGenerateQuestions,
  validateGenerateQuestions,
  generateQuestions
);

router.post("/answers", validateSaveAnswer, saveAnswer);

router.post("/feedback", validateFeedbackRequest, getFeedback);

router.get("/answers/:jobId", validateJobIdParam, getAnswers);

router.put("/date", validateInterviewDate, setInterviewDate);

router.get("/history", getInterviewHistory);

router.delete("/:jobId", validateJobIdParam, deletePrep);

router.use(interviewErrorHandler);

export default router;