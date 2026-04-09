import { Router } from "express";
import {
  getAllApplications,
  getApplication,
  createApplication,
  updateApplication,
  patchStatus,
  saveCoverLetter,
  saveResume,
  deleteApplication,
  downloadApplicationMaterial,
} from "./app_Controller.js";
import {
  validateObjectId,
  validateCreateBody,
  validateStatus,
  sanitizeUpdateBody,
} from "./app_Middleware.js";
import { protect } from "../auth/auth_Middleware.js";

const router = Router();

router.use(protect);

router
  .route("/")
  .get(getAllApplications)
  .post(validateCreateBody, createApplication);

router
  .route("/:id")
  .get(validateObjectId, getApplication)
  .put(validateObjectId, sanitizeUpdateBody, updateApplication)
  .delete(validateObjectId, deleteApplication);

router.patch("/:id/status", validateObjectId, validateStatus, patchStatus);
router.patch("/:id/cover-letter", validateObjectId, saveCoverLetter);
router.patch("/:id/resume", validateObjectId, saveResume);
router.get("/:id/download/:type", validateObjectId, downloadApplicationMaterial);

export default router;