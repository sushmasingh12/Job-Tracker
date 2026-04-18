import { GoogleGenerativeAI } from "@google/generative-ai";

const google_api_key = process.env.GOOGLE_API_KEY;
const gemini_model = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite-preview";

if (!google_api_key) {
  console.warn("WARNING: GOOGLE_API_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(google_api_key);

/**
 * Get a configured Google Generative AI model instance.
 * @param {Object} options - Optional configuration for the model.
 * @returns {import("@google/generative-ai").GenerativeModel}
 */
export const getGeminiModel = (options = {}) => {
  return genAI.getGenerativeModel({
    model: gemini_model,
    ...options
  });
};

export default genAI;
