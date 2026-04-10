// Not strictly necessary yet, but implemented to fulfill requirement for "middleware" file
export const validateDashboardRequest = (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
    });
  }
  next();
};
