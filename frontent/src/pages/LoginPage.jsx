import React from 'react'
import AuthLayout from '../features/auth/components/AuthLayout'
import { SignInForm, SignInOverlay } from '../features/auth/components/LoginForm'
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    
    const navigate = useNavigate()
  const handleCreateAccount = ()=> {
    navigate("/signup")
  }
  return (
    <AuthLayout mode='login'>
        <div className="absolute inset-0 grid grid-cols-2">
            <SignInForm onCreateAccount={handleCreateAccount} />
          <div className="bg-white" /> 
          
        </div>
        <SignInOverlay onCreateAccount={handleCreateAccount}/>

        
    </AuthLayout>
  )
}

export default LoginPage