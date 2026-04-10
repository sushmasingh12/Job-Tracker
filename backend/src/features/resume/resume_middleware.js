import mongoose from "mongoose";
import multer from "multer";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const validateResumeUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Resume file is required",
    });
  }

  next();
};

export const validateAnalyzeResume = (req, res, next) => {
  const { resumeId, jobDescription, jobTitle } = req.body;

  if (!resumeId || !jobDescription?.trim()) {
    return res.status(400).json({
      success: false,
      message: "resumeId and jobDescription are required",
    });
  }

  if (!isValidObjectId(resumeId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid resumeId",
    });
  }

  if (jobTitle && typeof jobTitle !== "string") {
    return res.status(400).json({
      success: false,
      message: "jobTitle must be a string",
    });
  }

  next();
};

export const validateOptimizeResume = (req, res, next) => {
  const { resumeId, jobDescription,  } = req.body;

 

  if (!resumeId || !jobDescription?.trim()) {
    return res.status(400).json({
      success: false,
      message: "resumeId and jobDescription are required",
    });
  }

  if (!isValidObjectId(resumeId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid resumeId",
    });
  }

  

  next();
};

export const validateResumeIdParam = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Resume id is required",
    });
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid resume id",
    });
  }

  next();
};

export const validateDownloadResume = (req, res, next) => {
  const { format = "pdf" } = req.query;
  const allowedFormats = ["pdf", "docx"];

  if (!allowedFormats.includes(String(format).toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: "Invalid format. Allowed values: pdf, docx",
    });
  }

  next();
};

export const handleResumeUploadError = (err, req, res, next) => {
  if (!err) return next();

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum allowed size is 10MB",
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message || "File upload error",
    });
  }

  return res.status(400).json({
    success: false,
    message: err.message || "Invalid file upload",
  });
};