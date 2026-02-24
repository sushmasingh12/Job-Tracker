import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route 
} from "react-router-dom"
import './index.css'
import './App.css'

import Dashboard from './components/Dashboard/Dashboard'
import Layout from './Layout/Layout'
import Cover from './components/CoverLetter/Cover'
import Interview from './components/InterviewPrep/Interview'
import SignIn from './pages/Registration/SignIn'
import Landing from './pages/Home/Landing'
import SignUp from './pages/Registration/SignUp'
import ApplicationForm from './components/Applications/ApplicationForm'
import ApplicationDetails from './components/Applications/ApplicationDetails'
import Applications from './components/Applications/Applications'
import CustmizeResume from './components/ResumeBuilder/CustmizeResume'
import OptimizeResume from './components/ResumeBuilder/OptimizeResume'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Landing/>}/>
    <Route path='/login' element={<SignIn/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path="/" element={<Layout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/addAplication" element={<ApplicationForm />} />
      <Route path="/aplications" element={<Applications />} />
      <Route path="/aplicationDetails" element={<ApplicationDetails />} />
      <Route path='/optimizeResume' element={<OptimizeResume/>}/>
      <Route path="/resume-builder" element={<CustmizeResume/>}/>
      <Route path="/cover-letter" element={<Cover/>} />
      <Route path="/interview-prep" element={<Interview />} />
      
    </Route>
    </>
    
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)