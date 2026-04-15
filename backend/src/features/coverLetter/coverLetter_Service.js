import { GoogleGenerativeAI } from "@google/generative-ai";
export { generatePDFBuffer, generateDOCXBuffer } from "../../shared/utils/documentHelper.js";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


// ─── Build Prompt ─────────────────────────────────────────────────────────────
const buildPrompt = ({ jobDetails, experience, tone }) => {
  const {
    jobTitle,
    companyName,
    location,
    industry,
    jobType,
    jobDescription,
    hiringManagerName,
  } = jobDetails;

  const salutation = hiringManagerName
    ? `Dear ${hiringManagerName},`
    : "Dear Hiring Manager,";

  const experienceBlock = experience.experiences
    .filter((e) => e.title || e.company)
    .map(
      (e, i) =>
        `${i + 1}. ${e.title} at ${e.company}${e.duration ? ` (${e.duration})` : ""}${e.achievement ? ` – Key achievement: ${e.achievement}` : ""
        }`
    )
    .join("\n");

  const skillsList =
    experience.skills.length > 0 ? experience.skills.join(", ") : "Not specified";

  const { degree, institution, graduationYear, gpa } = experience.education || {};
  const educationLine =
    degree || institution
      ? `${degree || ""}${institution ? ` from ${institution}` : ""}${graduationYear ? ` (${graduationYear})` : ""
      }${gpa ? `, GPA: ${gpa}` : ""}`
      : "Not specified";

  const toneInstructions = {
    professional:
      "Use a formal, respectful, and strictly business-oriented tone. Keep language precise and avoid casual phrasing.",
    enthusiastic:
      "Use an energetic, passionate, and eager tone. Express genuine excitement about the role and company.",
    conservative:
      "Use a traditional, concise, and direct tone. Be straightforward without embellishment.",
    creative:
      "Use an original, storytelling-focused tone. Open with a hook. Let personality shine through.",
  };

  return `
You are an expert career coach and professional cover letter writer.

Write a compelling, personalized, and ATS-friendly cover letter for the following candidate:

━━━ JOB DETAILS ━━━
Position: ${jobTitle}
Company: ${companyName}
Location: ${location || "Not specified"}
Industry: ${industry || "Not specified"}
Job Type: ${jobType}

━━━ JOB DESCRIPTION / REQUIREMENTS ━━━
${jobDescription}

━━━ CANDIDATE EXPERIENCE ━━━
${experienceBlock || "Not specified"}

━━━ SKILLS ━━━
${skillsList}

━━━ EDUCATION ━━━
${educationLine}

━━━ TONE ━━━
${toneInstructions[tone] || toneInstructions.professional}

━━━ INSTRUCTIONS ━━━
1. Start directly with "${salutation}"
2. Write 3-4 strong paragraphs:
   • Opening: Express interest and briefly state why you are a great fit.
   • Body (1-2 paragraphs): Connect your experience and achievements to the job requirements. Use metrics where possible.
   • Closing: Express enthusiasm for an interview, thank the reader.
3. End with "Sincerely," followed by a blank line (leave name placeholder as [Your Name]).
4. Match the requested tone throughout.
5. Keep it to 300-400 words. Do NOT include any address block, date, or subject line – start directly with the salutation.
6. Return ONLY the cover letter text. No extra commentary, no markdown.
`.trim();
};

// ─── Generate Cover Letter ────────────────────────────────────────────────────

/**
 * Calls Gemini to generate a cover letter.
 * @param {{ jobDetails, experience, tone }} payload
 * @returns {Promise<string>} generated letter text
 */
export const generateCoverLetterService = async (payload) => {
  const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });
  const prompt = buildPrompt(payload);

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  if (!text || text.trim().length === 0) {
    throw new Error("Gemini returned an empty response. Please try again.");
  }

  return text.trim();
};

