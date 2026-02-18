import React from "react";
import {  NavLink } from "react-router-dom";


const Sidebar = () => {
  return (
    <>
    <div  className="w-64 bg-sidebar text-white flex flex-col fixed inset-y-0 left-0 z-50">
      
      <div className="h-16 flex items-center px-6 border-b border-slate-700">
        <div className="flex items-center gap-2 text-primary-light">
          <span className="material-symbols-outlined text-3xl">work_history</span>
          <span className="text-xl font-bold tracking-tight text-white">
            JobTrackr
          </span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <NavLink
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-primary/20 text-white"
          
        >
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </NavLink>
        <NavLink
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors group"
          
        >
          <span className="material-symbols-outlined group-hover:text-white">
            folder_open
          </span>
          Applications
          <span className="ml-auto bg-primary text-white py-0.5 px-2 rounded-full text-xs">
            12
          </span>
        </NavLink>
        <div className="pt-4 pb-2">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            AI Tools
          </p>
        </div>
        <NavLink
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors group"
          
        >
          <span className="material-symbols-outlined group-hover:text-white">
            description
          </span>
          Resume Builder
        </NavLink>
        <NavLink
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors group"
          
        >
          <span className="material-symbols-outlined group-hover:text-white">
            auto_fix_high
          </span>
          Cover Letter
        </NavLink>
        <NavLink
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors group"
          
        >
          <span className="material-symbols-outlined group-hover:text-white">
            psychology
          </span>
          Interview Prep
        </NavLink>
        <div className="pt-4 pb-2">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Insights
          </p>
        </div>
        <NavLink
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors group"
          
        >
          <span className="material-symbols-outlined group-hover:text-white">
            analytics
          </span>
          Analytics
        </NavLink>
        <NavLink
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors group"
          
        >
          <span className="material-symbols-outlined group-hover:text-white">
            settings
          </span>
          Settings
        </NavLink>
      </nav>
      <div className="border-t border-slate-700 p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary-light font-bold text-sm">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">John Doe</p>
            <p className="text-xs text-slate-400 truncate">john@example.com</p>
          </div>
          <button className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>

  </div>
  
  
 
  
  
    </>
    
  );
};

export default Sidebar;
