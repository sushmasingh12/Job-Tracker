import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const TOKEN_KEY = "auth_token";

const resumeApi = axios.create({
  baseURL: `${API_URL}/resume`,
  headers: {
    "Content-Type": "application/json",
  },
});

resumeApi.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const fetchResumeTemplatesService = async () => {
  const { data } = await resumeApi.get("/templates");
  return data;
};

export const fetchResumesService = async () => {
  const { data } = await resumeApi.get("/list");
  return data;
};

export const uploadResumeService = async ({ file }) => {
  const formData = new FormData();
  formData.append("resume", file);

  const token = Cookies.get(TOKEN_KEY);

  const { data } = await axios.post(`${API_URL}/resume/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    withCredentials: true,
  });

  return data;
};

export const analyzeResumeService = async ({
  resumeId,
  jobDescription,
  jobTitle = "",
}) => {
  const { data } = await resumeApi.post(
    "/analyze",
    {
      resumeId,
      jobDescription,
      jobTitle,
    },
    {
      withCredentials: true,
    }
  );

  return data;
};

export const optimizeResumeService = async ({
  resumeId,
  jobDescription,
  template = "modern",
}) => {
  const { data } = await resumeApi.post(
    "/optimize",
    {
      resumeId,
      jobDescription,
      template,
    },
    {
      withCredentials: true,
    }
  );

  return data;
};

export const downloadResumeService = async ({ resumeId, format = "pdf" }) => {
  const { data } = await resumeApi.get(`/download/${resumeId}`, {
    params: { format },
    withCredentials: true,
  });

  return data;
};

export const getResumeFileService = async ({ resumeId }) => {
  const response = await resumeApi.get(`/file/${resumeId}`, {
    responseType: "blob",
    withCredentials: true,
  });

  return response.data;
};