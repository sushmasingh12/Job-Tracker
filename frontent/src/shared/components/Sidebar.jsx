// shared/components/Sidebar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";

const NAV_LINK_BASE = "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors group";
const NAV_LINK_INACTIVE = "text-slate-400 hover:text-white hover:bg-slate-800";
const NAV_LINK_ACTIVE = "bg-primary/20 text-white";


const navClass = ({ isActive }) =>
  `${NAV_LINK_BASE} ${isActive ? NAV_LINK_ACTIVE : NAV_LINK_INACTIVE}`;

const Sidebar = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <>
      {/* ── Mobile Top Bar ───────────────────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-sidebar flex items-center justify-between px-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl text-primary-light">work_history</span>
          <span className="text-xl font-bold tracking-tight text-white">JobTrackr</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-1 rounded-md hover:bg-slate-700 transition-colors"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {isOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* ── Backdrop ─────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={close}
        />
      )}

      {/* ── Sidebar Panel ────────────────────────────────────────────────── */}
      <div
        className={`
          w-64 bg-sidebar text-white flex flex-col
          fixed inset-y-0 left-0 z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl text-primary-light">work_history</span>
            <span className="text-xl font-bold tracking-tight text-white">JobTrackr</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">

          <NavLink to="/dashboard" onClick={close} className={navClass}>
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </NavLink>

          <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Applications</p>
          </div>

          <NavLink to="/application/applicationForm" onClick={close} className={navClass}>
            <span className="material-symbols-outlined">add_circle</span>
            Add Application
          </NavLink>

          <NavLink to="/application/applicationspage" onClick={close} className={navClass}>
            <span className="material-symbols-outlined">folder_open</span>
            Applications
            <span className="ml-auto bg-primary text-white py-0.5 px-2 rounded-full text-xs">12</span>
          </NavLink>

          <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Tools</p>
          </div>

          <NavLink to="/ai/resume" onClick={close} className={navClass}>
            <span className="material-symbols-outlined">description</span>
            Resume Builder
          </NavLink>

          <NavLink to="/ai/cover-letter" onClick={close} className={navClass}>
            <span className="material-symbols-outlined">auto_fix_high</span>
            Cover Letter
          </NavLink>

          <NavLink to="/ai/interview-prep" onClick={close} className={navClass}>
            <span className="material-symbols-outlined">psychology</span>
            Interview Prep
          </NavLink>

          <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Insights</p>
          </div>

         
          <NavLink to="/analytics" onClick={close} className={navClass}>
            <span className="material-symbols-outlined">analytics</span>
            Analytics
          </NavLink>

          <NavLink to="/settings" onClick={close} className={navClass}>
            <span className="material-symbols-outlined">settings</span>
            Settings
          </NavLink>

        </nav>

        {/* User Footer */}
        <div className="border-t border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary-light font-bold text-sm shrink-0">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-slate-400 truncate">john@example.com</p>
            </div>
            <button className="text-slate-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;