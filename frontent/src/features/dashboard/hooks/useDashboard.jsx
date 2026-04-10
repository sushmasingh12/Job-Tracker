import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/store/authSlice";
import dashboardService from "../services/dashboardService";

export function useDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [data, setData]       = useState(null);

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const result = await dashboardService.getDashboardSummary();
        setData({
          stats: result.stats,
          recentApps: result.recentApplications,
          trendData: result.trendData,
        });
      } catch (err) {
        setError(err.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    userName: user?.name || user?.firstName || "User",
    todayDate,
    stats: data?.stats || undefined,
    recentApps: data?.recentApps || undefined,
    loading,
    error,
  };
}