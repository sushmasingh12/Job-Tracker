import mongoose from "mongoose";
import * as appService from "./app_Services.js";

import { generatePDFBuffer, generateDOCXBuffer } from "../coverLetter/coverLetter_Service.js";


const getUserId = (req) => req.user?._id || req.user?.id;

export const getAllApplications = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(getUserId(req));
    const { applications, total, stats } = await appService.getApplications(
      userId,
      req.query
    );

    res.status(200).json({
      success: true,
      count: applications.length,
      total,
      stats,
      data: applications,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getApplication = async (req, res) => {
  try {
    const application = await appService.getApplicationById(
      new mongoose.Types.ObjectId(getUserId(req)),
      req.params.id
    );

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application nahi mili" });
    }

    res.status(200).json({ success: true, data: application });
  } catch (err) {
    if (err.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid application ID" });
    }

    res.status(500).json({ success: false, message: err.message });
  }
};

export const createApplication = async (req, res) => {
  try {
    const application = await appService.createApplication(
      new mongoose.Types.ObjectId(getUserId(req)),
      req.body
    );

    res.status(201).json({ success: true, data: application });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ success: false, message: messages.join(", ") });
    }

    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const application = await appService.updateApplication(
      new mongoose.Types.ObjectId(getUserId(req)),
      req.params.id,
      req.body
    );

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application nahi mili" });
    }

    res.status(200).json({ success: true, data: application });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ success: false, message: messages.join(", ") });
    }

    if (err.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid application ID" });
    }

    res.status(500).json({ success: false, message: err.message });
  }
};

export const patchStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Status required hai" });
    }

    const application = await appService.updateStatus(
      new mongoose.Types.ObjectId(getUserId(req)),
      req.params.id,
      status
    );

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application nahi mili" });
    }

    res.status(200).json({ success: true, data: application });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ success: false, message: messages.join(", ") });
    }

    res.status(500).json({ success: false, message: err.message });
  }
};

export const saveCoverLetter = async (req, res) => {
  try {
    const { content } = req.body;
 
    if (!content?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Cover letter content required hai" });
    }
 
    const application = await appService.saveCoverLetter(
      new mongoose.Types.ObjectId(getUserId(req)),
      req.params.id,
      content
    );
 
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application nahi mili" });
    }
 
    res.status(200).json({ success: true, data: application });
  } catch (err) {
    if (err.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid application ID" });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

export const saveResume = async (req, res) => {
  try {
    const { content,  } = req.body;

    if (!content) {
      return res
        .status(400)
        .json({ success: false, message: "Resume content required hai" });
    }

    const application = await appService.saveResume(
      new mongoose.Types.ObjectId(getUserId(req)),
      req.params.id,
      { content,  }
    );

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application nahi mili" });
    }

    res.status(200).json({ success: true, data: application });
  } catch (err) {
    if (err.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid application ID" });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};


export const deleteApplication = async (req, res) => {
  try {
    const application = await appService.deleteApplication(
      new mongoose.Types.ObjectId(getUserId(req)),
      req.params.id
    );

    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application nahi mili" });
    }

    res
      .status(200)
      .json({ success: true, message: "Application delete ho gayi" });
  } catch (err) {
    if (err.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid application ID" });
    }

    res.status(500).json({ success: false, message: err.message });
  }
};



export const downloadApplicationMaterial = async (req, res) => {
  try {
    const application = await appService.getApplicationById(
      new mongoose.Types.ObjectId(getUserId(req)),
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application nahi mili",
      });
    }

    const { type } = req.params;
    const format = req.query.format === "docx" ? "docx" : "pdf";

    let content = "";
    let filename = "document";

    if (type === "cover-letter") {
      content = application.coverLetter?.content || "";
      filename = "cover-letter";
    } else if (type === "resume") {
      content =
        application.resumeText ||
        application.resumeSummary ||
        "Resume content not available.";
      filename = "resume";
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid download type",
      });
    }

    if (!content.trim()) {
      return res.status(400).json({
        success: false,
        message: `${type} content available nahi hai`,
      });
    }

    if (format === "pdf") {
      const buffer = await generatePDFBuffer(content);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}.pdf"`
      );
      return res.send(buffer);
    }

    const buffer = await generateDOCXBuffer(content);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}.docx"`
    );
    return res.send(buffer);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};