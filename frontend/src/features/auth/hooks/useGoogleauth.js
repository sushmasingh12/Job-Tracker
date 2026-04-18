import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/authSlice";

const API_URL = import.meta.env.VITE_API_URL; 

const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",  
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || "Google login failed");
      }

     dispatch(
        setCredentials({
          user: result.data,
        })
      );
      // Navigate to dashboard
      navigate("/dashboard");
      return result.data; // user object return karega
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google Sign-In was unsuccessful. Please try again.");
  };

  return { handleGoogleSuccess, handleGoogleError, loading, error };
};

export default useGoogleAuth;