import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../services/authService";
import {
  setCredentials,
  setInitialized,
  selectIsInitialized,
} from "../store/authSlice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const isInitialized = useSelector(selectIsInitialized);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await getCurrentUser();
        // Backend returns user data in 'data' field
        if (response.success && response.data) {
          dispatch(setCredentials({ user: response.data }));
        } else {
          dispatch(setInitialized(true));
        }
      } catch (error) {
        // If it's a 401, we just initialize without credentials (not logged in)
        if (error.response?.status === 401) {
          console.log("No active session found (User is not logged in)");
        } else {
          console.error("Session verification failed:", error);
        }
        dispatch(setInitialized(true));
      }
    };

    if (!isInitialized) {
      verifySession();
    }
  }, [dispatch, isInitialized]);

  return children;
};

export default AuthInitializer;