import { Button, Input, Label } from "@/components";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { PiEyeClosedThin } from "react-icons/pi";
import { PiEyeThin } from "react-icons/pi";
import { useAuthContext } from "@/hooks/useAuthContext";
import { FcGoogle } from "react-icons/fc";

const Login: React.FC = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [isVisible, setVisibility] = useState(false);
  const { login, loading } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(formState.email, formState.password);

    const from = (location.state as { from?: Location })?.from?.pathname || "/";
    navigate(from, { replace: true });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-12">
      {/* Background Grid + Gradient */}
      <div className="absolute inset-0 z-[-1] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,#2b2b2b_1px,transparent_1px),linear-gradient(to_bottom,#2b2b2b_1px,transparent_1px)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_30%,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_600px_at_50%_30%,#4f388c,transparent)]"></div>
      </div>
      <div className="w-full max-w-md p-10 space-y-8 rounded-md shadow-md bg-background">
        <div className="text-center">
          {/* //todo add logo */}
          {/* <div>
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-12 h-12 mx-auto mb-4"
                />
            </div> */}
          <h2 className="mt-6 text-3xl font-extrabold text-secondary-foreground">
            Welcome back!
          </h2>
          <p className="mt-2 text-sm font-medium text-secondary-foreground/40">
            Enter your email and password to log in to your account.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5 rounded-md">
            <div className="relative space-y-1">
              <Label htmlFor="email">Email:</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                required
                autoFocus
                placeholder="johndoe@example.com"
                value={formState.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="relative space-y-1">
              <span
                onClick={() => setVisibility(!isVisible)}
                className="absolute transform -translate-y-1/2 cursor-pointer right-3 top-3/4"
              >
                {isVisible ? <PiEyeClosedThin /> : <PiEyeThin />}
              </span>
              <Label htmlFor="password">Password:</Label>
              <Input
                id="password"
                name="password"
                type={isVisible ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="*********"
                value={formState.password}
                className="bg-card"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Checkbox id="remember-me" defaultChecked />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-primary hover:text-primary/80"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant={"default"}
              className="w-full bg-primary text-primary-foreground hover:bg-secondary"
            >
              {loading ? <span>Login...</span> : "Login"}
            </Button>
          </div>
        </form>
        <hr />
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-secondary-foreground/40">
            Or continue with
          </p>
          <Button variant={"outline"} className="w-full" onClick={() => {}}>
            <FcGoogle /> Continue with Google
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm font-light text-secondary-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary hover:text-primary/80"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
