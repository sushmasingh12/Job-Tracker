import React from 'react'
import { useDashboard } from '../features/dashboard/hooks/usedashboard';
import StatsCard from '../features/dashboard/components/StatsCard';
import RecentApplications from '../features/dashboard/components/RecentApplications';
import TrendChart from '../features/dashboard/components/TrendChart';
import QuickActions from '../features/dashboard/components/QuickActions';

const DashboardPage = () => {
  const { userName, todayDate, stats, recentApps, trendData, loading } = useDashboard()

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">
          progress_activity
        </span>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
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

        {/* ── Stats Row ── */}
        
        <StatsCard stats={stats} />

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Recent Applications */}
          <div className="lg:col-span-7">
            <RecentApplications applications={recentApps} />
          </div>

          {/* Right: Trend + Quick Actions */}
          <div className="lg:col-span-5 space-y-8">
            <TrendChart data={trendData} />
            <QuickActions />
          </div>

        </div>
      </div>
    </div>
  );
}

export default DashboardPage;