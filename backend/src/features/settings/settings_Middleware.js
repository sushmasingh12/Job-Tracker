export const validateSettingsPayload = (req, res, next) => {
  if (req.body && Object.keys(req.body).length === 0) {
    return res.status(400).json({ success: false, message: "Settings payload cannot be empty." });
  }
  next();
};
