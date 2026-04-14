import { useState } from "react";

// ─── TrendChart ───────────────────────────────────────────────────────────────
const TrendChart = ({ data = [] }) => {
  const bars = data;

  return (
    <div className="bg-neutral-surface rounded-xl border border-neutral-border p-6 shadow-sm min-h-[300px] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-neutral-text">Application Trend</h3>
        <span className="text-xs text-neutral-muted bg-neutral-muted/10 px-2 py-1 rounded">
          Last 7 Days
        </span>
      </div>

      {data.length > 0 ? (
        <>
          {/* Chart */}
          <div className="relative h-48 w-full flex items-end justify-between px-2 gap-2">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border-t border-dashed border-neutral-border w-full h-0" />
              ))}
            </div>

            {/* Bars */}
            <div className="w-full h-full flex items-end justify-between z-10 pt-4">
              {bars.map((bar, i) => (
                <div
                  key={i}
                  className={`w-[8%] rounded-t-sm transition-all relative group ${
                    bar.active
                      ? "bg-primary hover:bg-primary-dark"
                      : "bg-primary/20 hover:bg-primary/40"
                  }`}
                  style={{ height: bar.height }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-neutral-800 text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                    {bar.apps} apps
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between mt-2 text-[10px] text-neutral-muted px-2 overflow-hidden">
            {bars.map((b, i) => (
              <span key={i} className="truncate max-w-[40px]">{b.label}</span>
            ))}
          </div>
        </>
      ) : (
        <div className="h-48 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-4xl text-neutral-muted mb-2">
              bar_chart
            </span>
            <p className="text-neutral-muted text-xs">No trend data available yet</p>
        </div>
      )}
    </div>
  );
};

export default TrendChart;