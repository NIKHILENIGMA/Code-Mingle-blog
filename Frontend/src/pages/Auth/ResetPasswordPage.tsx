import { Button, Input, Label } from "@/components";
import { useResetPasswordForm } from "@/features/auth/hooks/useResetPasswordForm";
import React from "react";

const ResetPasswordPage: React.FC = () => {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useResetPasswordForm();

  return (
    <div className="w-full h-screen">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>New Password</Label>
          <Input
            typeof="password"
            id="password"
            placeholder="Enter your new password"
            {...register("password")}
          />
          {errors.password && <p> {errors.password.message}</p>}

          <Label>Confirm New Password</Label>
          <Input
            typeof="password"
            id="confirmPassword"
            placeholder="Confirm your new password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p> {errors.confirmPassword.message}</p>}
          <div>
            <Button type="submit">
              {isSubmitting ? "Loading..." : "confirm"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
