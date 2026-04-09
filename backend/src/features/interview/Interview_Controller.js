import InterviewPrep from "./Interview_Model.js";
import {
  generateInterviewQuestions,
  evaluateAnswer,
} from "./Interview_Services.js";
import Application from "../applications/app_Model.js";

const MANUAL_JOB_ID = "manual";

// Helper to find prep session
const findPrepSession = async (user, jobId) => {
  if (jobId && jobId !== MANUAL_JOB_ID) {
    return InterviewPrep.findOne({ user, job: jobId });
  }

  return InterviewPrep.findOne({ user, isManual: true });
};

// ── POST /api/interview/generate ─────────────────────────────────
export const generateQuestions = async (req, res) => {
  try {
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
      return res.status(400).json({
        message: "questionTypes must be a non-empty array.",
      });
    }

    // Application mode
    if (!isManual) {
      const application = await Application.findById(jobId);

      if (!application) {
        return res.status(404).json({
          message: "Linked application not found.",
        });
      }

      finalJobTitle = jobTitle?.trim() || application.jobTitle || "";
      finalCompany = company?.trim() || application.company || "Generic";
      finalJobDescription = application.jobDescription || "";
    } else {
      // Manual mode
      finalJobTitle = jobTitle?.trim() || "";
      finalCompany = company?.trim() || "Generic";
      finalJobDescription = "";
    }

    if (!finalJobTitle) {
      return res.status(400).json({
        message: "Job title is required.",
      });
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
      ? { user: req.user._id, isManual: true }
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

    return res.status(200).json({
      message: "Questions generated successfully.",
      questions,
      prepId: prep._id,
    });
  } catch (error) {
    console.error("Interview generate error:", error);
    return res.status(500).json({
      message: error.message || "Failed to generate questions.",
    });
  }
};

// ── POST /api/interview/answers ──────────────────────────────────
export const saveAnswer = async (req, res) => {
  try {
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
      return res.status(400).json({
        message: "questionId is required.",
      });
    }

    const prep = await findPrepSession(req.user._id, jobId);

    if (!prep) {
      return res.status(404).json({
        message: "Interview prep session not found. Generate questions first.",
      });
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

    return res.status(200).json({
      message: "Answer saved successfully.",
      answer: answerData,
    });
  } catch (error) {
    console.error("Save answer error:", error);
    return res.status(500).json({
      message: error.message || "Failed to save answer.",
    });
  }
};

// ── GET /api/interview/answers/:jobId ────────────────────────────
export const getAnswers = async (req, res) => {
  try {
    const { jobId } = req.params;

    const prep = await findPrepSession(req.user._id, jobId);

    if (!prep) {
      return res.status(200).json({
        questions: [],
        answers: [],
        interviewDate: null,
        techStack: "",
        jobTitle: "",
      });
    }

    return res.status(200).json({
      questions: prep.questions || [],
      answers: prep.answers || [],
      interviewDate: prep.interviewDate || null,
      techStack: prep.techStack || "",
      jobTitle: prep.isManual ? prep.jobTitleManual || "" : "",
    });
  } catch (error) {
    console.error("Get answers error:", error);
    return res.status(500).json({
      message: error.message || "Failed to fetch answers.",
    });
  }
};

// ── PUT /api/interview/date ──────────────────────────────────────
export const setInterviewDate = async (req, res) => {
  try {
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

    return res.status(200).json({
      interviewDate: prep.interviewDate,
    });
  } catch (error) {
    console.error("Set interview date error:", error);
    return res.status(500).json({
      message: error.message || "Failed to save interview date.",
    });
  }
};

// ── DELETE /api/interview/:jobId ─────────────────────────────────
export const deletePrep = async (req, res) => {
  try {
    const { jobId } = req.params;

    const isManual = !jobId || jobId === MANUAL_JOB_ID;

    const query = isManual
      ? { user: req.user._id, isManual: true }
      : { user: req.user._id, job: jobId };

    await InterviewPrep.findOneAndDelete(query);

    return res.status(200).json({
      message: "Interview prep session deleted successfully.",
    });
  } catch (error) {
    console.error("Delete prep error:", error);
    return res.status(500).json({
      message: error.message || "Failed to delete prep session.",
    });
  }
};

// ── POST /api/interview/feedback ─────────────────────────────────
export const getFeedback = async (req, res) => {
  try {
    const { jobId, questionId, text } = req.body;

    if (!questionId || !text?.trim()) {
      return res.status(400).json({
        message: "questionId and text are required.",
      });
    }

    const prep = await findPrepSession(req.user._id, jobId);

    if (!prep) {
      return res.status(404).json({
        message: "Interview prep session not found.",
      });
    }

    const questionObj = prep.questions.find((q) => q.id === questionId);

    if (!questionObj) {
      return res.status(404).json({
        message: "Question not found in this prep session.",
      });
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

    return res.status(200).json({
      message: "Feedback generated successfully.",
      feedback,
    });
  } catch (error) {
    console.error("Get feedback error:", error);
    return res.status(500).json({
      message: error.message || "Failed to generate feedback.",
    });
  }
};