import { FC } from "react";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";
import { Pencil, Trash2 } from "@/Utils/Icons";

interface ImageBubbleMenuProps {
  onImageChange: () => void;
  onRemoveImage: () => void;
}

const ImageBubbleMenu: FC<ImageBubbleMenuProps> = ({
  onImageChange,
  onRemoveImage,
}) => {
  //handleImageChange
  return (
    <div className="absolute z-[9999] top-0 left-[40%] space-x-4 bg-card rounded-sm border border-secondary/50 shadow-lg p-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"secondary"} 
            onClick={onImageChange}
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="z-[9999]">
            <p>Change Image</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"secondary"}
              onClick={onRemoveImage}
              className="px-4 py-2 text-sm"
            >
              <Trash2 color="red" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="z-[9999]">
            <p>Remove Image</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ImageBubbleMenu;
