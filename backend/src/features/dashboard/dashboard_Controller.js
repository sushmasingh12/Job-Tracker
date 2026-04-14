import dashboardService from "./dashboard_Service.js";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiError from "../../shared/utils/ApiError.js";

export const getDashboardSummary = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  const dashboardData = await dashboardService.getDashboardData(userId);

  res.status(200).json({
    success: true,
    message: "Dashboard summary fetched successfully",
    data: dashboardData,
  });
});

