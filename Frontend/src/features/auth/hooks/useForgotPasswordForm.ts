import { ForgotPasswordResponse } from "../../../services/api/authApiServices";
import { forgotPassword } from "@/services/api/authApiServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { ForgotPasswordSchema } from "@/features/auth/schema/schema";

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

export const useForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  // Api call to reset password
  const { mutateAsync: forgotPasswordMutation } = useMutation({
    mutationFn: async ({ email }: ForgotPasswordFormData) => {
      try {
        return await forgotPassword(email);
      } catch (error) {
        throw new Error(
          `Forgot password service failed: ${(error as Error).message}`
        );
      }
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    try {
      const response = (await forgotPasswordMutation({
        email: data.email,
      })) as ForgotPasswordResponse;
      console.log(data);

      reset();
      return response.token;
    } catch (error) {
      throw new Error(`Failed to reset password: ${(error as Error).message}`);
    }
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
};
