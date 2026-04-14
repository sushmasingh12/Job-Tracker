// ─── Base Config ──────────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

/**
 * Returns headers with Content-Type.
 * Authentication is handled via httpOnly cookies (withCredentials).
 */
const getHeaders = () => {
  return {
    "Content-Type": "application/json",
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
    credentials: "include",
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
    credentials: "include",
  });
  return handleResponse(res);
};

export const generateCoverLetterAPI = async (payload) => {
  const res = await fetch(`${BASE_URL}/coverLetter/generate`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
    credentials: "include",
  });
  return handleResponse(res);
};