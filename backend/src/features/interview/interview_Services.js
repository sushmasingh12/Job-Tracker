import genAI from "../../config/gemini.js";

const TYPE_DESCRIPTIONS = {
  behavioral:
    "behavioral questions based on past experiences using the STAR method (Situation, Task, Action, Result)",
  technical:
    "technical / role-specific skill questions relevant to the job title and responsibilities",
  leadership:
    "leadership and people management questions about driving teams, resolving conflicts, and influencing others",
  product:
    "product sense and domain questions about product thinking, prioritization, metrics, and user focus",
  situational:
    "situational / hypothetical scenario questions that test decision-making and judgment",
};

const MODEL_CANDIDATES = [
  process.env.GEMINI_MODEL || "gemini-3.1-flash-lite-preview",
  "gemini-1.5-flash",
  "gemini-1.5-flash-lite",
];

const stripCodeFences = (text = "") =>
  String(text).replace(/```json/gi, "").replace(/```/g, "").trim();

const extractJsonPayload = (rawText = "") => {
  const cleaned = stripCodeFences(rawText);

  const firstArrayIndex = cleaned.indexOf("[");
  const firstObjectIndex = cleaned.indexOf("{");

  let startIndex = -1;

  if (firstArrayIndex === -1 && firstObjectIndex === -1) {
    throw new Error("No JSON found in AI response.");
  }

  if (firstArrayIndex === -1) {
    startIndex = firstObjectIndex;
  } else if (firstObjectIndex === -1) {
    startIndex = firstArrayIndex;
  } else {
    startIndex = Math.min(firstArrayIndex, firstObjectIndex);
  }

  const candidate = cleaned.slice(startIndex).trim();

  try {
    JSON.parse(candidate);
    return candidate;
  } catch {
    // continue
  }

  const openingChar = candidate[0];
  const closingChar = openingChar === "[" ? "]" : "}";

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let i = 0; i < candidate.length; i++) {
    const char = candidate[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (char === openingChar) depth++;
    if (char === closingChar) depth--;

    if (depth === 0) {
      const possibleJson = candidate.slice(0, i + 1);
      JSON.parse(possibleJson);
      return possibleJson;
    }
  }

  throw new Error("Could not extract valid JSON from AI response.");
};

const parseJson = (rawText) => {
  const jsonText = extractJsonPayload(rawText);
  return JSON.parse(jsonText);
};

const callGemini = async (prompt) => {
  let lastError = null;

  for (const modelName of MODEL_CANDIDATES) {
    try {
      console.log(`[AI] Attempting generation with: ${modelName}`);

      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 4096,
          responseMimeType: "application/json",
        },
      });

      const result = await model.generateContent(prompt);
      const text = result?.response?.text?.();

      if (text && text.trim()) {
        console.log(`[AI] Successfully received response from ${modelName}`);
        return text.trim();
      }
    } catch (err) {
      console.warn(`[AI] Model ${modelName} failed: ${err.message}`);
      lastError = err;
    }
  }

  throw (
    lastError ||
    new Error(
      "All Gemini models failed to respond. Please check your API key, model access, and internet connection."
    )
  );
};

