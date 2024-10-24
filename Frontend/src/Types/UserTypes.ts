import { FieldError, UseFormRegister } from "react-hook-form";

export type LoginFormInputs = {
  email: string;
  password: string;
};

export type LoginInputProps = {
  register: UseFormRegister<{ email: string; password: string }>;
  error?: FieldError;
};
