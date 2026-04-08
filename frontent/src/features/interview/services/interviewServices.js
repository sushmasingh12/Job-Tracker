const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const getHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const parseJsonSafely = async (res) => {
  try {
    return await res.json();
  } catch {
    return null;
  }
};

const handleResponse = async (res) => {
  const data = await parseJsonSafely(res);

  if (!res.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
};

export const interviewService = {
  getProfiles: async (token) => {
    const res = await fetch(`${API_BASE}/jobs`, {
      headers: getHeaders(token),
    });
    return handleResponse(res);
  },

  generateQuestions: async (token, payload) => {
    const res = await fetch(`${API_BASE}/interview/generate`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  saveAnswer: async (token, { jobId, questionId, text, rating, notes }) => {
    const res = await fetch(`${API_BASE}/interview/answers`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({ jobId, questionId, text, rating, notes }),
    });
    return handleResponse(res);
  },

  getAnswers: async (token, jobId) => {
    const res = await fetch(`${API_BASE}/interview/answers/${jobId}`, {
      headers: getHeaders(token),
    });
    return handleResponse(res);
  },
};