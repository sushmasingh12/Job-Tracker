const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
  };
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
  getProfiles: async () => {
    const res = await fetch(`${API_BASE}/applications`, {
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(res);
  },

  generateQuestions: async (payload) => {
    const res = await fetch(`${API_BASE}/interview/generate`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
      credentials: 'include',
    });
    return handleResponse(res);
  },

  saveAnswer: async ({ jobId, questionId, text, rating, notes }) => {
    const res = await fetch(`${API_BASE}/interview/answers`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ jobId, questionId, text, rating, notes }),
      credentials: 'include',
    });
    return handleResponse(res);
  },

  getAnswers: async (jobId) => {
    const res = await fetch(`${API_BASE}/interview/answers/${jobId}`, {
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(res);
  },

  getHistory: async () => {
    const res = await fetch(`${API_BASE}/interview/history`, {
      headers: getHeaders(),
      credentials: 'include',
    });
    return handleResponse(res);
  },
};