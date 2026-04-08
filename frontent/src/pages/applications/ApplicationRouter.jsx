import React from "react";
import { useParams } from "react-router-dom";
import ApplicationsPage from "./ApplicationsPage";
import ApplicationDetails from "../../features/applications/components/ApplicationDetails";

// Route: /application/applicationspage       → ApplicationsPage (list)
// Route: /application/applicationspage/:id   → ApplicationDetails (single)
const ApplicationRouter = () => {
  const { id } = useParams();
  return id ? <ApplicationDetails /> : <ApplicationsPage />;
};

export default ApplicationRouter;