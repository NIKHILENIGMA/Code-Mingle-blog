import { Button } from "@/components";
import { LoginInput } from "@/features/auth/components/LoginInput";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";

function LoginPage(): JSX.Element {
  const { register, handleSubmit, errors, isSubmitting, onSubmit } =
    useLoginForm();

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <h2>Login Form</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-2/3 h-1/2"
      >
        {/* Email field */}
        <LoginInput
          type="email"
          label="Email"
          placeholder="Enter your email"
          name="email"
          register={register}
          error={errors?.email}
        />
        {/* Password field */}
        <LoginInput
          type="password"
          label="Password"
          placeholder="Enter your password"
          name="password"
          register={register}
          error={errors?.password}
        />
        <div>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading....." : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
