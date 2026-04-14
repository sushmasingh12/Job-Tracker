import { Router } from "express";
import { getDashboardSummary } from "./dashboard_Controller.js";
import { validateDashboardRequest } from "./dashboard_Middleware.js";
import { protect } from "../auth/auth_Middleware.js";

const router = Router();


router.use(protect);
router.use(validateDashboardRequest);
router.route("/summary").get(getDashboardSummary);

export default router;
