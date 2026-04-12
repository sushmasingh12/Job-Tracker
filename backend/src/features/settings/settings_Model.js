import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // ── Profile ──────────────────────────────────────────────────────────────
    profile: {
      fullName:        { type: String, default: "", trim: true },
      email:           { type: String, default: "", trim: true, lowercase: true },
      phone:           { type: String, default: "", trim: true },
      location:        { type: String, default: "", trim: true },
      jobTitle:        { type: String, default: "", trim: true },
      bio:             { type: String, default: "", trim: true, maxlength: 500 },
      avatar:          { type: String, default: null },

      // Job-search preferences
      openToWork:       { type: Boolean, default: true },
      experienceLevel:  { type: String, default: "mid", enum: ["entry", "mid", "senior", "lead", "executive"] },
      workMode:         { type: String, default: "remote", enum: ["remote", "hybrid", "onsite"] },
      employmentType:   { type: String, default: "full-time" },
      noticePeriod:     { type: String, default: "" },
      expectedSalary:   { type: String, default: "" },
      skills:           { type: [String], default: [] },

      links: {
        linkedin:  { type: String, default: "" },
        github:    { type: String, default: "" },
        portfolio: { type: String, default: "" },
        twitter:   { type: String, default: "" },
      },
    },

    // ── Account / Security ───────────────────────────────────────────────────
    account: {
      twoFactorEnabled: { type: Boolean, default: false },
      emailVerified:    { type: Boolean, default: false },
      activeSessions:   { type: Array,   default: [] },
    },

    // ── Email change OTP (temporary, cleared after success) ──────────────────
    pendingEmailChange: {
      newEmail:   { type: String, default: null },
      otp:        { type: String, default: null },         // hashed OTP
      otpExpires: { type: Date,   default: null },
    },

    // ── Notifications ────────────────────────────────────────────────────────
    notifications: {
      email:                   { type: Boolean, default: true  },
      interviewReminders:      { type: Boolean, default: true  },
      followUpReminders:       { type: Boolean, default: true  },
      deadlineAlerts:          { type: Boolean, default: true  },
      inApp:                   { type: Boolean, default: true  },
      applicationStatusChange: { type: Boolean, default: true  },
      weeklyDigest:            { type: Boolean, default: true  },
      aiInsights:              { type: Boolean, default: false },
      marketTrends:            { type: Boolean, default: false },
      reminderFrequency:       { type: String,  default: "daily", enum: ["immediate", "daily", "weekly"] },
    },

    // ── Privacy ──────────────────────────────────────────────────────────────
    privacy: {
      shareData:             { type: Boolean, default: false },
      trackHistory:          { type: Boolean, default: true  },
      publicProfile:         { type: Boolean, default: false },
      showSalaryExpectation: { type: Boolean, default: false },
      allowRecruiterContact: { type: Boolean, default: true  },
      dataRetentionMonths:   { type: Number,  default: 12    }, // 0 = forever
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);