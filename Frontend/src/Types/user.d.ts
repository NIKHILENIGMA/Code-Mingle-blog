import { FieldError, UseFormRegister } from "react-hook-form";

export type LoginInputProps = {
  type: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<{
    email: string;
    password: string;
  }>;
  error?: FieldError;
  name: "email" | "password";
};

export type SignupInputProps = {
  type: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<{
    email: string;
    password: string;
    firstName: string;
    lastName: string
  }>;
  error?: FieldError;
  name: "email" | "password" | "firstName" | "lastName";
};

export interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatarImg?: string | null;
  coverImg?: string | null;
  createdAt: string;
  updatedAt: string;
}