import { FC } from "react";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";
import { Link } from "@/Utils/Icons";
import { Editor } from "@tiptap/core";

interface TooltipLinkProps {
  editor: Editor;
  onToggleModal: () => void;
}

const TooltipLink: FC<TooltipLinkProps> = ({ editor, onToggleModal }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"link"}
            onClick={() => onToggleModal()}
          >
            <Link
              className={`${
                editor.isActive("link")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="z-9999 space-x-3 bg-card border border-secondary/50"
        >
          <div className="flex flex-col items-center space-y-1">
            <p className="text-sm font-medium text-foreground">Link</p>
            <span className="text-xs text-foreground/30">Ctrl + K</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipLink;
