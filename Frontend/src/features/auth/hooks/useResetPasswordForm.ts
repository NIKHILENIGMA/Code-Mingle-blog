import { resetPassword } from "@/services/api/authServices";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResetPasswordSchema } from "@/features/auth/schema/schema";

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

/**
 * Custom hook that provides a form to reset password.
 *
 * @returns An object containing the `register`, `handleSubmit`, `errors`, `isSubmitting`, and `onSubmit` function.
 *
 *
 * @throws Will throw an error if the reset password service fails.
 */

export const useResetPasswordForm = () => {
  // Register the form with the zod schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  // Api call to reset password
  const { mutateAsync: resetPasswordMutation } = useMutation({
    mutationFn: async ({
      password,
      confirmPassword,
    }: ResetPasswordFormData) => {
      try {
        return await resetPassword(password, confirmPassword);

      } catch (error) {
        throw new Error(
          `Reset password service failed: ${(error as Error).message}`
        );
      }
    },
  });

  // Submit the form
  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    try {
      await resetPasswordMutation(data);
      reset();
      
    } catch (error) {
        throw new Error(`Failed to reset password: ${(error as Error).message}`);
    }
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
};
