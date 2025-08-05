import { Button, Checkbox, Input, Label } from "@/components";
import directUserToGoogleConsentScreen from "@/Utils/OAuth";
import { FC, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { PiEyeClosedThin, PiEyeThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { OAuthState } from '@/features/auth/types/authTypes';
import { authService } from "../services/authApiServices";

interface SignupForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const Signup: FC = () => {
  const [formState, setFormState] = useState<SignupForm>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [isVisible, setVisibility] = useState(false);
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
    const response = await authService.signup(formState);
    if (response.success === false && response.data === null) {
      console.error(response.message);
      return;
    }
    if (response.success === true) {
      navigate("/");
    }
  };

  

  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 py-12">
      {/* Background Grid + Gradient */}
      <div className="absolute inset-0 z-[-1] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[linear-gradient(to_right,#2b2b2b_1px,transparent_1px),linear-gradient(to_bottom,#2b2b2b_1px,transparent_1px)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_30%,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_600px_at_50%_30%,#4f388c,transparent)]"></div>
      </div>
      <div className="w-full max-w-md p-10 space-y-8 rounded-md shadow-md dark:shadow-lg bg-background">
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
            Create an account
          </h2>
          <p className="mt-2 text-sm font-medium text-secondary-foreground/40">
            Enter your details to sign up for a new account.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2 rounded-md">
            <div className="relative flex flex-col space-x-4 md:flex-row md:items-center">
              <div className="relative space-y-1">
                <Label htmlFor="firstName">First Name:</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="off"
                  required
                  placeholder="John"
                  value={formState.firstName}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="relative space-y-1">
                <Label htmlFor="lastName">Last Name:</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="off"
                  required
                  placeholder="Doe "
                  value={formState.lastName}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="relative space-y-1">
              <Label htmlFor="username">Username: </Label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="off"
                required
                placeholder="johndoe123"
                value={formState.username}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="relative space-y-1">
              <Label htmlFor="email">Email:</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                required
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
              <Checkbox id="terms" required />
              <label
                htmlFor="terms"
                className="ml-2 text-sm font-normal leading-snug peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                By signing up, you agree to our{" "}
                <Link
                  to="/terms"
                  className="underline text-primary hover:text-primary/80"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              variant={"default"}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
            >
              <span className="font-medium">Sign up</span>
            </Button>
          </div>
        </form>
        <hr />
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium text-secondary-foreground/40">
            Or continue with
          </p>
          <Button variant={"outline"} className="w-full" onClick={() => directUserToGoogleConsentScreen('signup' as OAuthState)}>
            <FcGoogle /> Sign up with Google
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm font-light text-secondary-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
