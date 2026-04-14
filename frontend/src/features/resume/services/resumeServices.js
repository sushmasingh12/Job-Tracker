import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const resumeApi = axios.create({
  baseURL: `${API_URL}/resume`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const fetchResumesService = async () => {
  const { data } = await resumeApi.get("/list");
  return data;
};

export const uploadResumeService = async ({ file }) => {
  const formData = new FormData();
  formData.append("resume", file);

  const { data } = await resumeApi.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
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
    }
  );

  return data;
};

export const optimizeResumeService = async ({
  resumeId,
  jobDescription,
}) => {
  const { data } = await resumeApi.post(
    "/optimize",
    {
      resumeId,
      jobDescription,
    }
  );

  return data;
};

export const downloadResumeService = async ({ resumeId, format = "pdf" }) => {
  const { data } = await resumeApi.get(`/download/${resumeId}`, {
    params: { format },
  });

  return data;
};

export const getResumeFileService = async ({ resumeId }) => {
  const response = await resumeApi.get(`/file/${resumeId}`, {
    responseType: "blob",
  });

  return response.data;
};