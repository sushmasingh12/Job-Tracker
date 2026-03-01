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

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<Landing/>}/>
        <Route path="/signin" element={<LoginPage/>}/>
        <Route path="/signup" element={<RegisterPage/>}/>
        <Route element={<AppLayouts/>}>
            <Route path="/dashboard" element={<DashboardPage/>} />
        </Route>
        </>
    )
)