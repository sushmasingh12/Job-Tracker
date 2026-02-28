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
import LoginPage from './pages/LoginPage'



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    
    <Route path='/' element={<LoginPage/>}/>
    
    
    </>
    
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)