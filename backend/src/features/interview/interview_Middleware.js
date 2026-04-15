const VALID_QUESTION_TYPES = [
  "behavioral",
  "technical",
  "leadership",
  "product",
  "situational",
];

const VALID_RATINGS = ["confident", "okay", "needs_work", null, undefined, ""];

const MANUAL_JOB_ID = "manual";

const sendValidationError = (res, errors) => {
  return res.status(422).json({
    success: false,
    message: "Validation failed.",
    errors,
  });
};

// ── POST /api/interview/generate ─────────────────────────────────
export const validateGenerateQuestions = (req, res, next) => {
  const errors = [];
  const { jobId, jobTitle, questionTypes, count, company, techStack } = req.body;

  const isManual = !jobId || jobId === MANUAL_JOB_ID;

  if (!Array.isArray(questionTypes) || questionTypes.length === 0) {
    errors.push({
      field: "questionTypes",
      message: "questionTypes must be a non-empty array.",
    });
  } else {
    const invalidTypes = questionTypes.filter(
      (type) => !VALID_QUESTION_TYPES.includes(type)
    );

    if (invalidTypes.length > 0) {
      errors.push({
        field: "questionTypes",
        message: `Invalid type(s): ${invalidTypes.join(", ")}.`,
      });
    }
  }

  if (count !== undefined) {
    const parsedCount = Number(count);

    if (!Number.isInteger(parsedCount) || parsedCount < 3 || parsedCount > 15) {
      errors.push({
        field: "count",
        message: "count must be an integer between 3 and 15.",
      });
    }
  }

  if (!isManual) {
    if (typeof jobId !== "string" || !jobId.trim()) {
      errors.push({
        field: "jobId",
        message: "jobId is required for application-based interview prep.",
      });
    }
  } else {
    if (!jobTitle || typeof jobTitle !== "string" || !jobTitle.trim()) {
      errors.push({
        field: "jobTitle",
        message: "jobTitle is required for manual interview prep.",
      });
    }
  }

  if (company !== undefined && typeof company !== "string") {
    errors.push({
      field: "company",
      message: "company must be a string.",
    });
  }

  if (techStack !== undefined && typeof techStack !== "string") {
    errors.push({
      field: "techStack",
      message: "techStack must be a string.",
    });
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }

  return next();
};

// ── POST /api/interview/answers ──────────────────────────────────
export const validateSaveAnswer = (req, res, next) => {
  const errors = [];
  const { jobId, questionId, questionType, rating, text, notes, questionText } =
    req.body;

  if (jobId !== undefined && (typeof jobId !== "string" || !jobId.trim())) {
    errors.push({
      field: "jobId",
      message: "jobId must be a non-empty string when provided.",
    });
  }

  if (!questionId || typeof questionId !== "string" || !questionId.trim()) {
    errors.push({
      field: "questionId",
      message: "questionId is required.",
    });
  }

  if (questionType !== undefined && !VALID_QUESTION_TYPES.includes(questionType)) {
    errors.push({
      field: "questionType",
      message: `Invalid questionType. Allowed: ${VALID_QUESTION_TYPES.join(", ")}.`,
    });
  }

  if (rating !== undefined && !VALID_RATINGS.includes(rating)) {
    errors.push({
      field: "rating",
      message: "Invalid rating. Allowed: confident, okay, needs_work, or null.",
    });
  }

  if (text !== undefined && typeof text !== "string") {
    errors.push({
      field: "text",
      message: "text must be a string.",
    });
  }

  if (notes !== undefined && typeof notes !== "string") {
    errors.push({
      field: "notes",
      message: "notes must be a string.",
    });
  }

  if (questionText !== undefined && typeof questionText !== "string") {
    errors.push({
      field: "questionText",
      message: "questionText must be a string.",
    });
  }

  if (typeof text === "string" && text.length > 10000) {
    errors.push({
      field: "text",
      message: "Answer text must not exceed 10,000 characters.",
    });
  }

  if (typeof notes === "string" && notes.length > 3000) {
    errors.push({
      field: "notes",
      message: "Notes must not exceed 3,000 characters.",
    });
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }

  return next();
};

// ── PUT /api/interview/date ──────────────────────────────────────
export const validateInterviewDate = (req, res, next) => {
  const errors = [];
  const { jobId, interviewDate } = req.body;

  if (jobId !== undefined && (typeof jobId !== "string" || !jobId.trim())) {
    errors.push({
      field: "jobId",
      message: "jobId must be a non-empty string when provided.",
    });
  }

  if (
    interviewDate !== undefined &&
    interviewDate !== null &&
    interviewDate !== ""
  ) {
    const parsedDate = new Date(interviewDate);

    if (Number.isNaN(parsedDate.getTime())) {
      errors.push({
        field: "interviewDate",
        message: "interviewDate must be a valid ISO date string.",
      });
    }
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }

  return next();
};

// ── GET / DELETE param validator ─────────────────────────────────
export const validateJobIdParam = (req, res, next) => {
  const { jobId } = req.params;

  if (!jobId || typeof jobId !== "string" || !jobId.trim()) {
    return sendValidationError(res, [
      {
        field: "jobId",
        message: "jobId URL parameter is required.",
      },
    ]);
  }

  return next();
};

// ── POST /api/interview/feedback ─────────────────────────────────
export const validateFeedbackRequest = (req, res, next) => {
  const errors = [];
  const { jobId, questionId, text } = req.body;

  if (jobId !== undefined && (typeof jobId !== "string" || !jobId.trim())) {
    errors.push({
      field: "jobId",
      message: "jobId must be a non-empty string when provided.",
    });
  }

  if (!questionId || typeof questionId !== "string" || !questionId.trim()) {
    errors.push({
      field: "questionId",
      message: "questionId is required.",
    });
  }

  if (!text || typeof text !== "string" || !text.trim()) {
    errors.push({
      field: "text",
      message: "text is required.",
    });
  }

  if (typeof text === "string" && text.length > 10000) {
    errors.push({
      field: "text",
      message: "text must not exceed 10,000 characters.",
    });
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }

  return next();
};

// ── Rate limit ───────────────────────────────────────────────────
const generateRateLimitStore = new Map();

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

export const rateLimitGenerateQuestions = (req, res, next) => {
  const userId = req.user?._id?.toString();

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized.",
    });
  }

  const now = Date.now();
  const entry = generateRateLimitStore.get(userId);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    generateRateLimitStore.set(userId, {
      count: 1,
      windowStart: now,
    });
    return next();
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfterSec = Math.ceil(
      (RATE_LIMIT_WINDOW_MS - (now - entry.windowStart)) / 1000
    );

    res.set("Retry-After", retryAfterSec);

    return res.status(429).json({
      success: false,
      message: `Too many generation requests. Please wait ${Math.ceil(
        retryAfterSec / 60
      )} minute(s) before trying again.`,
      retryAfterSeconds: retryAfterSec,
    });
  }

  entry.count += 1;
  generateRateLimitStore.set(userId, entry);

  return next();
};

// ── Error handler ────────────────────────────────────────────────
export const interviewErrorHandler = (err, req, res, next) => {
  console.error("[Interview Error]", err);

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));

    return res.status(422).json({
      success: false,
      message: "Validation failed.",
      errors,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid value for field '${err.path}'.`,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
};