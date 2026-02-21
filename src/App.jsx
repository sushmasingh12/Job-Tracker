import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./pages/Home/Landing";
import Header from "./pages/navbar/Header";
import Sidebar from "./pages/navbar/Sidebar";
import './App.css'
import Login from "./pages/Registration/SignIn";
import SignUp from "./pages/Registration/SignUp";
import AuthLayout from "./pages/Registration/AuthLayout";
import AddAplication from "./components/Dashboard/AddAplication";
import Resume from "./components/ResumeBuilder/Resume";
import OptimizeResume from "./components/ResumeBuilder/OptimizeResume";
import Cover from "./components/CoverLetter/Cover";
import ReviewCover from "./components/CoverLetter/ReviewCover";
import Interview from "./components/InterviewPrep/Interview";




function App() {
  

  return (
    <>
    
    <Sidebar/>
    <div class="flex-1  lg:ml-64  flex flex-col h-screen overflow-hidden">
    <Header/>
    {/* <Resume/> */}
    {/* <OptimizeResume/> */}
    {/* <Dashboard/> */}
    {/* <Cover/> */}
    {/* <ReviewCover/> */}
    <Interview/>
    </div>
    {/* <Landing/> */}
    {/* <Login/> */}
  {/* <SignUp/> */}
    {/* <AddAplication/> */}
  
    </>
  )
}

export default App
