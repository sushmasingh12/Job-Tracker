import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import Landing from "../pages/landingPages/Landing";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AppLayouts from "./layouts/AppLayouts";
import DashboardPage from "../pages/DashboardPage";
import ApplicationForm from "../pages/applications/ApplicationForms";
import Resume from "../pages/ai/Resume";
import CoverLetter from "../pages/ai/CoverLetter";
import Interview from "../pages/ai/Interview";
import ApplicationRouter from "../pages/applications/ApplicationRouter";



export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<Landing/>}/>
        <Route path="/signin" element={<LoginPage/>}/>
        <Route path="/signup" element={<RegisterPage/>}/>
        <Route element={<AppLayouts/>}>
            <Route path="/dashboard" element={<DashboardPage/>} />
            <Route path="/application/applicationForm" element={<ApplicationForm/>}/>
            <Route path="/application/applicationspage" element={<ApplicationRouter/>}/>
            <Route path="/application/applicationspage/:id" element={<ApplicationRouter/>}/>
            <Route path="/ai/resume" element={<Resume/>}/>
            <Route path="/ai/cover-letter" element={<CoverLetter/>}/>
            <Route path="/ai/interview-prep" element={<Interview/>}/>
        </Route>
        </>
    )
)