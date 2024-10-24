import React from "react";
import { Input, Label } from "@/components";
import { LoginInputProps } from "@/Types/UserTypes";

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
