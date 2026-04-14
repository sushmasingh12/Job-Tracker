
export const validateDashboardRequest = (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }
  next();
};
