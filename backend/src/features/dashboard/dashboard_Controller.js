import dashboardService from "./dashboard_Service.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const dashboardData = await dashboardService.getDashboardData(userId);

    res.status(200).json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error("Dashboard Summary Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
