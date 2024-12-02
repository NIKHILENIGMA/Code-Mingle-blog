import React from "react";
import { Button, Input, Label } from "@/components";
import { useForgotPasswordForm } from "@/features/auth/hooks/useForgotPasswordForm";

const ResetPasswordPage: React.FC = () => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
  useForgotPasswordForm();
  
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-2/5 h-1/3">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <Label>Enter your email address</Label>
          <Input
            typeof="email"
            id="email"
            placeholder="Enter your email address"
            {...register("email")}
          />
          {errors.email && <p> {errors.email.message}</p>}
          <div>
            <Button type="submit">
              {isSubmitting ? "Loading..." : "Reset Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
