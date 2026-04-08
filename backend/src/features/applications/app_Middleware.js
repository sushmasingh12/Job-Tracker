import mongoose from "mongoose";

const VALID_STATUSES = ["Applied", "Interview", "Rejected", "Offer", "Hired"];
const VALID_WORK_TYPES = ["Remote", "Hybrid", "On-site"];

export const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid application ID" });
  }
  next();
};

export const validateCreateBody = (req, res, next) => {
  const { jobTitle,  applicationDate, status, jobDescription } = req.body;

  if (
    !jobTitle?.trim() ||
    !applicationDate ||
    !status ||
    !jobDescription?.trim()
  ) {
    return res.status(400).json({
      success: false,
      message:
        "jobTitle,  applicationDate, status, and jobDescription are required",
    });
  }

  if (Number.isNaN(new Date(applicationDate).getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid applicationDate format",
    });
  }

  if (req.body.workType && !VALID_WORK_TYPES.includes(req.body.workType)) {
    return res.status(400).json({
      success: false,
      message: `workType must be one of: ${VALID_WORK_TYPES.join(", ")}`,
    });
  }

  next();
};

export const validateStatus = (req, res, next) => {
  if (!req.body.status || !VALID_STATUSES.includes(req.body.status)) {
    return res.status(400).json({
      success: false,
      message: `Status must be one of: ${VALID_STATUSES.join(", ")}`,
    });
  }
  next();
};

export const sanitizeUpdateBody = (req, res, next) => {
  ["user", "createdAt", "updatedAt", "_id", "__v", "statusHistory"].forEach(
    (field) => delete req.body[field]
  );
  next();
};