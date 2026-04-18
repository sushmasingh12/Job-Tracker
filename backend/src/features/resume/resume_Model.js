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
    fileBuffer: {
      type: Buffer,
    },
    fileContentType: {
      type: String,
    },
   
    originalStructuredContent: {
      basics: mongoose.Schema.Types.Mixed,
      sectionOrder: [String],
      sections: mongoose.Schema.Types.Mixed,
    },
    
    analysis: {
      atsScore: Number,
      matchedKeywords: [String],
      missingKeywords: [String],
      scoreBreakdown: {
        relevance: {
          score: Number,
          tips: [String],
        },
        sectionQuality: {
          score: Number,
          tips: [String],
        },
        contentStrength: {
          score: Number,
          tips: [String],
        },
        experience: {
          score: Number,
          tips: [String],
        },
        projects: {
          score: Number,
          tips: [String],
        },
        skills: {
          score: Number,
          tips: [String],
        },
        formatting: {
          score: Number,
          tips: [String],
        },
        structure: {
          score: Number,
          tips: [String],
        },
        keywordMatch: {
          score: Number,
          tips: [String],
        },
      },
      suggestions: [String],
      strengths: [String],
      potentialScore: Number,
      jobTitle: String,
      analyzedAt: Date,
    },
    
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
  delete obj.fileBuffer;
  return obj;
};

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;