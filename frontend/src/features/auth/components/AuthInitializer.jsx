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
        if (response.success && response.user) {
          dispatch(setCredentials({ user: response.user }));
        } else {
          dispatch(setInitialized(true));
        }
      } catch (error) {
        console.error("Session verification failed:", error);
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