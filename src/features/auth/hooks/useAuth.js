import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState:{errors, isSubmitting},
    } = useForm({
        defaultValues:{
            email:"",
            password:""
        },
    });

    const onSubmit = (data) =>{
        try{
            console.log(data)
            navigate("/dashboard")
        }
        catch(err){
            console.error(err.message);
        }
    };

    return {
        register,
        handleSubmit:handleSubmit(onSubmit),
        errors,
        isSubmitting,
    };
}

export const useRegister = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState:{errors, isSubmitting}
    } = useForm({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmpassword: "",
          },
    });
    const onSubmit = (data) => {
        try {
            console.log(data)    
            navigate("/login");
          } catch (err) {
            console.error(err.message);
          }
    }
    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isSubmitting,
        watch,                          
      };
}
