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
      className={`p-2 flex-1 text-muted-foreground rounded-md transition ${
        isActive ? "bg-primary rounded-lg p-2 text-white " : ""
      }`}
    >
      {icon}
    </Button>
  );
};

export default ToolbarButton;
