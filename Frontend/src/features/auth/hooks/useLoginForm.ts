import { login } from "@/services/api/authServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginFormInputs = z.infer<typeof schema>;

export const useLoginForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
      } = useForm<LoginFormInputs>({
        resolver: zodResolver(schema),
      });
    
      const {mutateAsync: loginUserMutation} = useMutation({
        mutationFn: ({email, password}: LoginFormInputs) =>login(email, password),
      })
      
      const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        loginUserMutation({email: data.email, password: data.password});
        reset();
      };
  return { register, handleSubmit, errors, isSubmitting, onSubmit };
};
