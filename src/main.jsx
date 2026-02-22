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
import Resume from './components/ResumeBuilder/Resume'
import Cover from './components/CoverLetter/Cover'
import Interview from './components/InterviewPrep/Interview'
import OptimizeResume from './components/ResumeBuilder/OptimizeResume'
import SignIn from './pages/Registration/SignIn'
import Landing from './pages/Home/Landing'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<Landing/>}/>
    <Route path='/login' element={<SignIn/>}/>
    <Route path="/" element={<Layout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/resume-builder" element={<OptimizeResume/>}/>
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