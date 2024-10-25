import { resetPassword } from "@/services/api/authServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

type ResetPasswordFormData = z.infer<typeof schema>;

export const useResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
  });

  // Api call to reset password
  const { mutateAsync: resetPasswordMutation } = useMutation({
    mutationFn: ({ email }: ResetPasswordFormData) =>
      resetPassword(email),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log(data);
    resetPasswordMutation({ email: data.email });
    reset();
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
};
