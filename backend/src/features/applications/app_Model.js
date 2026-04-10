import mongoose from "mongoose";

const statusHistoryEntrySchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    date:  { type: Date, default: Date.now },
    icon:  { type: String, default: "circle" },
    color: { type: String, default: "bg-slate-400" },
  },
  { _id: false }
);

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      minlength: [2, "Job title must be at least 2 characters"],
      maxlength: [120, "Job title cannot exceed 120 characters"],
    },
    company: {
      type: String,
      trim: true,
      minlength: [2, "Company name must be at least 2 characters"],
      maxlength: [50, "Company name cannot exceed 50 characters"],
    },
    location: {
      type: String,
      trim: true,
      minlength: [2, "Location must be at least 2 characters"],
      maxlength: [50, "Location cannot exceed 50 characters"],
    },
    // ── NEW ──────────────────────────────────────────────────────────────────
    workType: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
      default: "On-site",
    },
    // ─────────────────────────────────────────────────────────────────────────
    applicationDate: {
      type: Date,
      required: [true, "Application date is required"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["Applied", "Interview", "Rejected", "Offer", "Hired"],
      trim: true,
    },
    salaryRange: {
      type: String,
      trim: true,
      maxlength: [50, "Salary range cannot exceed 50 characters"],
    },
    jobPostUrl: {
      type: String,
      trim: true,
    },
    jobDescription: {
      type: String,
      trim: true,
      maxlength: [5000, "Job description cannot exceed 5000 characters"],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },
    // ── NEW ──────────────────────────────────────────────────────────────────
    // Each status change gets logged here automatically by the service layer
    statusHistory: {
      type: [statusHistoryEntrySchema],
      default: [],
    },
    optimizedResume: {
      content: { type: Object },
      savedAt: { type: Date, default: Date.now },
    },
    // ─────────────────────────────────────────────────────────────────────────
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;