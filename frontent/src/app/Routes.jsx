import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Landing from "../pages/landingPages/Landing";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AppLayouts from "./layouts/AppLayouts";
import DashboardPage from "../pages/DashboardPage";
import ApplicationForm from "../pages/applications/ApplicationForms";
import Resume from "../pages/ai/Resume";
import CoverLetter from "../pages/ai/CoverLetter";
import Interviews from "../pages/ai/Interview";
import ApplicationRouter from "../pages/applications/ApplicationRouter";
import Analytics from "../pages/ai/Analytics";
import SettingsPage from "../pages/SettingsPage";
import ProtectedRoute from "./ProtectedRoute";
import OptimizeResume from "../features/resume/components/OptimizeResume";
import ApplicationForms from "../pages/applications/ApplicationForms";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayouts />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        
        <Route path="/application/applicationform" element={<ApplicationForms />} />
        <Route path="/application/applicationspage" element={<ApplicationRouter />} />
        <Route path="/application/applicationspage/:id" element={<ApplicationRouter />} />
        <Route path="/ai/resume" element={<Resume />} />
        <Route path="/ai/resume/optimizeResume" element={<OptimizeResume />} />
        <Route path="/ai/cover-letter" element={<CoverLetter />} />
        <Route path="/ai/interview-prep" element={<Interviews />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </>
  )
);