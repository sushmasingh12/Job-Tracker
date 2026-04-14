import { useForm} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {
  setCredentials,
  setLoading,
  setError,
  logout as logoutAction,
  selectAuthError,  
  selectAuthLoading,
} from "../store/authSlice";
import { loginUser, logout, registerUser } from "../services/authService";

// ═══════════════════════════════════════════════════════
//  useLogin
// ═══════════════════════════════════════════════════════

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiError = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      const result = await loginUser(data);

      if (result.success) {
        dispatch(
          setCredentials({
            user: result.data,
          })
        );
        navigate("/dashboard");
      } else {
        dispatch(setError(result.message || "Login failed"));
      }
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || err.message || "Login failed")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting:isSubmitting || isLoading,
    apiError,
  };
};

// ═══════════════════════════════════════════════════════
//  useRegister
// ═══════════════════════════════════════════════════════
export const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiError  = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      const {  ...userData } = data;

      const result = await registerUser(userData);

      if (result.success) {
        navigate("/signin", { state: { registered: true } });
      } else {
        dispatch(setError(result.message || "Registration failed"));
      }
    } catch (err) {
      dispatch(
        setError(
          err.response?.data?.message || err.message || "Registration failed"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isSubmitting || isLoading,
    watch,
    apiError,
  };
};

// ═══════════════════════════════════════════════════════
//  useLogout
// ═══════════════════════════════════════════════════════
export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
    dispatch(logoutAction());
    navigate("/");
  };

  return { logout: handleLogout };
};