const buildPrompt = ({
  jobTitle,
  company,
  jobDescription,
  techStack,
  questionTypes,
  count,
}) => {
  const validTypes = Array.isArray(questionTypes)
    ? questionTypes.filter(Boolean)
    : [];

  const typeDescriptions = validTypes
    .map((type) => `- ${TYPE_DESCRIPTIONS[type] || type}`)
    .join("\n");

  let context = "";

  if (jobDescription?.trim()) {
    context += `\nJob Description (Excerpt):\n"""\n${jobDescription
      .trim()
      .slice(0, 1500)}\n"""`;
  }

  if (techStack?.trim()) {
    context += `\nFocus Tech Stack: ${techStack.trim().slice(0, 300)}`;
  }

  if (!context) {
    context =
      "\n(No specific description or tech stack provided. Generate based on the job title and common expectations for the role.)";
  }

  return `
You are an expert interview coach generating realistic practice interview questions.

Role: ${jobTitle}
Company: ${company || "Generic"}${context}

Generate exactly ${count} interview questions covering these types:
${typeDescriptions}

Distribute the questions proportionally across the requested types.

Return ONLY a valid JSON array.
Do not add markdown.
Do not add explanation.
Do not wrap the response in code fences.
Do not include any text before or after the JSON array.

Each object must have exactly these fields:
{
  "id": "q<number>",
  "question": "<string>",
  "type": "<type>",
  "difficulty": "<level>",
  "hint": "<string>",
  "prepTimeMinutes": <number>,
  "tags": ["<tag>", "..."]
}

Rules:
- Questions must be specific to the ${jobTitle} role at ${company || "the company"}.
- Allowed "type" values: behavioral, technical, leadership, product, situational
- Allowed "difficulty" values: easy, medium, hard
- Vary difficulty approximately as: 30% easy, 50% medium, 20% hard
- "hint" must be genuinely useful and practical
- "prepTimeMinutes" must be one of: 2, 3, 5, 8
- "tags" must contain 2 to 4 lowercase tags
- Return a flat JSON array only
`.trim();
};

const normalizeQuestion = (q, index) => {
  const allowedTypes = [
    "behavioral",
    "technical",
    "leadership",
    "product",
    "situational",
  ];

  const allowedDifficulty = ["easy", "medium", "hard"];
  const allowedPrepTimes = [2, 3, 5, 8];

  const normalizedQuestion = String(q?.question || "").trim();
  if (!normalizedQuestion) {
    throw new Error(`Question ${index + 1} is missing required text.`);
  }

  const normalizedHint =
    String(q?.hint || "").trim() ||
    "Answer clearly with relevant examples and structured reasoning.";

  const normalizedTags = Array.isArray(q?.tags)
    ? q.tags
      .map((tag) => String(tag).trim().toLowerCase())
      .filter(Boolean)
      .slice(0, 4)
    : [];

  return {
    id: String(q?.id || `q${index + 1}`),
    question: normalizedQuestion,
    type: allowedTypes.includes(q?.type) ? q.type : "behavioral",
    difficulty: allowedDifficulty.includes(q?.difficulty)
      ? q.difficulty
      : "medium",
    hint: normalizedHint,
    prepTimeMinutes: allowedPrepTimes.includes(Number(q?.prepTimeMinutes))
      ? Number(q.prepTimeMinutes)
      : 3,
    tags: normalizedTags,
    isCustom: false,
  };
};

const parseQuestionsResponse = (rawText) => {
  let parsed;

  try {
    parsed = parseJson(rawText);
  } catch (err) {
    console.error(
      "[AI] JSON Parsing Error. Raw text head:",
      String(rawText).slice(0, 200)
    );
    throw new Error("Gemini returned invalid JSON. Please try again.");
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Unexpected response format from AI. Expected an array.");
  }

  if (parsed.length === 0) {
    throw new Error("AI returned an empty question list.");
  }

  return parsed.map((q, index) => normalizeQuestion(q, index));
};

