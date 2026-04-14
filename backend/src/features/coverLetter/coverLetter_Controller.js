import CoverLetter from "./coverLetter_Model.js";
import Application from "../applications/app_Model.js";
import {
  generateCoverLetterService,
  generatePDFBuffer,
  generateDOCXBuffer,
} from "./coverLetter_Service.js";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiError from "../../shared/utils/ApiError.js";

export const generateCoverLetterController = asyncHandler(async (req, res) => {
  const { jobDetails, experience, tone, applicationId } = req.body;

  if (!jobDetails?.jobTitle || !jobDetails?.companyName) {
    throw new ApiError(400, "jobTitle and companyName are required.");
  }

  if (!jobDetails?.jobDescription || jobDetails.jobDescription.trim().length < 50) {
    throw new ApiError(400, "jobDescription must be at least 50 characters.");
  }

  const letter = await generateCoverLetterService({ jobDetails, experience, tone });

  const savedDoc = await CoverLetter.findOneAndUpdate(
    applicationId
      ? { user: req.user._id, application: applicationId }
      : { user: req.user._id },
    {
      user: req.user._id,
      application: applicationId || null,
      jobDetails,
      experience,
      tone: tone || "professional",
      generatedLetter: letter,
    },
    { upsert: true, new: true, sort: { createdAt: -1 } }
  );

  res.status(200).json({
    success: true,
    message: "Cover letter generated successfully",
    data: {
      letter,
      letterId: savedDoc._id,
    },
  });
});

export const saveCoverLetterController = asyncHandler(async (req, res) => {
  const { content, letterId, applicationId } = req.body;

  if (!content || content.trim().length === 0) {
    throw new ApiError(400, "Letter content is required.");
  }

  let saved;

  if (letterId) {
    saved = await CoverLetter.findOneAndUpdate(
      { _id: letterId, user: req.user._id },
      {
        generatedLetter: content,
        ...(applicationId ? { application: applicationId } : {}),
      },
      { new: true }
    );
  } else {
    saved = await CoverLetter.findOneAndUpdate(
      applicationId
        ? { user: req.user._id, application: applicationId }
        : { user: req.user._id },
      {
        generatedLetter: content,
        ...(applicationId ? { application: applicationId } : {}),
      },
      { upsert: true, new: true, sort: { createdAt: -1 } }
    );
  }

  if (!saved) {
    throw new ApiError(404, "Cover letter not found.");
  }

  if (applicationId) {
    await Application.findOneAndUpdate(
      { _id: applicationId, user: req.user._id },
      {
        $set: {
          "coverLetter.content": content,
          "coverLetter.generatedAt": new Date(),
        },
      }
    );
  }

  res.status(200).json({
    success: true,
    message: "Cover letter saved.",
    data: { id: saved._id },
  });
});

export const downloadCoverLetterController = asyncHandler(async (req, res) => {
  const { format = "pdf" } = req.query;

  const content = req.coverLetter?.generatedLetter || req.body?.content || "";

  if (!content.trim()) {
    throw new ApiError(400, "No cover letter content available for download.");
  }

  if (format === "docx") {
    const buffer = await generateDOCXBuffer(content);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="cover-letter.docx"'
    );

    return res.send(buffer);
  }

  const buffer = await generatePDFBuffer(content);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="cover-letter.pdf"'
  );

  return res.send(buffer);
});

export const getCoverLetterByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const letter = await CoverLetter.findOne({
    _id: id,
    user: req.user._id,
  });

  if (!letter) {
    throw new ApiError(404, "Cover letter not found.");
  }

  res.status(200).json({
    success: true,
    message: "Cover letter fetched successfully",
    data: letter,
  });
});