// features/dashboard/hooks/useDashboard.js
import { useState, useEffect } from "react";

// ─── useDashboard ─────────────────────────────────────────────────────────────
// Centralizes all dashboard data fetching.
// Replace the mock data with real API calls when backend is ready.
//
// Returns:
//   userName       → string
//   todayDate      → formatted date string
//   stats          → array for StatsCard
//   recentApps     → array for RecentApplications
//   loading        → boolean
//   error          → string | null

export function useDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [data, setData]       = useState(null);

  useEffect(() => {
    // TODO: Replace with real API call
    // e.g. const res = await dashboardService.getSummary();
    const mockFetch = setTimeout(() => {
      setData({
        userName: "John",
        todayDate: new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
      setLoading(false);
    }, 500);

    return () => clearTimeout(mockFetch);
  }, []);

  return {
    userName:   data?.userName ?? "",
    todayDate:  data?.todayDate ?? "",
    loading,
    error,
  };
}