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
        catch(error){
            console.log(error.message)
        }
    };

    return {
        register,
        handleSubmit:handleSubmit(onSubmit),
        errors,
        isSubmitting,
    };
}
