import DashboardPreference from "./dashboard_Model.js";
import Application from "../applications/app_Model.js";

const getDashboardData = async (userId) => {
  // Aggregate Applications
  const apps = await Application.find({ user: userId }).sort({ applicationDate: -1 });

  // 1. Total Applications
  const totalApplications = apps.length;

  // 2. This Week Applications
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeekApplications = apps.filter(
    (app) => new Date(app.applicationDate) >= oneWeekAgo
  ).length;

  // 3. Interviews
  const upcomingInterviewsCount = apps.filter((app) => app.status === "Interview").length;

  // 4. Response Rate
  const respondedApps = apps.filter(
    (app) => ["Interview", "Offer", "Hired", "Rejected"].includes(app.status)
  ).length;
  const responseRate = totalApplications > 0 ? ((respondedApps / totalApplications) * 100).toFixed(1) : "0";

  // 5. Recent Applications
  const recentApplications = apps.slice(0, 5).map((app) => {
    // Determine icon based on status
    let icon = "domain";
    if (app.status === "Interview") icon = "business";
    else if (app.status === "Offer" || app.status === "Hired") icon = "apartment";
    else if (app.status === "Rejected") icon = "storefront";

    return {
      id: app._id,
      title: app.jobTitle,
      company: app.company,
      location: app.location || "Not specified",
      status: app.status,
      date: new Date(app.applicationDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      icon,
    };
  });

  // 6. Trend Data (Last 7 days)
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(d);
    nextDay.setDate(nextDay.getDate() + 1);

    const count = apps.filter(app => {
      const appDate = new Date(app.applicationDate);
      return appDate >= d && appDate < nextDay;
    }).length;

    last7Days.push({
      label: d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" }),
      apps: count,
      // Calculate height percentage relative to a max (e.g. 10 if we want to scale, or max in set)
      height: count > 0 ? `${Math.min(100, (count / 5) * 100)}%` : "5%", 
      active: i === 0
    });
  }

  return {
    stats: [
      {
        label: "Total Applications",
        value: totalApplications.toString(),
        icon: "folder_open",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        footerText: "Lifetime total",
      },
      {
        label: "This Week",
        value: thisWeekApplications.toString(),
        icon: "calendar_today",
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        footerText: "Applied in last 7 days",
      },
      {
        label: "Interviews",
        value: upcomingInterviewsCount.toString(),
        icon: "video_camera_front",
        iconBg: "bg-orange-50",
        iconColor: "text-orange-600",
        footerText: "Active processes",
      },
      {
        label: "Response Rate",
        value: `${responseRate}%`,
        icon: "mark_email_read",
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
        footerText: "vs total applications",
      },
    ],
    recentApplications,
    trendData: last7Days
  };
};

const dashboardService = {
  getDashboardData,
};

export default dashboardService;
