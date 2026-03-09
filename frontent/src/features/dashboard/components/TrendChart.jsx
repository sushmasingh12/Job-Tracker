
import { useState } from "react";


const CHART_DATA = {
  "Last 30 Days": [
    { label: "Sep 24", apps: 2, height: "20%" },
    { label: "",       apps: 4, height: "40%" },
    { label: "",       apps: 3, height: "30%" },
    { label: "Oct 01", apps: 6, height: "60%" },
    { label: "",       apps: 5, height: "45%" },
    { label: "",       apps: 2, height: "25%" },
    { label: "Oct 08", apps: 8, height: "80%" },
    { label: "Oct 24", apps: 5, height: "50%", active: true },
  ],
  "Last 3 Months": [
    { label: "Aug",  apps: 5,  height: "25%" },
    { label: "",     apps: 8,  height: "40%" },
    { label: "",     apps: 12, height: "60%" },
    { label: "Sep",  apps: 18, height: "75%" },
    { label: "",     apps: 14, height: "55%" },
    { label: "",     apps: 10, height: "45%" },
    { label: "Oct",  apps: 20, height: "90%" },
    { label: "Now",  apps: 8,  height: "35%", active: true },
  ],
};

// ─── TrendChart ───────────────────────────────────────────────────────────────
const TrendChart = () => {
  const [period, setPeriod] = useState("Last 30 Days");
  const bars = CHART_DATA[period];

  return (
    <div className="bg-neutral-surface rounded-xl border border-neutral-border p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-neutral-text">Application Trend</h3>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="text-xs border border-neutral-border rounded-lg text-neutral-muted focus:ring-primary focus:border-primary bg-transparent py-1 pl-2 pr-6 cursor-pointer"
        >
          {Object.keys(CHART_DATA).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
      </div>

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
      <div className="flex justify-between mt-2 text-xs text-neutral-muted px-2">
        {bars
          .filter((b) => b.label)
          .map((b, i) => (
            <span key={i}>{b.label}</span>
          ))}
      </div>
    </div>
  );
};

export default TrendChart;