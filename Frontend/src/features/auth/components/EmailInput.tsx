import React from "react";
import { Input, Label } from "@/components";
import { LoginInputProps } from "@/Types/UserTypes";

export const EmailInput: React.FC<LoginInputProps> = ({ register, error }) => {
  return (
    <div>
      <Label htmlFor="email">Email </Label>
      <Input
        type="text"
        id="email"
        placeholder="Enter your Email"
        {...register("email")}
      />
      {error && <p role="alert">{error.message}</p>}
    </div>
  );
};

