import React from "react";
import { Input, Label } from "@/components";
import { FieldError, UseFormRegister } from "react-hook-form";

interface LoginInputProps {
  type: string;
  label: string;
  placeholder: string;
  register: UseFormRegister<{
    email: string;
    password: string;
  }>;
  error?: FieldError;
  name: "email" | "password";
}

export const LoginInput: React.FC<LoginInputProps> = ({
  type,
  label,
  placeholder,
  register,
  error,
  name,
}) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <Input
      type={type}
      id={name}
      placeholder={placeholder}
      {...register(name)}
    />
    {error && <p role="alert">{error.message}</p>}
  </div>
);
