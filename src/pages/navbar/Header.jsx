import React from "react";
import {Link } from "react-router-dom";

const Header = () => {
  return (
    
        <header className="h-16 bg-neutral-surface border-b border-neutral-border sticky top-0 z-30 px-6 flex items-center justify-between shrink-0">
      <nav className="flex items-center text-sm font-medium text-neutral-muted">
        <Link className="hover:text-primary transition-colors" href="#">
          Home
        </Link>
        <span className="mx-2 text-neutral-border">/</span>
        <span className="text-neutral-text">Dashboard</span>
      </nav>
      <div className="flex-1 max-w-lg mx-8 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-neutral-muted text-xl">
          search
        </span>
        <input
          className="w-full pl-10 pr-12 py-2 bg-background-light border-none rounded-lg text-sm focus:ring-2 focus:ring-primary placeholder-neutral-muted"
          placeholder="Search applications, companies..."
          type="text"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-neutral-muted border border-neutral-border rounded px-1.5 py-0.5 bg-white">
          <span className="text-[10px]">⌘</span>
          <span>K</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-neutral-muted hover:text-primary hover:bg-background-light rounded-full transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 h-2 w-2 bg-danger rounded-full ring-2 ring-white"></span>
        </button>
        <button className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg shadow-md shadow-primary/20 transition-all active:scale-95 flex items-center gap-2 text-sm">
          <span className="material-symbols-outlined text-lg">add</span>
          Add Application
        </button>
      </div>
    </header>
    
    
  );
};

export default Header;
