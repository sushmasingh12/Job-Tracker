import React from "react";
import { Provider } from "react-redux";
import { useParams } from "react-router-dom";
import ApplicationsPage from "./ApplicationsPage";
import store from "../../features/applications/store/store";
import ApplicationDetails from "../../features/applications/components/ApplicationDetails";

const ApplicationRouter = () => {
  const { id } = useParams();
  return (
    
        <Provider store={store}>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
          {id ? <ApplicationDetails /> : <ApplicationsPage />}
          </div>
        </Provider>
      
  )
}

export default ApplicationRouter