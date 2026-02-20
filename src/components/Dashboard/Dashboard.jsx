import React from "react";

const Dashboard = () => {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl font-bold text-neutral-text">
              Welcome back, John!
            </h1>
            <p className="text-neutral-muted text-sm mt-1">
              Today is{" "}
              <span className="font-medium">Tuesday, October 24, 2023</span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-neutral-surface rounded-xl p-6 shadow-sm border border-neutral-border hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-neutral-muted">
                  Total Applications
                </p>
                <h3 className="text-xl font-bold text-neutral-text mt-2">42</h3>
              </div>
              <div className="p-1 bg-blue-50 text-blue-600 rounded-lg">
                <span className="material-symbols-outlined">folder_open</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span className="text-neutral-muted">Lifetime total</span>
            </div>
          </div>
          <div className="bg-neutral-surface rounded-xl p-6 shadow-sm border border-neutral-border hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-neutral-muted">This Week</p>
                <h3 className="text-xl font-bold text-neutral-text mt-2">8</h3>
              </div>
              <div className="p-1 bg-purple-50 text-purple-600 rounded-lg">
                <span className="material-symbols-outlined">calendar_today</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs gap-1">
              <span className="text-success flex items-center font-medium bg-success/10 px-1.5 py-0.5 rounded">
                <span className="material-symbols-outlined text-sm mr-0.5">
                  trending_up
                </span>
                12%
              </span>
              <span className="text-neutral-muted">vs last week</span>
            </div>
          </div>
          <div className="bg-neutral-surface rounded-xl p-6 shadow-sm border border-neutral-border hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-neutral-muted">Interviews</p>
                <h3 className="text-xl font-bold text-neutral-text mt-2">5</h3>
              </div>
              <div className="p-1 bg-orange-50 text-orange-600 rounded-lg">
                <span className="material-symbols-outlined">
                  video_camera_front
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span className="text-warning font-medium">2 scheduled soon</span>
            </div>
          </div>
          <div className="bg-neutral-surface rounded-xl p-6 shadow-sm border border-neutral-border hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-neutral-muted">
                  Response Rate
                </p>
                <h3 className="text-xl font-bold text-neutral-text mt-2">14%</h3>
              </div>
              <div className="p-1 bg-green-50 text-green-600 rounded-lg">
                <span className="material-symbols-outlined">mark_email_read</span>
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs gap-1">
              <span className="text-success flex items-center font-medium bg-success/10 px-1.5 py-0.5 rounded">
                <span className="material-symbols-outlined text-sm mr-0.5">
                  arrow_upward
                </span>
                2.1%
              </span>
              <span className="text-neutral-muted">vs avg</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-neutral-text">
                Recent Applications
              </h2>
              <a
                className="text-sm font-medium text-primary hover:text-primary-dark hover:underline"
                href="#"
              >
                View All
              </a>
            </div>
            <div className="space-y-4">
              <div className="bg-neutral-surface border border-neutral-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-colors shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-gray-400">
                    domain
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-neutral-text truncate">
                    Senior Product Designer
                  </h4>
                  <p className="text-sm text-neutral-muted truncate">
                    Google • Mountain View, CA
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Applied
                  </span>
                  <span className="text-xs text-neutral-muted">Oct 24</span>
                </div>
              </div>
              <div className="bg-neutral-surface border border-neutral-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-colors shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-gray-400">
                    business
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-neutral-text truncate">
                    Frontend Developer
                  </h4>
                  <p className="text-sm text-neutral-muted truncate">
                    Stripe • Remote
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    Interview
                  </span>
                  <span className="text-xs text-neutral-muted">Oct 22</span>
                </div>
              </div>
              <div className="bg-neutral-surface border border-neutral-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-colors shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-gray-400">
                    apartment
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-neutral-text truncate">
                    UX Researcher
                  </h4>
                  <p className="text-sm text-neutral-muted truncate">
                    Airbnb • San Francisco, CA
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Reviewing
                  </span>
                  <span className="text-xs text-neutral-muted">Oct 20</span>
                </div>
              </div>
              <div className="bg-neutral-surface border border-neutral-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-colors shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-gray-400">
                    storefront
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-neutral-text truncate">
                    Product Manager
                  </h4>
                  <p className="text-sm text-neutral-muted truncate">
                    Shopify • Ottawa, ON
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Rejected
                  </span>
                  <span className="text-xs text-neutral-muted">Oct 18</span>
                </div>
              </div>
              <div className="bg-neutral-surface border border-neutral-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-colors shadow-sm">
                <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-gray-400">
                    hub
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-base font-semibold text-neutral-text truncate">
                    Design System Lead
                  </h4>
                  <p className="text-sm text-neutral-muted truncate">
                    Figma • Remote
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Applied
                  </span>
                  <span className="text-xs text-neutral-muted">Oct 15</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-neutral-surface rounded-xl border border-neutral-border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-neutral-text">
                  Application Trend
                </h3>
                <select className="text-xs border-neutral-border rounded-lg text-neutral-muted focus:ring-primary focus:border-primary bg-transparent py-1 pl-2 pr-6">
                  <option>Last 30 Days</option>
                  <option>Last 3 Months</option>
                </select>
              </div>
              <div className="relative h-48 w-full flex items-end justify-between px-2 gap-2">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div className="border-t border-dashed border-neutral-border w-full h-0"></div>
                  <div className="border-t border-dashed border-neutral-border w-full h-0"></div>
                  <div className="border-t border-dashed border-neutral-border w-full h-0"></div>
                  <div className="border-t border-dashed border-neutral-border w-full h-0"></div>
                </div>
                <div className="w-full h-full flex items-end justify-between z-10 pt-4">
                  <div className="w-[8%] bg-primary/20 hover:bg-primary/40 rounded-t-sm h-[20%] transition-all relative group">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      2 apps
                    </div>
                  </div>
                  <div className="w-[8%] bg-primary/20 hover:bg-primary/40 rounded-t-sm h-[40%] transition-all relative group">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      4 apps
                    </div>
                  </div>
                  <div className="w-[8%] bg-primary/20 hover:bg-primary/40 rounded-t-sm h-[30%] transition-all relative group">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      3 apps
                    </div>
                  </div>
                  <div className="w-[8%] bg-primary/20 hover:bg-primary/40 rounded-t-sm h-[60%] transition-all relative group">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      6 apps
                    </div>
                  </div>
                  <div className="w-[8%] bg-primary/20 hover:bg-primary/40 rounded-t-sm h-[45%] transition-all relative group">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      5 apps
                    </div>
                  </div>
                  <div className="w-[8%] bg-primary/20 hover:bg-primary/40 rounded-t-sm h-[25%] transition-all relative group">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      2 apps
                    </div>
                  </div>
                  <div className="w-[8%] bg-primary/20 hover:bg-primary/40 rounded-t-sm h-[80%] transition-all relative group">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      8 apps
                    </div>
                  </div>
                  <div className="w-[8%] bg-primary hover:bg-primary-dark rounded-t-sm h-[50%] transition-all relative group">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      5 apps
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-neutral-muted px-2">
                <span>Sep 24</span>
                <span>Oct 01</span>
                <span>Oct 08</span>
                <span>Oct 15</span>
                <span>Oct 24</span>
              </div>
            </div>
            <div className="bg-linear-to-br from-neutral-surface to-background-light rounded-xl border border-neutral-border p-6 shadow-sm">
              <h3 className="text-lg font-bold text-neutral-text mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full group flex items-center justify-between p-4 rounded-lg bg-white border border-neutral-border hover:border-primary hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">
                        auto_fix_high
                      </span>
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-neutral-text">
                        Generate Cover Letter
                      </h4>
                      <p className="text-xs text-neutral-muted">
                        AI-powered customization
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-neutral-muted group-hover:text-primary transition-colors">
                    chevron_right
                  </span>
                </button>
                <button className="w-full group flex items-center justify-between p-4 rounded-lg bg-white border border-neutral-border hover:border-primary hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">
                        edit_document
                      </span>
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-semibold text-neutral-text">
                        Customize Resume
                      </h4>
                      <p className="text-xs text-neutral-muted">
                        Tailor for specific job
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-neutral-muted group-hover:text-primary transition-colors">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
            <div className="bg-blue-600 rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-bold mb-1">Pro Tip</h4>
                <p className="text-sm text-blue-100 mb-3">
                  Following up within 3 days increases response rates by 15%.
                </p>
                <a
                  className="text-xs font-bold underline decoration-blue-300 hover:text-blue-100"
                  href="#"
                >
                  View follow-up templates
                </a>
              </div>
              <div className="absolute -bottom-6 -right-6 text-blue-500 opacity-30 rotate-12">
                <span className="material-symbols-outlined text-9xl">
                  lightbulb
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
