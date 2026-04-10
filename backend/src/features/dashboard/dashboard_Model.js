import mongoose from "mongoose";

const dashboardPreferenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    // Future: Add fields to save user's preferred layout or card order
    widgetsOrder: {
      type: [String],
      default: ["stats", "recent", "trend", "actions"],
    },
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
  },
  { timestamps: true }
);

const DashboardPreference = mongoose.model("DashboardPreference", dashboardPreferenceSchema);

export default DashboardPreference;
