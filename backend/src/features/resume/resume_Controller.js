import path from "path";
import Resume from "./resume_Model.js";
import parseResume from "./resume_Parser.js";
import {
  extractStructuredResume,
  analyzeResumeVsJob,
  optimizeResumeContent,
} from "./resume_Services.js";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiError from "../../shared/utils/ApiError.js";

export const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }

  const ext = path.extname(req.file.originalname).toLowerCase().replace(".", "");

  const parsedText = await parseResume(req.file.buffer, req.file.originalname);

  let originalStructuredContent = null;
  try {
    originalStructuredContent = await extractStructuredResume(parsedText);
  } catch (err) {
    throw new ApiError(500, "Failed to extract structured resume: " + err.message);
  }

  const resume = await Resume.create({
    user: req.user._id,
    originalName: req.file.originalname,
    fileType: ext,
    fileSize: req.file.size,
    parsedText,
    originalStructuredContent,
    fileBuffer: req.file.buffer,
    fileContentType: req.file.mimetype,
  });

  res.status(201).json({
    success: true,
    message: "Resume uploaded successfully",
    data: resume.toSafeObject(),
  });
});

export const getUserResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id })
    .select("-parsedText -fileBuffer")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Resumes fetched successfully",
    data: resumes,
  });
});

export const analyzeResume = asyncHandler(async (req, res) => {
  const { resumeId, jobDescription, jobTitle } = req.body;

  if (!resumeId || !jobDescription?.trim()) {
    throw new ApiError(400, "resumeId and jobDescription are required");
  }

  const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });
  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  const analysis = await analyzeResumeVsJob(resume.parsedText, jobDescription);

  resume.analysis = {
    ...analysis,
    jobTitle: jobTitle || "",
    analyzedAt: new Date(),
  };
  await resume.save();

  res.status(200).json({
    success: true,
    message: "Resume analyzed successfully",
    data: {
      resumeId: resume._id,
      originalName: resume.originalName,
      jobTitle: jobTitle || "",
      ...analysis,
    },
  });
});

export const optimizeResume = asyncHandler(async (req, res) => {
  const { resumeId, jobDescription } = req.body;

  if (!resumeId || !jobDescription?.trim()) {
    throw new ApiError(400, "resumeId and jobDescription are required");
  }

  const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });
  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  const optimized = await optimizeResumeContent(
    resume.originalStructuredContent,
    jobDescription
  );

  resume.optimizedContent = {
    sections: optimized.optimizedSections,
    changesExplained: optimized.changesExplained,
    newAtsScore: optimized.newAtsScore,
    createdAt: new Date(),
  };
  await resume.save();

  res.status(200).json({
    success: true,
    message: "Resume optimized successfully",
    data: {
      resumeId: resume._id,
      optimizedSections: optimized.optimizedSections,
      changesExplained: optimized.changesExplained || [],
      newAtsScore: optimized.newAtsScore || 0,
    },
  });
});

export const downloadResume = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { format = "pdf" } = req.query;

  const resume = await Resume.findOne({ _id: id, user: req.user._id });
  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  if (!resume.optimizedContent?.sections) {
    throw new ApiError(400, "No optimized version found. Please optimize first.");
  }

  res.status(200).json({
    success: true,
    message: "Resume ready for download",
    data: {
      format,
      sections: resume.optimizedContent.sections,
      filename: resume.originalName.replace(/\.[^.]+$/, ""),
    },
  });
});

export const getResumeFile = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne(
    { _id: req.params.id, user: req.user._id },
    { fileBuffer: 1, fileContentType: 1, originalName: 1 }
  );

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  if (!resume.fileBuffer) {
    throw new ApiError(404, "Original file not stored. Re-upload the resume to enable PDF preview.");
  }

  res.set("Content-Type", resume.fileContentType || "application/pdf");
  res.set("Content-Disposition", `inline; filename="${resume.originalName}"`);
  res.set("Cache-Control", "private, max-age=3600");
  res.send(resume.fileBuffer);
});

export const deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!resume) {
    throw new ApiError(404, "Resume not found");
  }

  res.status(200).json({
    success: true,
    message: "Resume deleted successfully",
    data: {},
  });
});