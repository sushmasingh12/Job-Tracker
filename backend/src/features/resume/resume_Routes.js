import { Router } from "express";
import {
  uploadResume,
  getUserResumes,
  analyzeResume,
  optimizeResume,
  downloadResume,
  getResumeFile,
  deleteResume,
  
} from "./resume_Controller.js";
import { upload } from "./resume_upload.js";
import { protect } from "../auth/auth_Middleware.js";
import {
  validateResumeUpload,
  validateAnalyzeResume,
  validateOptimizeResume,
  validateResumeIdParam,
  validateDownloadResume,
  handleResumeUploadError,
} from "./resume_middleware.js";

const router = Router();

router.use(protect);



router.post(
  "/upload",
  upload.single("resume"),
  handleResumeUploadError,
  validateResumeUpload,
  uploadResume
);

router.get("/list", getUserResumes);
router.post("/analyze", validateAnalyzeResume, analyzeResume);
router.post("/optimize", validateOptimizeResume, optimizeResume);

router.get(
  "/download/:id",
  validateResumeIdParam,
  validateDownloadResume,
  downloadResume
);

router.get("/file/:id", validateResumeIdParam, getResumeFile);
router.delete("/:id", validateResumeIdParam, deleteResume);

export default router;