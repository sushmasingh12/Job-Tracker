import express from "express";
import { protect } from "../auth/auth_Middleware.js";
import { getSettings, updateSettings } from "./settings_Controller.js";
import { validateSettingsPayload } from "./settings_Middleware.js";

const router = express.Router();

router.get("/", protect, getSettings);
router.put("/", protect, validateSettingsPayload, updateSettings);

export default router;
