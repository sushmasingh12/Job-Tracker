import CoverLetter from "./coverLetter_Model.js";
import Application from "../applications/app_Model.js";
import {
  generateCoverLetterService,
  generatePDFBuffer,
  generateDOCXBuffer,
} from "./coverLetter_Service.js";

export const generateCoverLetterController = async (req, res) => {
  try {
    const { jobDetails, experience, tone, applicationId } = req.body;

    if (!jobDetails?.jobTitle || !jobDetails?.companyName) {
      return res.status(400).json({ message: "jobTitle and companyName are required." });
    }

    if (!jobDetails?.jobDescription || jobDetails.jobDescription.trim().length < 50) {
      return res.status(400).json({ message: "jobDescription must be at least 50 characters." });
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

    return res.status(200).json({
      letter,
      letterId: savedDoc._id,
    });
  } catch (err) {
    console.error("[CoverLetter] Generate error:", err.message);
    return res.status(500).json({ message: err.message || "Failed to generate cover letter." });
  }
};

export const saveCoverLetterController = async (req, res) => {
  try {
    const { content, letterId, applicationId } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: "Letter content is required." });
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
      return res.status(404).json({ message: "Cover letter not found." });
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

    return res.status(200).json({
      id: saved._id,
      message: "Cover letter saved.",
    });
  } catch (err) {
    console.error("[CoverLetter] Save error:", err.message);
    return res.status(500).json({ message: err.message || "Save failed." });
  }
};

export const downloadCoverLetterController = async (req, res) => {
  try {
    const { format = "pdf" } = req.query;

    const content = req.coverLetter?.generatedLetter || req.body?.content || "";

    if (!content.trim()) {
      return res.status(400).json({
        message: "No cover letter content available for download.",
      });
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
  } catch (error) {
    console.error("[CoverLetter] Download error:", error.message);
    return res.status(500).json({
      message: error.message || "Failed to download cover letter.",
    });
  }
};



export const getCoverLetterByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const letter = await CoverLetter.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!letter) {
      return res.status(404).json({
        message: "Cover letter not found.",
      });
    }

    return res.status(200).json(letter);
  } catch (error) {
    console.error("[CoverLetter] Get by id error:", error.message);
    return res.status(500).json({
      message: error.message || "Failed to fetch cover letter.",
    });
  }
};