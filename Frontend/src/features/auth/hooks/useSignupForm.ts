import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { signup } from "@/services/api/authApiServices";
import { useMutation } from "@tanstack/react-query";
import { authSchema } from "@/features/auth/schema/schema";
import { useNavigate } from "react-router-dom";


type SignupFormData = z.infer<typeof authSchema>;

export const useSignupForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(authSchema),
  });

  const navigate = useNavigate();

  const { mutateAsync: signupUserMutation } = useMutation({
    mutationFn: ({ email, password, firstName, lastName }: SignupFormData) =>
      signup({ email, password, firstName, lastName }),
  });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    // Call the signupUserMutation function with the email, password, firstName, and lastName
    await signupUserMutation({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });

    reset();
    
    navigate("/login");
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
};
