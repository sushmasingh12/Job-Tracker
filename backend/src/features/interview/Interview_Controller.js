import InterviewPrep from "./Interview_Model.js";
import {
  generateInterviewQuestions,
  evaluateAnswer,
} from "./Interview_Services.js";
import Application from "../applications/app_Model.js";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiError from "../../shared/utils/ApiError.js";

const MANUAL_JOB_ID = "manual";

const findPrepSession = async (user, jobId, jobTitleManual = "") => {
  if (jobId && jobId !== MANUAL_JOB_ID) {
    return InterviewPrep.findOne({ user, job: jobId });
  }

  const query = { user, isManual: true };
  if (jobTitleManual) {
    query.jobTitleManual = jobTitleManual;
  }
  return InterviewPrep.findOne(query).sort({ updatedAt: -1 });
};

// ── POST /api/interview/generate ─────────────────────────────────
export const generateQuestions = asyncHandler(async (req, res) => {
  const {
    jobId,
    jobTitle,
    company,
    techStack,
    questionTypes,
    count,
  } = req.body;

  let finalJobTitle = "";
  let finalCompany = "";
  let finalJobDescription = "";
  let isManual = !jobId || jobId === MANUAL_JOB_ID;

  if (!Array.isArray(questionTypes) || questionTypes.length === 0) {
    throw new ApiError(400, "questionTypes must be a non-empty array.");
  }

  if (!isManual) {
    const application = await Application.findById(jobId);

    if (!application) {
      throw new ApiError(404, "Linked application not found.");
    }

    finalJobTitle = jobTitle?.trim() || application.jobTitle || "";
    finalCompany = company?.trim() || application.company || "Generic";
    finalJobDescription = application.jobDescription || "";
  } else {
    finalJobTitle = jobTitle?.trim() || "";
    finalCompany = company?.trim() || "Generic";
    finalJobDescription = "";
  }

  if (!finalJobTitle) {
    throw new ApiError(400, "Job title is required.");
  }

  const questions = await generateInterviewQuestions({
    jobTitle: finalJobTitle,
    company: finalCompany,
    jobDescription: finalJobDescription,
    techStack: techStack || "",
    questionTypes,
    count: count || 8,
  });

  const query = isManual
    ? { user: req.user._id, isManual: true, jobTitleManual: finalJobTitle }
    : { user: req.user._id, job: jobId };

  const update = {
    $set: {
      questions,
      isManual,
      job: isManual ? null : jobId,
      jobTitleManual: isManual ? finalJobTitle : "",
      techStack: techStack || "",
    },
    $setOnInsert: {
      answers: [],
    },
  };

  const prep = await InterviewPrep.findOneAndUpdate(query, update, {
    upsert: true,
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Questions generated successfully.",
    data: {
      questions,
      prepId: prep._id,
    },
  });
});

// ── POST /api/interview/answers ──────────────────────────────────
export const saveAnswer = asyncHandler(async (req, res) => {
  const {
    jobId,
    questionId,
    questionText,
    questionType,
    text,
    notes,
    rating,
  } = req.body;

  if (!questionId) {
    throw new ApiError(400, "questionId is required.");
  }

  const { jobTitleManual } = req.body;
  const prep = await findPrepSession(req.user._id, jobId, jobTitleManual);

  if (!prep) {
    throw new ApiError(404, "Interview prep session not found. Generate questions first.");
  }

  const existingIndex = prep.answers.findIndex(
    (answer) => answer.questionId === questionId
  );

  const answerData = {
    questionId,
    questionText: questionText || "",
    questionType: questionType || "behavioral",
    text: text || "",
    notes: notes || "",
    rating: rating || null,
    savedAt: new Date(),
  };

  if (existingIndex >= 0) {
    prep.answers[existingIndex] = {
      ...prep.answers[existingIndex].toObject(),
      ...answerData,
    };
  } else {
    prep.answers.push(answerData);
  }

  await prep.save();

  res.status(200).json({
    success: true,
    message: "Answer saved successfully.",
    data: { answer: answerData },
  });
});

