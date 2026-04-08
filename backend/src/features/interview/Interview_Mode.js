import mongoose from "mongoose"

// Individual saved answer schema
const answerSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    enum: ['behavioral', 'technical', 'leadership', 'product', 'situational'],
    default: 'behavioral',
  },
  text: {
    type: String,
    default: '',
  },
  notes: {
    type: String,
    default: '',
  },
  rating: {
    type: String,
    enum: ['confident', 'okay', 'needs_work', null],
    default: null,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

// Main interview prep session schema
const interviewPrepSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    // AI-generated + custom questions stored here
    questions: [
      {
        id: { type: String, required: true },
        question: { type: String, required: true },
        type: {
          type: String,
          enum: ['behavioral', 'technical', 'leadership', 'product', 'situational'],
          default: 'behavioral',
        },
        difficulty: {
          type: String,
          enum: ['easy', 'medium', 'hard'],
          default: 'medium',
        },
        hint: { type: String, default: '' },
        prepTimeMinutes: { type: Number, default: 3 },
        tags: [String],
        isCustom: { type: Boolean, default: false },
      },
    ],
    // Saved answers
    answers: [answerSchema],
    // Interview date for countdown
    interviewDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index: one prep document per user per job
interviewPrepSchema.index({ user: 1, job: 1 }, { unique: true });


const InterviewPrep= mongoose.model('InterviewPrep', interviewPrepSchema);
export default InterviewPrep