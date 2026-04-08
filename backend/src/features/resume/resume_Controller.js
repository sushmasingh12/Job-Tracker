import path from "path";
import Resume from "./resume_Model.js";
import parseResume from "./resume_Parser.js";
import {
  extractStructuredResume,
  analyzeResumeVsJob,
  optimizeResumeContent,
} from "./resume_Services.js";

export const RESUME_TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean layout with strong hierarchy and ATS-friendly spacing.",
    badge: "Recommended",
    category: "ATS Friendly",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional professional structure for corporate roles.",
    badge: "Professional",
    category: "Corporate",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and lightweight design focused on readability.",
    badge: "Simple",
    category: "Clean",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Premium layout for senior and leadership positions.",
    badge: "Premium",
    category: "Leadership",
  },
  {
    id: "compact",
    name: "Compact",
    description: "Space-efficient template ideal for 1-page resumes.",
    badge: "1 Page",
    category: "Concise",
  },
];

export const getResumeTemplates = async (req, res) => {
  try {
    res.json({
      success: true,
      count: RESUME_TEMPLATES.length,
      templates: RESUME_TEMPLATES,
      defaultTemplate: "modern",
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to fetch templates" });
  }
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const ext = path.extname(req.file.originalname).toLowerCase().replace(".", "");

    const parsedText = await parseResume(req.file.buffer, req.file.originalname);

    let originalStructuredContent = null;
    try {
      originalStructuredContent = await extractStructuredResume(parsedText);
    } catch (err) {
      throw new Error("Failed to extract structured resume: " + err.message);
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

    res.status(201).json(resume.toSafeObject());
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: err.message || "Upload failed" });
  }
};

export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id })
      .select("-parsedText -fileBuffer")
      .sort({ createdAt: -1 });

    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const analyzeResume = async (req, res) => {
  try {
    const { resumeId, jobDescription, jobTitle } = req.body;

    if (!resumeId || !jobDescription?.trim()) {
      return res.status(400).json({
        message: "resumeId and jobDescription are required",
      });
    }

    const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const analysis = await analyzeResumeVsJob(resume.parsedText, jobDescription);

    resume.analysis = {
      ...analysis,
      jobTitle: jobTitle || "",
      analyzedAt: new Date(),
    };
    await resume.save();

    res.json({
      resumeId: resume._id,
      originalName: resume.originalName,
      jobTitle: jobTitle || "",
      ...analysis,
    });
  } catch (err) {
    console.error("Analyze error:", err);
    res.status(500).json({ message: err.message || "Analysis failed" });
  }
};

export const optimizeResume = async (req, res) => {
  try {
    const { resumeId, jobDescription, template } = req.body;

    if (!resumeId || !jobDescription?.trim()) {
      return res.status(400).json({
        message: "resumeId and jobDescription are required",
      });
    }

    const selectedTemplate = template || "modern";
    const templateMeta =
      RESUME_TEMPLATES.find((item) => item.id === selectedTemplate) ||
      RESUME_TEMPLATES[0];

    const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const optimized = await optimizeResumeContent(
      resume.originalStructuredContent,
      jobDescription,
      selectedTemplate
    );

    resume.optimizedContent = {
      sections: optimized.optimizedSections,
      changesExplained: optimized.changesExplained,
      newAtsScore: optimized.newAtsScore,
      template: selectedTemplate,
      createdAt: new Date(),
    };
    await resume.save();

    res.json({
      success: true,
      resumeId: resume._id,
      template: selectedTemplate,
      templateMeta,
      optimizedSections: optimized.optimizedSections,
      changesExplained: optimized.changesExplained || [],
      newAtsScore: optimized.newAtsScore || 0,
    });
  } catch (err) {
    console.error("Optimize error:", err);
    res.status(500).json({ message: err.message || "Optimization failed" });
  }
};

export const downloadResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { format = "pdf" } = req.query;

    const resume = await Resume.findOne({ _id: id, user: req.user._id });
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    if (!resume.optimizedContent?.sections) {
      return res.status(400).json({
        message: "No optimized version found. Please optimize first.",
      });
    }

    res.json({
      format,
      sections: resume.optimizedContent.sections,
      template: resume.optimizedContent.template,
      filename: resume.originalName.replace(/\.[^.]+$/, ""),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getResumeFile = async (req, res) => {
  try {
    const resume = await Resume.findOne(
      { _id: req.params.id, user: req.user._id },
      { fileBuffer: 1, fileContentType: 1, originalName: 1 }
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (!resume.fileBuffer) {
      return res.status(404).json({
        message: "Original file not stored. Re-upload the resume to enable PDF preview.",
      });
    }

    res.set("Content-Type", resume.fileContentType || "application/pdf");
    res.set("Content-Disposition", `inline; filename="${resume.originalName}"`);
    res.set("Cache-Control", "private, max-age=3600");
    res.send(resume.fileBuffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) return res.status(404).json({ message: "Resume not found" });

    res.json({ message: "Resume deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};