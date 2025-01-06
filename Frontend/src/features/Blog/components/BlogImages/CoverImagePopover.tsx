import React from "react";
import { Upload, ImageIcon } from "@/Utils/Icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UploadImage from "@/features/Blog/components/BlogImages/UploadImage";
import UploadUnslashImage from "@/features/Blog/components/BlogImages/UploadUnslashImage";
import { Button } from "@/components";

interface CoverImagePopoverProps {
  className: string
}


const CoverImagePopover: React.FC<CoverImagePopoverProps> = ({ className }) => {
  const [unsplashed, setUnsplashed] = React.useState<boolean>(false);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    setUnsplashed("Unsplash" === e.currentTarget.innerText);
  };
  
  return (
    <Popover>
      <PopoverTrigger className="flex justify-center w-1/5 px-3 py-1 font-medium rounded-lg hover:bg-slate-200">Add Cover</PopoverTrigger>

      <PopoverContent className={`${className} w-[50vw] h-full ml-[10vw]`}>
        <div className="flex items-center justify-start w-full space-x-4 h-1/4">
          <Button onClick={(e) => handleToggle(e)}>
            {" "}
            <Upload  color="white" size="80" />
            Upload
          </Button>
          <Button onClick={(e) => handleToggle(e)}>
            <ImageIcon color="white" size="80" />
            Unsplash
          </Button>
        </div>

        <div className="w-full h-1/2">
          {unsplashed ? <UploadUnslashImage /> : <UploadImage />}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CoverImagePopover;
