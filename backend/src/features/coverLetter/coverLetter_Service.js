
import { GoogleGenerativeAI } from "@google/generative-ai";
import PDFDocument from "pdfkit";
import { Document, Packer, Paragraph, TextRun } from "docx";
// ─── Gemini Client (singleton) ────────────────────────────────────────────────
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// ─── Build Prompt ─────────────────────────────────────────────────────────────

/**
 * Builds a detailed prompt for Gemini based on all wizard data.
 */
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
        `${i + 1}. ${e.title} at ${e.company}${e.duration ? ` (${e.duration})` : ""}${
          e.achievement ? ` – Key achievement: ${e.achievement}` : ""
        }`
    )
    .join("\n");

  const skillsList =
    experience.skills.length > 0 ? experience.skills.join(", ") : "Not specified";

  const { degree, institution, graduationYear, gpa } = experience.education || {};
  const educationLine =
    degree || institution
      ? `${degree || ""}${institution ? ` from ${institution}` : ""}${
          graduationYear ? ` (${graduationYear})` : ""
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
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
  const prompt = buildPrompt(payload);

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  if (!text || text.trim().length === 0) {
    throw new Error("Gemini returned an empty response. Please try again.");
  }

  return text.trim();
};

// ─── Generate PDF Buffer ──────────────────────────────────────────────────────

/**
 * Converts plain-text cover letter to a formatted PDF buffer.
 * Uses pdfkit (no external process needed).
 * @param {string} content  plain text letter
 * @returns {Promise<Buffer>}
 */
export const generatePDFBuffer = (content) => {
  return new Promise((resolve, reject) => {
    try {
      const chunks = [];
      const doc = new PDFDocument({
        margins: { top: 72, bottom: 72, left: 72, right: 72 },
        size: "A4",
      });

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // ── Styling ────────────────────────────────────────────────────────────
      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor("#1a1a1a");

      // Split into paragraphs and render each with spacing
      const paragraphs = content.split(/\n\n+/);
      paragraphs.forEach((para, i) => {
        const lines = para.split("\n").join(" ").trim();
        doc.text(lines, { align: "left", lineGap: 4 });
        if (i < paragraphs.length - 1) doc.moveDown(0.8);
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

// ─── Generate DOCX Buffer ────────────────────────────────────────────────────

/**
 * Converts plain-text cover letter to a .docx buffer.
 * Uses the `docx` package.
 * @param {string} content  plain text letter
 * @returns {Promise<Buffer>}
 */
export const generateDOCXBuffer = async (content) => {


  const paragraphs = content
    .split(/\n\n+/)
    .flatMap((block) => {
      const lines = block.split("\n");
      return [
        ...lines.map(
          (line) =>
            new Paragraph({
              children: [new TextRun({ text: line.trim(), size: 22 })], // 11pt
              spacing: { after: 0 },
            })
        ),
        // Empty paragraph between blocks
        new Paragraph({ children: [new TextRun("")], spacing: { after: 160 } }),
      ];
    });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }, // 1 inch = 1440 twips
          },
        },
        children: paragraphs,
      },
    ],
  });

  return Packer.toBuffer(doc);
};

