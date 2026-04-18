import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../features/auth/components/AuthLayout";
import {
  SignUpForm,
  SignUpOverlay,
} from "../features/auth/components/RegisterForm";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signin");
  };

  return (
    <>
      <Helmet>
        <title>Create Your Account | JobTracker</title>
        <meta
          name="description"
          content="Create a JobTracker account to start tracking applications and landing more interviews with AI-powered tools."
        />
        <meta name="robots" content="index,follow" />
      </Helmet>

      <AuthLayout mode="register">
        <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-white" />
          <SignUpForm onSignIn={handleSignUp} />
        </div>

        <div className="hidden lg:block">
          <SignUpOverlay onSignIn={handleSignUp} />
        </div>

        <div className="lg:hidden">
          <SignUpOverlay onSignIn={handleSignUp} />
        </div>
      </AuthLayout>
    </>
  );
};

export default RegisterPage;