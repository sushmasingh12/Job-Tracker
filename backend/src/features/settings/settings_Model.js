import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    profile: {
      fullName: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      jobTitle: { type: String, default: "" },
      links: {
        linkedin: { type: String, default: "" },
        github: { type: String, default: "" },
        portfolio: { type: String, default: "" },
      },
      avatar: { type: String, default: null },
    },
    account: {
      twoFactorEnabled: { type: Boolean, default: false },
      emailVerified: { type: Boolean, default: false },
      activeSessions: { type: Array, default: [] },
    },
    resume: {
      defaultResumeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume",
        default: null,
      },
      visibility: { type: String, default: "private" },
      parsingPreferences: {
        autoUpdate: { type: Boolean, default: true },
        extractSkills: { type: Boolean, default: true },
      },
    },
    preferences: {
      preferredRole: { type: String, default: "" },
      preferredLocation: { type: String, default: "" },
      workMode: { type: String, default: "remote" },
      employmentType: { type: String, default: "full-time" },
      salaryExpectation: { type: String, default: "" },
      defaultStatus: { type: String, default: "applied" },
    },
    notifications: {
      email: { type: Boolean, default: true },
      interviewReminders: { type: Boolean, default: true },
      followUpReminders: { type: Boolean, default: true },
      deadlineAlerts: { type: Boolean, default: true },
      inApp: { type: Boolean, default: true },
    },
    ai: {
      enableSuggestions: { type: Boolean, default: true },
      optimizationMode: { type: String, default: "balanced" },
      autoSaveOptimized: { type: Boolean, default: false },
      saveHistory: { type: Boolean, default: true },
    },
    appearance: {
      theme: { type: String, default: "light" },
      density: { type: String, default: "comfortable" },
      fontSize: { type: String, default: "md" },
    },
    privacy: {
      shareData: { type: Boolean, default: false },
      trackHistory: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
