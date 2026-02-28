import React from 'react'
import {useNavigate}  from 'react-router-dom'
import AuthLayout from '../features/auth/components/AuthLayout'
import { SignUpForm, SignUpOverlay } from '../features/auth/components/RegisterForm'

const RegisterPage = () => {
    const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/login");
  };
  return (
    <AuthLayout>
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="bg-white" />
          <SignUpForm onSignIn={handleSignUp}/>
        </div>
        <SignUpOverlay onSignIn={handleSignUp}/>
    </AuthLayout>
  )
}

export default RegisterPage