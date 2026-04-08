import {GoogleGenerativeAI} from "@google/generative-ai"
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

/**
 * Type label map for Gemini prompt (more descriptive)
 */
const TYPE_DESCRIPTIONS = {
  behavioral:
    'behavioral questions based on past experiences using the STAR method (Situation, Task, Action, Result)',
  technical:
    'technical / role-specific skill questions relevant to the job title and responsibilities',
  leadership:
    'leadership and people management questions about driving teams, resolving conflicts, and influencing others',
  product:
    'product sense and domain questions about product thinking, prioritization, metrics, and user focus',
  situational:
    'situational / hypothetical scenario questions that test decision-making and judgment',
};

/**
 * Build the Gemini prompt for question generation.
 */
const buildPrompt = ({ jobTitle, company, jobDescription, questionTypes, count }) => {
  const typeDescriptions = questionTypes
    .map((t) => `- ${TYPE_DESCRIPTIONS[t] || t}`)
    .join('\n');

  const jdSection = jobDescription?.trim()
    ? `\nJob Description:\n"""\n${jobDescription.slice(0, 2000)}\n"""`
    : '\n(No job description provided — generate based on the job title and company.)';

  return `You are an expert interview coach generating practice interview questions.

Role: ${jobTitle}
Company: ${company}${jdSection}

Generate exactly ${count} interview questions covering these types:
${typeDescriptions}

Distribute the questions proportionally across the requested types.

Return ONLY a valid JSON array — no markdown, no explanation, no code fences.
Each object must have exactly these fields:
{
  "id": "q<number>",           // e.g. "q1", "q2"
  "question": "<string>",      // the full interview question
  "type": "<type>",            // one of: behavioral, technical, leadership, product, situational
  "difficulty": "<level>",     // one of: easy, medium, hard
  "hint": "<string>",          // 1–2 sentence coaching tip for answering
  "prepTimeMinutes": <number>, // suggested prep time: 2, 3, 5, or 8
  "tags": ["<tag>", ...]       // 2–4 relevant skill/topic tags, lowercase
}

Rules:
- Questions must be specific to the ${jobTitle} role at ${company}
- Vary difficulty: ~30% easy, ~50% medium, ~20% hard
- Make hints genuinely useful (frameworks, what interviewers look for)
- Tags should reflect the skills tested (e.g. "communication", "system design", "prioritization")
- Return a flat JSON array only — nothing else`;
};

/**
 * Parse and validate the Gemini response JSON.
 */
const parseQuestionsResponse = (rawText) => {
  // Strip any accidental markdown fences
  const cleaned = rawText
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error('Gemini returned invalid JSON. Please try again.');
  }

  if (!Array.isArray(parsed)) {
    throw new Error('Unexpected response format from AI.');
  }

  // Sanitize each question object
  return parsed.map((q, i) => ({
    id: q.id || `q${i + 1}`,
    question: String(q.question || '').trim(),
    type: ['behavioral', 'technical', 'leadership', 'product', 'situational'].includes(q.type)
      ? q.type
      : 'behavioral',
    difficulty: ['easy', 'medium', 'hard'].includes(q.difficulty)
      ? q.difficulty
      : 'medium',
    hint: String(q.hint || '').trim(),
    prepTimeMinutes: Number(q.prepTimeMinutes) || 3,
    tags: Array.isArray(q.tags) ? q.tags.map(String) : [],
    isCustom: false,
  }));
};

/**
 * Main function: generate interview questions via Gemini.
 *
 * @param {Object} params
 * @param {string} params.jobTitle
 * @param {string} params.company
 * @param {string} [params.jobDescription]
 * @param {string[]} params.questionTypes  - e.g. ['behavioral', 'technical']
 * @param {number}  params.count           - total questions to generate
 * @returns {Promise<Array>} array of question objects
 */
const generateInterviewQuestions = async ({
  jobTitle,
  company,
  jobDescription,
  questionTypes,
  count,
}) => {
  // Validate inputs
  if (!jobTitle || !company) {
    throw new Error('Job title and company are required.');
  }
  if (!questionTypes || questionTypes.length === 0) {
    throw new Error('At least one question type is required.');
  }

  const safeCount = Math.min(Math.max(Number(count) || 10, 5), 20);

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = buildPrompt({
    jobTitle,
    company,
    jobDescription,
    questionTypes,
    count: safeCount,
  });

  const result = await model.generateContent(prompt);
  const rawText = result.response.text();

  const questions = parseQuestionsResponse(rawText);

  return questions;
};

module.exports = { generateInterviewQuestions };