import { Helmet } from "react-helmet-async";
import AuthLayout from "../features/auth/components/AuthLayout";
import {
  SignInForm,
  SignInOverlay,
} from "../features/auth/components/LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/signup");
  };

  return (
    <>
      <Helmet>
        <title>Sign In | JobTracker</title>
        <meta
          name="description"
          content="Sign in to your JobTracker account to manage your job applications and optimize your resume."
        />
        <meta name="robots" content="index,follow" />
      </Helmet>

      <AuthLayout mode="login">
        <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
          <SignInForm onCreateAccount={handleCreateAccount} />
          <div className="hidden lg:block bg-white" />
        </div>

        <div className="hidden lg:block">
          <SignInOverlay onCreateAccount={handleCreateAccount} />
        </div>

        <div className="lg:hidden">
          <SignInOverlay onCreateAccount={handleCreateAccount} />
        </div>
      </AuthLayout>
    </>
  );
};

export default LoginPage;