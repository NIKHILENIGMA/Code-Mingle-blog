import { FC } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { NOT_AUTHENTICATED_OPTIONS } from "@/constants/HeaderConstants";

const NotAuthenticated: FC = () => {
  const navigate = useNavigate();
  const handleClick = (to: string) => {
    navigate(to);
  };
  return (
    <div className="flex space-x-3 items-center justify-around text-xl">
      {NOT_AUTHENTICATED_OPTIONS.map((option, index) => (
        <Button
          key={index}
          onClick={() => handleClick(option?.to)}
          variant={option?.variant}
        >
          {option?.name}
        </Button>
      ))}
    </div>
  );
};

export default NotAuthenticated;