export const generateInterviewQuestions = async ({
  jobTitle,
  company,
  jobDescription,
  techStack,
  questionTypes,
  count,
}) => {
  console.log(
    `[AI] Starting generation for: ${jobTitle} at ${company || "Generic"}`
  );

  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Missing GOOGLE_API_KEY in environment variables.");
  }

  if (!jobTitle || !String(jobTitle).trim()) {
    throw new Error("Job title (profile) is required.");
  }

  if (!Array.isArray(questionTypes) || questionTypes.length === 0) {
    throw new Error("At least one question type is required.");
  }

  const safeQuestionTypes = questionTypes.filter((type) =>
    ["behavioral", "technical", "leadership", "product", "situational"].includes(
      type
    )
  );

  if (safeQuestionTypes.length === 0) {
    throw new Error("No valid question types were provided.");
  }

  const safeCount = Math.min(Math.max(Number(count) || 8, 3), 15);

  const prompt = buildPrompt({
    jobTitle: String(jobTitle).trim(),
    company: company ? String(company).trim() : "",
    jobDescription: jobDescription ? String(jobDescription) : "",
    techStack: techStack ? String(techStack) : "",
    questionTypes: safeQuestionTypes,
    count: safeCount,
  });

  const rawText = await callGemini(prompt);
  const questions = parseQuestionsResponse(rawText);

  console.log(
    `[AI] Generation complete. Generated ${questions.length} questions.`
  );

  return questions;
};

const buildEvaluationPrompt = ({
  question,
  answer,
  jobTitle,
  company,
  jobDescription,
}) => {
  const jdContext = jobDescription?.trim()
    ? `\nJob Description:\n"""\n${jobDescription.trim().slice(0, 1000)}\n"""\n`
    : "";

  return `
You are an expert interviewer for the role of ${jobTitle} at ${company || "Generic"}.
${jdContext}
I will provide an interview question and a candidate's answer.

Question:
${question}

Candidate's Answer:
${answer}

Return ONLY a valid JSON object.
Do not add markdown.
Do not add explanation.
Do not wrap the response in code fences.
Do not include any text before or after the JSON object.

Expected JSON format:
{
  "score": <number from 1 to 10>,
  "strengths": ["string", "..."],
  "weaknesses": ["string", "..."],
  "improvedAnswer": "<string>",
  "overallFeedback": "<string>"
}

Rules:
- Be encouraging but honest
- Strengths must be specific
- Weaknesses must be specific and actionable
- improvedAnswer must be concise but strong
- For behavioral answers, prefer STAR style where relevant
- Score must be an integer from 1 to 10
`.trim();
};

const normalizeEvaluationResponse = (data) => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Unexpected evaluation response format from AI.");
  }

  const score = Math.min(Math.max(Number(data.score) || 0, 1), 10);

  return {
    score,
    strengths: Array.isArray(data.strengths)
      ? data.strengths.map((item) => String(item).trim()).filter(Boolean)
      : [],
    weaknesses: Array.isArray(data.weaknesses)
      ? data.weaknesses.map((item) => String(item).trim()).filter(Boolean)
      : [],
    improvedAnswer: String(data.improvedAnswer || "").trim(),
    overallFeedback: String(data.overallFeedback || "").trim(),
  };
};

export const evaluateAnswer = async ({
  question,
  answer,
  jobTitle,
  company,
  jobDescription,
}) => {
  console.log(
    `[AI] Evaluating answer for question: "${String(question).slice(0, 30)}..."`
  );

  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("Missing GOOGLE_API_KEY in environment variables.");
  }

  if (!question || !String(question).trim()) {
    throw new Error("Question is required for evaluation.");
  }

  if (!answer || !String(answer).trim()) {
    throw new Error("Answer is required for evaluation.");
  }

  if (!jobTitle || !String(jobTitle).trim()) {
    throw new Error("Job title is required for evaluation.");
  }

  const prompt = buildEvaluationPrompt({
    question: String(question).trim(),
    answer: String(answer).trim(),
    jobTitle: String(jobTitle).trim(),
    company: company ? String(company).trim() : "",
    jobDescription: jobDescription ? String(jobDescription) : "",
  });

  const rawText = await callGemini(prompt);

  try {
    const parsed = parseJson(rawText);
    return normalizeEvaluationResponse(parsed);
  } catch (error) {
    console.error(
      "[AI] Feedback Parsing Error:",
      String(rawText).slice(0, 200)
    );
    throw new Error("Failed to parse AI feedback into valid JSON.");
  }
};
