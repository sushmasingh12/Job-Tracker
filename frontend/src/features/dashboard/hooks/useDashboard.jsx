import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../auth/store/authSlice";
import {
  fetchDashboardSummary,
  selectDashboardStats,
  selectDashboardRecentApps,
  selectDashboardTrendData,
  selectDashboardLoading,
  selectDashboardError,
} from "../store/dashboardSlice";

export function useDashboard() {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const data = useSelector((state) => state.dashboard);
  const { loading, error } = data;

  useEffect(() => {
    dispatch(fetchDashboardSummary());
  }, [dispatch]);

  const todayDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  return {
    userName: user?.firstname || user?.firstName || "User",
    todayDate,
    stats: data?.stats ?? null,
    recentApps: data?.recentApps ?? [],
    trendData: data?.trendData ?? [],
    loading,
    error,
  };
}