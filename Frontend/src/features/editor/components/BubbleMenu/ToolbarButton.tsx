import React from "react";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";

interface ToolbarButtonProps {
  onClick: () => void;
  isActive: boolean;
  icon: React.ReactNode;
  styles?: string;
  content?: string;
  shortcut?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  isActive,
  icon,
  content = "Tooltip",
  shortcut = "Ctrl + B",
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"link"}
            onClick={onClick}
            className={`p-2 flex-1 text-muted-foreground rounded-md border-none shadow-none hover:bg-primary/10 hover:text-primary transition-colors ${
              isActive ? "bg-primary rounded-lg p-2 text-white " : ""
            }`}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="z-[9999] space-x-3 bg-card border border-secondary/50">
          <div className="flex flex-col items-center space-y-1">
            <p className="text-sm font-medium text-foreground">{content}</p>
            <span className="text-xs text-foreground/30">{shortcut}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolbarButton;
