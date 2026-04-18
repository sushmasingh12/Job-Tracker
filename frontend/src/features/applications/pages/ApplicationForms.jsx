import { Helmet } from "react-helmet-async";
import ApplicationForm from "../components/ApplicationForm";

const ApplicationForms = () => {
  return (
    <>
      <Helmet>
        <title>Add Application | Job Tracker</title>
        <meta
          name="description"
          content="Add a new job application with role, company, status, and job description details."
        />
        <meta name="robots" content="index,follow" />
      </Helmet>

      <div>
        <ApplicationForm />
      </div>
    </>
  );
};

export default ApplicationForms;
