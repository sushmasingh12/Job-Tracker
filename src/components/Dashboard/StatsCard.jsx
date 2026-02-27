import React from 'react'

const StatsCard = () => {
  return (
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
  )
}

export default StatsCard