import { FC } from "react";
import { Button } from "@/components";
import { useNavigate } from "react-router-dom";

const PreviewToggleDevice: FC<{
  onToggle: (device: "laptop" | "mobile") => void;
}> = ({ onToggle }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-center w-full gap-10 p-5 text-2xl font-semibold text-white">
      <Button onClick={() => navigate(-1)}>Back</Button>
      <Button className="" onClick={() => onToggle("laptop")}>
        Laptop
      </Button>
      <Button className="" onClick={() => onToggle("mobile")}>
        Mobile
      </Button>
    </div>
  );
};

export default PreviewToggleDevice;
