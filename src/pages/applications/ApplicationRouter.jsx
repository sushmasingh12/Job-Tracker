import React from "react";
import { useParams } from "react-router-dom";
import ApplicationsPage from "./ApplicationsPage";
import ApplicationDetails from "../../features/applications/components/ApplicationDetails";

/**
 * ApplicationRouter - Handles routing between applications list and details
 * 
 * Note: The Redux Provider should be at the app root (main.jsx or App.jsx),
 * not here. This component only handles conditional rendering based on route params.
 */
const ApplicationRouter = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
      {id ? <ApplicationDetails /> : <ApplicationsPage />}
    </div>
  );
};

export default ApplicationRouter;
