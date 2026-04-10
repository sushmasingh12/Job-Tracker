import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: true,
});

const getDashboardSummary = async () => {
  const { data } = await api.get("/dashboard/summary");
  return data.data;
};

const dashboardService = {
  getDashboardSummary,
};

export default dashboardService;
