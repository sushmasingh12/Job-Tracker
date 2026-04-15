import { Helmet } from "react-helmet-async";
import { useDashboard } from "../hooks/useDashboard";
import StatsCard from "../components/StatsCard";
import RecentApplications from "../components/RecentApplications";
import TrendChart from "../components/TrendChart";
import QuickActions from "../components/QuickActions";

const DashboardPage = () => {
  const {
    userName,
    todayDate,
    stats,
    recentApps,
    trendData,
    loading,
    error,
  } = useDashboard();

  return (
    <>
      <Helmet>
        <title>Dashboard | Job Tracker</title>
        <meta
          name="description"
          content="Track your applications, activity trends, and quick job search actions from your dashboard."
        />
      </Helmet>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="material-symbols-outlined animate-spin text-primary text-4xl">
            progress_activity
          </span>
        </div>
      ) : error ? (
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="text-xl font-bold text-neutral-text">
                  Welcome back, {userName}!
                </h1>
                <p className="text-neutral-muted text-sm mt-1">
                  Today is <span className="font-medium">{todayDate}</span>
                </p>
              </div>
            </div>

            <StatsCard stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7">
                <RecentApplications applications={recentApps} />
              </div>

              <div className="lg:col-span-5 space-y-8">
                <TrendChart data={trendData} />
                <QuickActions />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPage;