import React from "react";
import { Button } from "@/components";

interface ToolbarButtonProps {
  onClick: () => void;
  isActive: boolean;
  icon: React.ReactNode;
  styles?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  isActive,
  icon,
}) => {
  return (
    <Button
      variant={"link"}
      onClick={onClick}
      className={`p-2 flex-1 text-gray-300 hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#0E0A06] rounded-md transition ${
        isActive ? "bg-orange-400 rounded-lg p-2 text-black" : ""
      }`}
    >
      {icon}
    </Button>
  );
};

export default ToolbarButton;
