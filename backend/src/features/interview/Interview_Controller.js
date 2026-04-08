import InterviewPrep from "./Interview_Mode";
import { generateInterviewQuestions } from "./Interviewgemini_Service";

// ── POST /api/interview/generate ─────────────────────────────────
/**
 * Generate AI interview questions for a given job profile.
 * Uses Gemini 1.5 Flash.
 *
 * Body: { jobId, jobTitle, company, jobDescription, questionTypes, count }
 */
export const generateQuestions = async (req, res) => {
  try {
    const {
      jobId,
      jobTitle,
      company,
      jobDescription,
      questionTypes,
      count,
    } = req.body;

    // Validate required fields
    if (!jobId || !jobTitle || !company) {
      return res.status(400).json({
        message: 'jobId, jobTitle, and company are required.',
      });
    }
    if (!Array.isArray(questionTypes) || questionTypes.length === 0) {
      return res.status(400).json({
        message: 'questionTypes must be a non-empty array.',
      });
    }

    // Generate via Gemini
    const questions = await generateInterviewQuestions({
      jobTitle,
      company,
      jobDescription: jobDescription || '',
      questionTypes,
      count: count || 10,
    });

    // Persist questions to DB (upsert prep document)
    await InterviewPrep.findOneAndUpdate(
      { user: req.user._id, job: jobId },
      {
        $set: { questions },
        $setOnInsert: { answers: [] },
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ questions });
  } catch (error) {
    console.error('Interview generate error:', error.message);
    res.status(500).json({ message: error.message || 'Failed to generate questions.' });
  }
};

// ── POST /api/interview/answers ──────────────────────────────────
/**
 * Save (or update) a user's answer for a specific question.
 *
 * Body: { jobId, questionId, questionText, questionType, text, notes, rating }
 */
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

    if (!jobId || !questionId) {
      return res.status(400).json({ message: 'jobId and questionId are required.' });
    }

    // Find or create the prep document
    const prep = await InterviewPrep.findOne({
      user: req.user._id,
      job: jobId,
    });

    if (!prep) {
      return res.status(404).json({
        message: 'Interview prep session not found. Generate questions first.',
      });
    }

    // Upsert the answer in the answers array
    const existingIndex = prep.answers.findIndex(
      (a) => a.questionId === questionId
    );

    const answerData = {
      questionId,
      questionText: questionText || '',
      questionType: questionType || 'behavioral',
      text: text || '',
      notes: notes || '',
      rating: rating || null,
      savedAt: new Date(),
    };

    if (existingIndex >= 0) {
      prep.answers[existingIndex] = answerData;
    } else {
      prep.answers.push(answerData);
    }

    await prep.save();

    res.status(200).json({ message: 'Answer saved.', answer: answerData });
  } catch (error) {
    console.error('Save answer error:', error.message);
    res.status(500).json({ message: 'Failed to save answer.' });
  }
};

// ── GET /api/interview/answers/:jobId ────────────────────────────
/**
 * Fetch all saved answers for a job's interview prep.
 */
export const getAnswers = async (req, res) => {
  try {
    const { jobId } = req.params;

    const prep = await InterviewPrep.findOne({
      user: req.user._id,
      job: jobId,
    });

    if (!prep) {
      // Not found is OK — user just hasn't started yet
      return res.status(200).json({ questions: [], answers: [] });
    }

    res.status(200).json({
      questions: prep.questions,
      answers: prep.answers,
      interviewDate: prep.interviewDate,
    });
  } catch (error) {
    console.error('Get answers error:', error.message);
    res.status(500).json({ message: 'Failed to fetch answers.' });
  }
};

// ── PUT /api/interview/date ──────────────────────────────────────
/**
 * Save the interview date for countdown timer.
 *
 * Body: { jobId, interviewDate }
 */
export const setInterviewDate = async (req, res) => {
  try {
    const { jobId, interviewDate } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: 'jobId is required.' });
    }

    const prep = await InterviewPrep.findOneAndUpdate(
      { user: req.user._id, job: jobId },
      { $set: { interviewDate: interviewDate || null } },
      { upsert: true, new: true }
    );

    res.status(200).json({ interviewDate: prep.interviewDate });
  } catch (error) {
    console.error('Set interview date error:', error.message);
    res.status(500).json({ message: 'Failed to save interview date.' });
  }
};

// ── DELETE /api/interview/:jobId ─────────────────────────────────
/**
 * Delete the entire prep session for a job (reset).
 */
export const deletePrep = async (req, res) => {
  try {
    const { jobId } = req.params;

    await InterviewPrep.findOneAndDelete({
      user: req.user._id,
      job: jobId,
    });

    res.status(200).json({ message: 'Interview prep session deleted.' });
  } catch (error) {
    console.error('Delete prep error:', error.message);
    res.status(500).json({ message: 'Failed to delete prep session.' });
  }
};

