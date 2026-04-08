import { Router } from "express";
import { protect } from "../auth/auth_Middleware.js";
const {
  generateQuestions,
  saveAnswer,
  getAnswers,
  setInterviewDate,
  deletePrep,
} = require('../controllers/interviewController');

const router = Router();
// All routes require authentication
router.use(protect);

// Generate AI questions for a job profile
// POST /api/interview/generate
router.post('/generate', generateQuestions);

// Save a user's answer for a question
// POST /api/interview/answers
router.post('/answers', saveAnswer);

// Get all saved answers + questions for a job
// GET /api/interview/answers/:jobId
router.get('/answers/:jobId', getAnswers);

// Set/update interview date for countdown
// PUT /api/interview/date
router.put('/date', setInterviewDate);

// Delete entire prep session for a job
// DELETE /api/interview/:jobId
router.delete('/:jobId', deletePrep);

module.exports = router;