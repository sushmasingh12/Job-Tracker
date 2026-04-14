import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      min: 0,
      max: 10,
      default: null,
    },
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    improvedAnswer: {
      type: String,
      default: "",
    },
    overallFeedback: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: true,
      trim: true,
    },
    questionText: {
      type: String,
      required: true,
      trim: true,
    },
    questionType: {
      type: String,
      enum: ["behavioral", "technical", "leadership", "product", "situational"],
      default: "behavioral",
    },
    text: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    rating: {
      type: String,
      enum: ["confident", "okay", "needs_work", null],
      default: null,
    },
    feedback: {
      type: feedbackSchema,
      default: () => ({}),
    },
    savedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["behavioral", "technical", "leadership", "product", "situational"],
      default: "behavioral",
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    hint: {
      type: String,
      default: "",
    },
    prepTimeMinutes: {
      type: Number,
      enum: [2, 3, 5, 8],
      default: 3,
    },
    tags: {
      type: [String],
      default: [],
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const interviewPrepSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      default: null,
    },
    isManual: {
      type: Boolean,
      default: false,
      index: true,
    },
    jobTitleManual: {
      type: String,
      trim: true,
      default: "",
    },
    techStack: {
      type: String,
      trim: true,
      default: "",
    },
    questions: {
      type: [questionSchema],
      default: [],
    },
    answers: {
      type: [answerSchema],
      default: [],
    },
    interviewDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
interviewPrepSchema.index(
  { user: 1, job: 1 },
  {
    unique: true,
    name: "user_job_idx_v2", 
    partialFilterExpression: {
      job: { $exists: true, $ne: null },
    },
  }
);

interviewPrepSchema.index(
  { user: 1, isManual: 1, jobTitleManual: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isManual: true,
    },
  }
);

const InterviewPrep = mongoose.model("InterviewPrep", interviewPrepSchema);

export default InterviewPrep;