import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Job Tracker</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-8 bg-background-light dark:bg-background-dark">
        <div className="max-w-md w-full text-center">
          {/* Animated 404 Header */}
          <div className="relative mb-8">
            <h1 className="font-playfair text-[120px] font-black leading-none text-primary/10 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-[80px] text-primary animate-pulse">
                explore_off
              </span>
            </div>
          </div>

          <h2 className="font-playfair text-[32px] font-bold text-neutral-text mb-4 tracking-tight">
            Oops! Lost in the search?
          </h2>
          
          <p className="text-neutral-muted text-[16px] leading-relaxed mb-10 font-light">
            The page you're looking for has vanished into the job market. 
            Don't worry, even the best candidates take a wrong turn sometimes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-medium text-primary bg-primary-light border-[1.5px] border-primary/20 rounded-xl cursor-pointer transition-all duration-200 hover:bg-primary-light/80 hover:border-primary/40 active:scale-95"
            >
              Go Back
            </button>
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-medium text-white bg-primary border-[1.5px] border-primary rounded-xl cursor-pointer transition-all duration-200 shadow-[0_4px_14px_rgba(25,118,210,0.3)] hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(25,118,210,0.4)] active:scale-95"
            >
              Back to Home
            </Link>
          </div>

          {/* Subtle Decorative Elements */}
          <div className="mt-16 pt-8 border-t border-neutral-border flex items-center justify-center gap-8">
            <div className="flex flex-col items-center opacity-40">
              <span className="material-symbols-outlined text-[20px] mb-1">track_changes</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest leading-none">Track</span>
            </div>
            <div className="flex flex-col items-center opacity-40">
              <span className="material-symbols-outlined text-[20px] mb-1">psychology</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest leading-none">Optimize</span>
            </div>
            <div className="flex flex-col items-center opacity-40">
              <span className="material-symbols-outlined text-[20px] mb-1">verified</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest leading-none">Win</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
