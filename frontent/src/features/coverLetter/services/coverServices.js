// ─── Base Config ──────────────────────────────────────────────────────────────
import Cookies from "js-cookie";
const BASE_URL = "http://localhost:8000/api";

/**
 * Reads the JWT from localStorage.
 *
 * Tumhare existing auth setup ke hisaab se change karo:
 *  - Agar token directly store hai:   localStorage.getItem('token')
 *  - Agar userInfo object mein hai:   JSON.parse(localStorage.getItem('userInfo'))?.token
 *
 * Dono try karta hai — jo bhi milega woh use hoga.
 */
const getToken = () => Cookies.get("auth_token") || ""; 

/**
 * Returns headers with Content-Type + Authorization.
 * Agar token nahi mila to Authorization header skip hoga.
 */
const getHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP error: ${res.status}`);
  }
  return res.json();
};

// ─── Generate Cover Letter ────────────────────────────────────────────────────

/**
 * Wizard data Gemini ke paas bhejta hai, generated letter string return karta hai.
 * @param {{ jobDetails, experience, tone }} payload
 * @returns {Promise<string>} generated letter text
 */


// ─── Download Cover Letter ────────────────────────────────────────────────────

/**
 * Cover letter ko PDF ya DOCX ke roop mein download karta hai.
 * @param {{ content: string, format: "pdf"|"docx", jobTitle: string }} param0
 */
export const downloadCoverLetterAPI = async ({ content, format, jobTitle }) => {
  const res = await fetch(`${BASE_URL}/coverLetter/download`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ content, format }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Download failed");
  }

  // Browser download trigger from blob
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${jobTitle || "coverLetter"}.${format}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

// ─── Save to Application ──────────────────────────────────────────────────────

/**
 * Generated letter ko user ke application record mein save karta hai.
 * @param {{ letterId?: string, content: string }} payload
 * @returns {Promise<{ id: string }>}
 */


export const saveCoverLetterAPI = async (payload) => {
  const res = await fetch(`${BASE_URL}/coverLetter/save`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};

export const generateCoverLetterAPI = async (payload) => {
  const res = await fetch(`${BASE_URL}/coverLetter/generate`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
};