import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { signup } from "@/services/api/authServices";
import { useMutation } from "@tanstack/react-query";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address, please provide a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  firstName: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters" }),
});

type SignupFormData = z.infer<typeof schema>;

export const useSignupForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: signupUserMutation } = useMutation({
    mutationFn: ({ email, password, firstName, lastName }: SignupFormData) =>
      signup({ email, password, firstName, lastName }),
  });

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    console.log(data);

    signupUserMutation({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    reset();
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
};
