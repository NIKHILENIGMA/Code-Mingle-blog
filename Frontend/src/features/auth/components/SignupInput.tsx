// components/TextInput.tsx

import React from "react";
import { Input, Label } from "@/components";
import { SignupInputProps } from "@/Types/UserTypes";

export const SignupInput: React.FC<SignupInputProps> = ({
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
