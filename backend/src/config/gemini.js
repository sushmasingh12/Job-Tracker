import { GoogleGenerativeAI } from "@google/generative-ai";

const google_api_key = process.env.GOOGLE_API_KEY;
const gemini_model = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite-preview";

if (!google_api_key) {
  console.warn("WARNING: GOOGLE_API_KEY is not defined in environment variables.");
}

const AVAILABLE_MODELS = [
  process.env.GEMINI_MODEL?.trim() || "gemini-3.1-flash-lite-preview",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-1.5-flash"
];

const genAI = new GoogleGenerativeAI(google_api_key);

/**
 * Get a configured Google Generative AI model instance with fallback support.
 * @param {Object} options - Optional configuration for the model.
 * @returns {Object} Wrapper with generateContent method.
 */
export const getGeminiModel = (options = {}) => {
  return {
    generateContent: async (content) => {
      let lastError;
      
      for (const modelName of AVAILABLE_MODELS) {
        try {
          // console.log(`[Gemini] Attempting with model: ${modelName}`);
          const model = genAI.getGenerativeModel({
            model: modelName,
            ...options
          });
          
          const result = await model.generateContent(content);
          
          // Verify we got a valid response
          if (result && result.response) {
            return result;
          }
        } catch (error) {
          console.error(`[Gemini] Model ${modelName} failed:`, error.message);
          lastError = error;
          // Continue to next model
        }
      }
      
      throw lastError || new Error("All configured Gemini models failed to respond.");
    }
  };
};

export default genAI;
