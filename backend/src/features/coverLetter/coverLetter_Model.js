import mongoose from "mongoose";

// ─── Sub-schemas ──────────────────────────────────────────────────────────────

const ExperienceEntrySchema = new mongoose.Schema(
  {
    title:       { type: String, trim: true},
    company:     { type: String, trim: true},
    duration:    { type: String, trim: true },
    achievement: { type: String, trim: true },
  },
  { _id: false }
);

const EducationSchema = new mongoose.Schema(
  {
    degree:         { type: String, trim: true },
    institution:    { type: String, trim: true },
    graduationYear: { type: String, trim: true },
    gpa:            { type: String, trim: true },
  },
  { _id: false }
);

const JobDetailsSchema = new mongoose.Schema(
  {
    jobTitle:          { type: String, trim: true, required: true },
    companyName:       { type: String, trim: true, required: true },
    location:          { type: String, trim: true },
    industry:          { type: String, trim: true },
    jobType: {
      type: String,
      trim: true,
      enum: ["full-time", "part-time", "internship", "contract","remote"],
      default: "full-time",
    },
    jobDescription:    { type: String, trim: true },
    hiringManagerName: { type: String, trim: true },
  },
  { _id: false }
);

// ─── Main Schema ──────────────────────────────────────────────────────────────

const CoverLetterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    jobDetails: {
      type: JobDetailsSchema,
      required: true,
      default: () => ({}),
    },

    experience: {
      experiences: {
        type: [ExperienceEntrySchema],
        default: [],
      },
      skills: {
        type: [String],
        default: [],
      },
      education: {
        type: EducationSchema,
        default: () => ({}),
      },
    },

    tone: {
      type: String,
      enum: ["professional", "enthusiastic", "conservative", "creative"],
      default: "professional",
      required: true,
    },

    // The actual generated letter
    generatedLetter: {
      type: String,
      default: "",
      required: true,
    },

    // Optional: link to a specific job application
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      default: null,
    },
  },
  { timestamps: true }
);

// ─── Index for fast user-level listing ───────────────────────────────────────
CoverLetterSchema.index({ user: 1, createdAt: -1 });

const CoverLetter = mongoose.model("CoverLetter", CoverLetterSchema);

export default CoverLetter;