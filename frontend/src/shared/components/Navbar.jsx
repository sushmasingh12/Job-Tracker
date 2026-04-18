import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="min-h-16 bg-neutral-surface border-b border-neutral-border sticky top-0 z-30 px-3 sm:px-4 md:px-6 py-3 md:py-0 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 shrink-0">
      
      <div className="w-full md:flex-1 md:max-w-lg md:mx-4 lg:mx-8 relative order-2 md:order-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-neutral-muted text-xl">
          search
        </span>

        <input
          className="w-full pl-10 pr-12 py-2 bg-background-light border-none rounded-lg text-sm focus:ring-2 focus:ring-primary placeholder-neutral-muted"
          placeholder="Search applications, companies..."
          type="text"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-xs text-neutral-muted border border-neutral-border rounded px-1.5 py-0.5 bg-white">
          <span className="text-[10px]">⌘</span>
          <span>K</span>
        </div>
      </div>

      <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-2 sm:gap-3 md:gap-4 order-1 md:order-2">
        <button className="relative p-2 text-neutral-muted hover:text-primary hover:bg-background-light rounded-full transition-colors shrink-0">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 h-2 w-2 bg-danger rounded-full ring-2 ring-white"></span>
        </button>

        <button
          onClick={() => navigate("/application/applicationform")}
          className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-3 sm:px-4 rounded-lg shadow-md shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm w-auto sm:w-auto"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          <span className="hidden sm:inline">Add Application</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;