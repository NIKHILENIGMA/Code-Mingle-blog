import { FC } from "react";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";
import { Clipboard, ClipboardCheck, Pencil, Trash2 } from "@/Utils/Icons";

interface ImageBubbleMenuProps {
  isCopy?: boolean;
  onImageChange: () => void;
  onRemoveImage: () => void;
  onCopyImageUrl: () => void;
}

const ImageBubbleMenu: FC<ImageBubbleMenuProps> = ({
  isCopy = false,
  onCopyImageUrl,
  onImageChange,
  onRemoveImage,
}) => {
  //handleImageChange
  return (
    <div className="absolute z-9999 top-0 right-0 space-x-2 rounded-sm border-secondary/50 p-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"ghost"} className="p-2" onClick={onImageChange}>
              <Pencil size={10} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="z-9999">
            <p>Change Image</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              className="p-2 hover:text-primary/80"
              onClick={onCopyImageUrl}
            >
              {isCopy ? <ClipboardCheck /> : <Clipboard />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="z-9999">
            <p>Copy Image URL</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              className="p-2 hover:text-primary/80"
              onClick={onRemoveImage}
            >
              <Trash2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="z-9999">
            <p>Remove Image</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ImageBubbleMenu;
