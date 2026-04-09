import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

const parseGeminiJSON = (text) => {
  const cleaned = text
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();

  return JSON.parse(cleaned);
};

const TEMPLATE_STYLE_MAP = {
  modern: "clean, professional, data-driven, ATS-friendly",
  classic: "traditional, formal, balanced, corporate",
  minimal: "concise, stripped-back, highly readable, simple",
  executive: "premium, leadership-focused, polished, strategic",
  compact: "space-efficient, sharp, one-page oriented, concise",
};

// ─── 1. EXTRACT ──────────────────────────────────────────────────────────────
const extractStructuredResume = async (resumeText) => {
  const prompt = `
You are an expert resume parser. Read the resume text below and convert it into structured JSON.

PARSING RULES:
1. Extract basic info (name, email, phone, location, title/headline) into a "basics" object.
2. Detect all sections in the order they appear. Use normalized lowercase keys:
   "summary", "experience", "projects", "skills", "education",
   "certifications", "achievements", "languages", "volunteer".
   Map custom headings to the closest standard key (e.g. "Core Competencies" to "skills").
3. For experience and project entries - CRITICAL:
   - NEVER put multiple achievements into a single "description" string.
   - Each entry MUST have a "bullets" array of individual achievement strings.
   - Split every responsibility or accomplishment into its own array element.
   - Minimum 1 bullet per entry, aim for 2 to 4.
4. For skills: return an array of strings, each formatted as "Category: skill1, skill2".
   Derive category names from the actual skills present (e.g. "Languages", "Front-End", "Tools").
   Example: ["Languages: Python, JavaScript", "Tools: Git, Postman, Figma"].
5. For education: array of objects with "degree", "school", "location", "year".
6. For summary: a single plain string.
7. sectionOrder must only list sections that have actual data.

Return ONLY valid raw JSON. No markdown fences, no backticks, no explanation text.

{
  "basics": {
    "name": "...",
    "title": "...",
    "email": "...",
    "phone": "...",
    "location": "...",
    "linkedin": "...",
    "website": "..."
  },
  "sectionOrder": ["summary", "experience", "projects", "skills", "education"],
  "sections": {
    "summary": "single paragraph string here",
    "experience": [
      {
        "role": "Job Title",
        "company": "Company Name",
        "location": "City",
        "duration": "Month YYYY to Month YYYY",
        "bullets": [
          "First responsibility or achievement as its own string",
          "Second responsibility or achievement as its own string"
        ]
      }
    ],
    "projects": [
      {
        "name": "Project Name",
        "description": "Optional one-line description (15 words max)",
        "bullets": [
          "What was built or implemented",
          "Key technical achievement or measurable impact"
        ],
        "tech": ["Tech1", "Tech2", "Tech3"]
      }
    ],
    "skills": [
      "Languages: Python, JavaScript, PHP",
      "Front-End: HTML5, CSS3, Bootstrap",
      "Back-End: Laravel, RESTful APIs",
      "Databases: MySQL",
      "Tools: Git, Postman, Figma, PyCharm"
    ],
    "education": [
      {
        "degree": "B.Tech in Computer Science",
        "school": "University Name",
        "location": "City",
        "year": "YYYY to YYYY"
      }
    ]
  }
}

RESUME TEXT:
${resumeText}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return parseGeminiJSON(text);
};

// ─── 2. ANALYZE ──────────────────────────────────────────────────────────────
const analyzeResumeVsJob = async (resumeText, jobDescription) => {
  const prompt = `
You are an expert ATS analyzer and resume coach.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Evaluate the resume on the following 9 criteria:
1. Relevance (How well the candidate fits the role)
2. Section Quality (Depth and professionalism of each section)
3. Content Strength (Use of metrics, impact, and action verbs)
4. Experience (Relevance and seniority of work history)
5. Projects (Quality and technical depth of projects)
6. Skills (Alignment of technical and soft skills)
7. Formatting (Readability and consistent styling)
8. Structure (Logical flow and section organization)
9. Keyword Match (Presence of essential JD terms)

Return ONLY valid raw JSON:
{
  "atsScore": <integer 0-100 overall score>,
  "matchedKeywords": [<keywords found in both resume and JD>],
  "missingKeywords": [<top 10 important keywords from JD missing in resume>],
  "scoreBreakdown": {
    "relevance": { "score": <0-100>, "tips": [<1-2 specific tips>] },
    "sectionQuality": { "score": <0-100>, "tips": [<1-2 specific tips>] },
    "contentStrength": { "score": <0-100>, "tips": [<1-2 specific tips>] },
    "experience": { "score": <0-100>, "tips": [<1-2 specific tips>] },
    "projects": { "score": <0-100>, "tips": [<1-2 specific tips>] },
    "skills": { "score": <0-100>, "tips": [<1-2 specific tips>] },
    "formatting": { "score": <0-100>, "tips": [<1-2 specific tips>] },
    "structure": { "score": <0-100>, "tips": [<1-2 specific tips>] },
    "keywordMatch": { "score": <0-100>, "tips": [<1-2 specific tips>] }
  },
  "suggestions": [<3-5 broad suggestions for overall improvement>],
  "strengths": [<2-3 specific strengths of this resume for this JD>],
  "potentialScore": <integer 0-100 after optimization>
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return parseGeminiJSON(text);
};

// ─── 3. OPTIMIZE ─────────────────────────────────────────────────────────────
const optimizeResumeContent = async (
  structuredResume,
  jobDescription,
  template = "modern"
) => {
  const styleTone = TEMPLATE_STYLE_MAP[template] || TEMPLATE_STYLE_MAP.modern;

  // Extract the candidate's actual skills list from the original resume
  // so Gemini knows exactly what skills this person has
  const originalSkills =
    structuredResume?.sections?.skills
      ? JSON.stringify(structuredResume.sections.skills)
      : "not found";

  const prompt = `
You are a senior resume writer and ATS optimization specialist.
Template style: "${template}" with tone: ${styleTone}.

Your task: Deeply rewrite and tailor the resume below for the target job description.
This is a FULL rewrite — not a light edit. Every section must be noticeably stronger and more relevant.
Return relevant improvement data for all resume content so the user knows exactly why each change was made.

ORIGINAL STRUCTURED RESUME:
${JSON.stringify(structuredResume, null, 2)}

TARGET JOB DESCRIPTION:
${jobDescription}

CANDIDATE'S ACTUAL SKILLS (from their resume):
${originalSkills}

REWRITING RULES:

1. KEYWORDS
   - Find the 10-15 most important skills and keywords from the job description.
   - Weave them naturally into the summary, experience bullets, and skills section.

2. SUMMARY
   - Rewrite it fully to target THIS specific role.
   - Write as long as needed to cover: relevant experience, key matching skills, and value proposition.
   - Do NOT limit to 2-3 sentences — write what is appropriate to represent the candidate well.
   - It must feel personally written for this job, not a generic template.

3. EXPERIENCE bullets
   - Rewrite every bullet using: strong action verb + specific task + measurable result.
   - BAD: "Worked with the team on projects"
   - GOOD: "Partnered with a 5-member cross-functional team to deliver 3 web features, reducing delivery time by 20%"

4. PROJECT bullets
   - Each project must have 2-4 bullets showing technical depth and real impact.
   - BAD: "Built an LMS"
   - GOOD: "Engineered a full-stack LMS using Laravel and MySQL, cutting content retrieval time by 75% for 200+ concurrent users"

5. SKILLS — MOST IMPORTANT RULE
   - Use ONLY the skills the candidate actually has (listed above). Do NOT invent new skills.
   - Add skills from the JD only if they are clearly implied by the candidate's existing experience.
   - Derive category names organically from what skills are present — do NOT use hardcoded categories.
   - If a candidate has React, group it under a front-end category. If they only have Laravel, group it under back-end.
   - Format: array of strings, each as "DerivedCategoryName: skill1, skill2, skill3"
   - Reorder so JD-matching skills appear first within each category.

6. STRUCTURE RULES
   - "bullets" must ALWAYS be a JSON array of strings. NEVER a paragraph string.
   - Every experience and project entry must have at least 2 bullets.
   - Skills section must be a JSON array of "Category: values" strings.
   - Do NOT fabricate companies, degrees, roles, or skills not in the original.
   - Keep exactly the same sectionOrder as the original resume.

Return ONLY valid raw JSON. No markdown fences, no backticks, no text before or after the JSON.

The JSON shape must follow the original resume structure exactly:
{
  "optimizedSections": {
    "basics": {
      "name": "<preserve from original>",
      "title": "<rewrite to match the target role>",
      "email": "<preserve from original>",
      "phone": "<preserve from original>",
      "location": "<preserve from original>",
      "linkedin": "<preserve or empty string>",
      "website": "<preserve or empty string>"
    },
    "sectionOrder": <same array as original>,
    "sections": {
      "summary": "<fully rewritten — as long as needed>",
      "experience": [
        {
          "role": "<preserve>",
          "company": "<preserve>",
          "location": "<preserve>",
          "duration": "<preserve>",
          "bullets": ["<rewritten bullet 1>", "<rewritten bullet 2>", "<rewritten bullet 3>"]
        }
      ],
      "projects": [
        {
          "name": "<preserve>",
          "description": "<optional one-liner>",
          "bullets": ["<rewritten bullet 1>", "<rewritten bullet 2>"],
          "tech": ["<actual tech from project>"]
        }
      ],
      "skills": [
        "<DerivedCategory>: <candidate's actual skills in this category>",
        "<DerivedCategory>: <candidate's actual skills in this category>"
      ],
      "education": [
        {
          "degree": "<preserve>",
          "school": "<preserve>",
          "location": "<preserve>",
          "year": "<preserve>"
        }
      ]
    }
  },
  "changesExplained": [
    "<specific improvement made for a specific section, e.g., 'Optimized Experience bullets with X metrics'>",
    "<specific improvement made for a specific section, e.g., 'Reorganized Skills to highlight JD-relevant tech first'>"
  ],
  "improvementData": {
    "summary": "<rationale for summary rewrite>",
    "experience": "<rationale for experience improvements>",
    "skills": "<rationale for skills reorganization>",
    "overall": "<overall improvement strategy applied>"
  },
  "newAtsScore": <integer 0-100>
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return parseGeminiJSON(text);
};

export { extractStructuredResume, analyzeResumeVsJob, optimizeResumeContent };