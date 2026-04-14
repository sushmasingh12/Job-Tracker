import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import AppLayouts from "./layouts/AppLayouts";
import ProtectedRoute from "./ProtectedRoute";
import AuthInitializer from "../features/auth/components/AuthInitializer";
import { Outlet } from "react-router-dom";
// Lazy loaded pages
const Landing = lazy(() => import("../pages/landingPages/Landing"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const CoverLetter = lazy(() => import("../features/coverLetter/pages/CoverLetter"));
const Interviews = lazy(() => import("../features/interview/pages/Interview"));
const ApplicationRouter = lazy(() =>
  import("../features/applications/pages/ApplicationRouter")
);
const SettingsPage = lazy(() => import("../features/settings/pages/SettingsPage"));

const OptimizeResume = lazy(() =>
  import("../features/resume/components/OptimizeResume")
);
const ApplicationForms = lazy(() =>
  import("../features/applications/pages/ApplicationForms")
);
const DashboardPage = lazy(() =>
  import("../features/dashboard/pages/DashboardPage")
);
const Resume = lazy(() => import("../features/resume/pages/Resume"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
    <div className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
      Loading...
    </div>
  </div>
);

const withSuspense = (Component) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthInitializer><Outlet /></AuthInitializer>}>
      {/* Public Routes */}
      <Route path="/" element={withSuspense(Landing)} />
      <Route path="/signin" element={withSuspense(LoginPage)} />
      <Route path="/signup" element={withSuspense(RegisterPage)} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayouts />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={withSuspense(DashboardPage)} />
        <Route path="/application">
          <Route
          path="applicationform"
          element={withSuspense(ApplicationForms)}
        />
        <Route
          path="applicationspage"
          element={withSuspense(ApplicationRouter)}
        />
        <Route
          path="applicationspage/:id"
          element={withSuspense(ApplicationRouter)}
        />
        </Route>
        

        <Route path="/resume" element={withSuspense(Resume)} />
        <Route
          path="/resume/optimizeResume"
          element={withSuspense(OptimizeResume)}
        />
        <Route path="/cover-letter" element={withSuspense(CoverLetter)} />
        <Route path="/interview-prep" element={withSuspense(Interviews)} />
        <Route path="/settings" element={withSuspense(SettingsPage)} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={withSuspense(NotFoundPage)} />
    </Route>
  )
);