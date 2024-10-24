// Import Packages
import { useState } from "react";
import { EyeOff } from "lucide-react";

// Import Components
import { Input, Label } from "@/components";

// Import Types
import { LoginInputProps } from "@/Types/UserTypes";

function PasswordInput({ register, error }: LoginInputProps): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div>
      <Label htmlFor="password">Password: </Label>
      <div className="relative">
        <Input
          type={isVisible ? "text" : "password"}
          id="password"
          autoComplete="off"
          placeholder="Enter your password"
          {...register("password")}
        />
        <span onClick={handleVisibility}>{<EyeOff />}</span>
      </div>
      {error && <p role="alert">{error?.message}</p>}
    </div>
  );
}

export default PasswordInput;
