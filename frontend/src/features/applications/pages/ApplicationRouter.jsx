import { useParams } from "react-router-dom";
import ApplicationsPage from "./ApplicationsPage";
import ApplicationDetails from "../components/ApplicationDetails";

const ApplicationRouter = () => {
  const { id } = useParams();
  return id ? <ApplicationDetails /> : <ApplicationsPage />;
};

export default ApplicationRouter;