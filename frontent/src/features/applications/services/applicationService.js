import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: true,
});

const BASE = "/applications";

const GRADIENTS = [
  { from: "from-blue-500", to: "to-purple-500" },
  { from: "from-green-500", to: "to-teal-500" },
  { from: "from-orange-500", to: "to-red-500" },
  { from: "from-pink-500", to: "to-rose-500" },
  { from: "from-violet-500", to: "to-indigo-500" },
  { from: "from-amber-500", to: "to-yellow-400" },
  { from: "from-cyan-500", to: "to-blue-500" },
];

const STATUS_MATCH_META = {
  Applied: { score: 0, label: "New", color: "text-slate-400" },
  Interview: { score: 65, label: "Promising", color: "text-amber-500" },
  Offer: { score: 92, label: "Strong", color: "text-emerald-500" },
  Hired: { score: 100, label: "Excellent", color: "text-purple-500" },
  Rejected: { score: 25, label: "Low", color: "text-red-500" },
};

const pickGradient = (company = "") => {
  const sum = [...company].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return GRADIENTS[sum % GRADIENTS.length];
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const transformApplication = (app = {}) => {
  const gradient = pickGradient(app.company || "");
  const matchMeta = STATUS_MATCH_META[app.status] || STATUS_MATCH_META.Applied;

  return {
    id: app._id || app.id,

    role: app.jobTitle || "",
    company: app.company || "",
    location: app.location || "Not specified",
    workType: app.workType || "On-site",
    appliedDate: formatDate(app.applicationDate),
    salary: app.salaryRange || "Not disclosed",
    status: app.status || "Applied",

    initial: (app.company || "?").charAt(0).toUpperCase(),
    gradientFrom: gradient.from,
    gradientTo: gradient.to,

    description: app.jobDescription || "",
    responsibilities: Array.isArray(app.responsibilities) ? app.responsibilities : [],
    requirements: Array.isArray(app.requirements) ? app.requirements : [],
    benefits: Array.isArray(app.benefits) ? app.benefits : [],

    statusHistory: Array.isArray(app.statusHistory)
      ? app.statusHistory.map((item) => ({
          label: item.label,
          date: formatDate(item.date),
          icon: item.icon,
          color: item.color,
        }))
      : [],

    jobPostUrl: app.jobPostUrl || "",
    notes: app.notes || "",
    jobDescription: app.jobDescription || "",
    applicationDate: app.applicationDate || "",

    coverLetter: app.coverLetter?.content || "",
    coverLetterGeneratedAt: app.coverLetter?.generatedAt || null,

    optimizedResume: app.optimizedResume || null,

    resumeSummary: app.resumeSummary || "",
    matchedSkills: Array.isArray(app.matchedSkills) ? app.matchedSkills : [],
    resumeNotes: app.resumeNotes || "",

    matchScore: matchMeta.score,
    matchLabel: matchMeta.label,
    matchColor: matchMeta.color,
  };
};

const getAll = async (params = {}) => {
  const { data } = await api.get(BASE, {
    params: { limit: 500, ...params },
  });

  return {
    applications: Array.isArray(data?.data)
      ? data.data.map(transformApplication)
      : [],
    total: data?.total || 0,
    stats: Array.isArray(data?.stats) ? data.stats : [],
  };
};

const getById = async (id) => {
  const { data } = await api.get(`${BASE}/${id}`);
  return transformApplication(data?.data);
};

const create = async (payload) => {
  const { data } = await api.post(BASE, payload);
  return transformApplication(data?.data);
};

const update = async (id, payload) => {
  const { data } = await api.put(`${BASE}/${id}`, payload);
  return transformApplication(data?.data);
};

const patchStatus = async (id, status) => {
  const { data } = await api.patch(`${BASE}/${id}/status`, { status });
  return transformApplication(data?.data);
};

const saveCoverLetterToApplication = async (id, content) => {
  const { data } = await api.patch(`${BASE}/${id}/cover-letter`, { content });
  return transformApplication(data?.data);
};

const saveResumeToApplication = async (id, { content,  }) => {
  const { data } = await api.patch(`${BASE}/${id}/resume`, {
    content,
   
  });
  return transformApplication(data?.data);
};

const downloadApplicationMaterial = async (id, type, format = "pdf") => {
  const response = await api.get(`${BASE}/${id}/download/${type}`, {
    params: { format },
    responseType: "blob",
  });

  const blob = new Blob([response.data]);
  const url = window.URL.createObjectURL(blob);

  const ext = format === "docx" ? "docx" : "pdf";
  const a = document.createElement("a");
  a.href = url;
  a.download = `${type}-${id}.${ext}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};

const remove = async (id) => {
  await api.delete(`${BASE}/${id}`);
  return id;
};

const applicationService = {
  getAll,
  getById,
  create,
  update,
  patchStatus,
  saveCoverLetterToApplication,
  saveResumeToApplication,
  downloadApplicationMaterial,
  remove,
};

export default applicationService;
