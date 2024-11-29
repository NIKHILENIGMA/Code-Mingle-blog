import { Button, Input, Label } from "@/components";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import { Link } from "react-router-dom";

function LoginPage(): JSX.Element {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useLoginForm();

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen ">
      <h2 className="font-medium uppercase">Login Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/5 space-y-3 h-1/2">
        {/* Email field */}
        <div>
          <Label>Email: </Label>
          <Input
          type="email"
          placeholder="Enter your email"
          id="email"
          className={errors?.email ? "border-red-500" : "border-gray-300"}
          {...register("email")}
          />
          {errors?.email && <p>{errors.email?.message}</p>}
        </div>
        
        {/* Password field */}
        <div>
          <Label>Password: </Label>
          <Input
          type="password"
          placeholder="Enter your password"
          id="password"
          className={errors?.password ? "border-red-500" : "border-gray-300"}
          {...register("password")}
          />
          {errors?.password && <p>{errors.password?.message}</p>}
        </div>
        
        {/* Forgot password link */}
        <div>
          <p className="text-sm font-light">
            Forgot your password?{" "}
            <Link to="/forgot-password" className="font-normal text-violet-600">Reset it here</Link>
          </p>
        </div>

        {/* Submit button */}
        <div>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading....." : "Login"}
          </Button>
        </div>
      </form>

      {/* Signup link */}
      <div className="">
        <p className="text-sm font-light">
          Don't have an account?{" "}
          <Link to="/signup" className="font-normal text-violet-600">Signup here</Link>
        </p>  
      </div>
    </div>
  );
}

export default LoginPage;
