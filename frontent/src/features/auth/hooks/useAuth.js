import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials, setLoading, setError, logout as logoutAction } from "../store/authSlice";
import { registerUser, loginUser, logout } from "../services/authService";

export const useLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setSubmitting
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data) => {
        try {
            dispatch(setLoading(true));
            const result = await loginUser(data);
            
            if (result.success) {
                dispatch(setCredentials({
                    user: result.user,
                    token: result.token
                }));
                navigate("/dashboard");
            } else {
                dispatch(setError(result.message || "Login failed"));
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Login failed";
            dispatch(setError(errorMessage));
        } finally {
            setSubmitting(false);
            dispatch(setLoading(false));
        }
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isSubmitting,
    };
};

export const useRegister = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        setSubmitting
    } = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmpassword: "",
        }
    });

    const onSubmit = async (data) => {
        try {
            dispatch(setLoading(true));
            
            // Remove confirmpassword before sending to API
            const { confirmpassword, ...userData } = data;
            
            const result = await registerUser(userData);
            
            if (result.success) {
                dispatch(setCredentials({
                    user: result.user,
                    token: result.token
                }));
                navigate("/dashboard");
            } else {
                dispatch(setError(result.message || "Registration failed"));
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Registration failed";
            dispatch(setError(errorMessage));
        } finally {
            setSubmitting(false);
            dispatch(setLoading(false));
        }
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isSubmitting,
        watch,
    };
};

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