// ── GET /api/interview/answers/:jobId ────────────────────────────
export const getAnswers = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  const prep = await findPrepSession(req.user._id, jobId);

  if (!prep) {
    return res.status(200).json({
      success: true,
      message: "No interview prep found",
      data: {
        questions: [],
        answers: [],
        interviewDate: null,
        techStack: "",
        jobTitle: "",
      },
    });
  }

  res.status(200).json({
    success: true,
    message: "Answers fetched successfully",
    data: {
      questions: prep.questions || [],
      answers: prep.answers || [],
      interviewDate: prep.interviewDate || null,
      techStack: prep.techStack || "",
      jobTitle: prep.isManual ? prep.jobTitleManual || "" : "",
    },
  });
});

// ── PUT /api/interview/date ──────────────────────────────────────
export const setInterviewDate = asyncHandler(async (req, res) => {
  const { jobId, interviewDate } = req.body;

  const isManual = !jobId || jobId === MANUAL_JOB_ID;

  const query = isManual
    ? { user: req.user._id, isManual: true }
    : { user: req.user._id, job: jobId };

  const update = {
    $set: {
      interviewDate: interviewDate || null,
      isManual,
      job: isManual ? null : jobId,
    },
    $setOnInsert: {
      answers: [],
      questions: [],
      jobTitleManual: "",
      techStack: "",
    },
  };

  const prep = await InterviewPrep.findOneAndUpdate(query, update, {
    upsert: true,
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Interview date updated successfully.",
    data: { interviewDate: prep.interviewDate },
  });
});

// ── DELETE /api/interview/:jobId ─────────────────────────────────
export const deletePrep = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  const isManual = !jobId || jobId === MANUAL_JOB_ID;

  const query = isManual
    ? { user: req.user._id, isManual: true }
    : { user: req.user._id, job: jobId };

  await InterviewPrep.findOneAndDelete(query);

  res.status(200).json({
    success: true,
    message: "Interview prep session deleted successfully.",
    data: {},
  });
});

// ── POST /api/interview/feedback ─────────────────────────────────
export const getFeedback = asyncHandler(async (req, res) => {
  const { jobId, questionId, text } = req.body;

  if (!questionId || !text?.trim()) {
    throw new ApiError(400, "questionId and text are required.");
  }

  const prep = await findPrepSession(req.user._id, jobId);

  if (!prep) {
    throw new ApiError(404, "Interview prep session not found.");
  }

  const questionObj = prep.questions.find((q) => q.id === questionId);

  if (!questionObj) {
    throw new ApiError(404, "Question not found in this prep session.");
  }

  let contextData = {
    jobTitle: prep.isManual ? prep.jobTitleManual || "Candidate" : "Candidate",
    company: "Generic",
    jobDescription: prep.techStack ? `Tech Stack: ${prep.techStack}` : "",
  };

  if (prep.job) {
    const application = await Application.findById(prep.job);

    if (application) {
      contextData = {
        jobTitle: application.jobTitle || contextData.jobTitle,
        company: application.company || "Generic",
        jobDescription: application.jobDescription || "",
      };
    }
  }

  const feedback = await evaluateAnswer({
    question: questionObj.question,
    answer: text,
    jobTitle: contextData.jobTitle,
    company: contextData.company,
    jobDescription: contextData.jobDescription,
  });

  const answerIndex = prep.answers.findIndex(
    (answer) => answer.questionId === questionId
  );

  if (answerIndex >= 0) {
    prep.answers[answerIndex].text = text;
    prep.answers[answerIndex].feedback = feedback;
    prep.answers[answerIndex].savedAt = new Date();
  } else {
    prep.answers.push({
      questionId,
      questionText: questionObj.question,
      questionType: questionObj.type,
      text,
      notes: "",
      rating: null,
      feedback,
      savedAt: new Date(),
    });
  }

  await prep.save();

  res.status(200).json({
    success: true,
    message: "Feedback generated successfully.",
    data: { feedback },
  });
});

// ── GET /api/interview/history ───────────────────────────────────
export const getInterviewHistory = asyncHandler(async (req, res) => {
  const history = await InterviewPrep.find({ user: req.user._id })
    .populate("job", "jobTitle company jobDescription")
    .sort({ updatedAt: -1 });

  res.status(200).json({
    success: true,
    message: "Interview history fetched successfully",
    data: history,
  });
});
