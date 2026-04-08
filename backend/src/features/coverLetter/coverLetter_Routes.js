import express from "express";
import {
  generateCoverLetterController,
  saveCoverLetterController,
  downloadCoverLetterController,
  getCoverLetterByIdController,
} from "./coverLetter_Controller.js";
import { protect } from "../auth/auth_Middleware.js";

const router = express.Router();

router.post("/generate", protect, generateCoverLetterController);
router.post("/save", protect, saveCoverLetterController);
router.get("/:id", protect, getCoverLetterByIdController);
router.post("/download", protect, downloadCoverLetterController);

export default router;