import mongoose from "mongoose"
const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ["pdf", "docx"],
      required: true,
    },
    fileSize: {
      type: Number, // bytes
    },
    parsedText: {
      type: String,
      required: true,
    },
    // Original file buffer — used to serve back the actual PDF/DOCX to frontend
    fileBuffer: {
      type: Buffer,
    },
    fileContentType: {
      type: String, // 'application/pdf' or 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    },
    // Original AI mapped structure representing user's exact uploaded resume content
    originalStructuredContent: {
      basics: mongoose.Schema.Types.Mixed,
      sectionOrder: [String],
      sections: mongoose.Schema.Types.Mixed,
    },
    // Last analysis result
    analysis: {
      atsScore: Number,
      matchedKeywords: [String],
      missingKeywords: [String],
      scoreBreakdown: {
        keywordsSkills: Number,
        formattingScore: Number,
        structureLayout: Number,
        contentQuality:Number,
      },
      suggestions: [String],
      strengths: [String],
      potentialScore: Number,
      jobTitle: String,
      analyzedAt: Date,
    },
    // Last optimized content
    optimizedContent: {
      sections: mongoose.Schema.Types.Mixed, // flexible structure from Gemini
      changesExplained: [String],
      newAtsScore: Number,
     
      createdAt: Date,
    },
  },
  { timestamps: true }
);


resumeSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.parsedText;
  return obj;
};

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;