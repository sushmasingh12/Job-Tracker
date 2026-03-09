import React from "react";
import { STATUS_CONFIG } from "../contants/Applicationconstants";


const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Applied"];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.badgeCls}`}
    >
      {cfg.dotColor && <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotColor}`} />}
      {cfg.icon && (
        <span className="material-symbols-outlined text-[14px]">{cfg.icon}</span>
      )}
      {status}
    </span>
  );
};

export default StatusBadge;