import { Button, Input } from "@/components";
import { useSignupForm } from "@/features/auth/hooks/useSignupForm";
import { Link } from "react-router-dom";

function SignupPage(): JSX.Element {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useSignupForm();

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen space-y-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-2/5 p-3 mb-10 space-y-2 h-1/2"
      >
        <h2 className="font-medium text-center uppercase">Signup Form</h2>
        <div>
          <Input
            id="firstName"
            type="text"
            placeholder="First Name"
            className={errors.firstName ? "border-red-500" : "border-gray-300"}
            {...register("firstName")}
          />
          {errors.firstName && <p role="alert" className="text-xs font-normal text-red-700">{errors.firstName.message}</p>}
        </div>
        <div>
          <Input
            id="lastName"
            type="text"
            placeholder="Last Name"
            className={errors.lastName ? "border-red-500" : "border-gray-300"}
            {...register("lastName")}
          />
          {errors.lastName && <p role="alert" className="text-xs font-normal text-red-700">{errors.lastName.message}</p>}
        </div>

        <div>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            className={errors.email ? "border-red-500" : "border-gray-300"}
            {...register("email")}
          />
          {errors.email && <p role="alert" className="text-xs font-normal text-red-700">{errors.email.message}</p>}
        </div>

        <div>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            className={errors.password ? "border-red-500" : "border-gray-300"}
            {...register("password")}
          />
          {errors.password && <p className="text-xs font-normal text-red-700">{errors.password.message}</p>}
        </div>

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Loading....." : "Signup"}
        </Button>
      </form>
      <div>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="font-normal text-violet-600">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
