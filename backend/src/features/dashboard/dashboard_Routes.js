import { Router } from "express";
import { getDashboardSummary } from "./dashboard_Controller.js";
import { validateDashboardRequest } from "./dashboard_Middleware.js";
import { protect } from "../auth/auth_Middleware.js";

const router = Router();

// Protect all dashboard routes
router.use(protect);

// Apply our feature-specific middleware
router.use(validateDashboardRequest);

router.route("/summary").get(getDashboardSummary);

export default router;
