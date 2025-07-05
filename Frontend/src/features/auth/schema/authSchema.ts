import { z } from "zod";

export const SignupSchema = z.object({
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


export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});



export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

