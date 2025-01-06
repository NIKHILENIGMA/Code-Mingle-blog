import React from "react";
import { Button } from "@/components";

interface ToolbarButtonProps {
  onClick: () => void;
  isActive: boolean;
  icon: React.ReactNode;
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
      className={isActive ? "bg-black text-slate-200" : ""}
    >
      {icon}
    </Button>
  );
};

export default ToolbarButton;
