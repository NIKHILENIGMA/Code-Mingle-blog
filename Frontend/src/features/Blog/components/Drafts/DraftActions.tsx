import { FC } from "react";
import { ScanEye, ChevronDown, CloudUpload } from "@/Utils/Icons";
import { Button } from "@/components";
import PublishButton from "./PublishButton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const DraftActions: FC = () => {
  const handlePublish = () => {
    console.log("Publish");
  };

  const saveStatus = useSelector((state: RootState) => state.draft.saveDraft);

  
  return (
    <div className="fixed top-0 z-10 flex items-center justify-end w-full h-16 px-4 backdrop:blur-md ">
      <div className="flex items-center justify-center h-full px-3 space-x-2 md:w-1/4 lg:w-1/3">
        {saveStatus ? (
          <div className="flex items-center justify-center h-full px-3 space-x-2 md:w-1/4 lg:w-1/3 animate-in">
            <p className="flex items-center w-32 text-green-500 justify-evenly text-md">
              <CloudUpload stroke="#00C55E" size={32} /> Saved
            </p>
          </div>
        ): <div className="flex items-center justify-center h-full px-3 space-x-2 md:w-1/4 lg:w-1/3">Saving...</div>}

        <Button variant="ghost">
          <ChevronDown />
        </Button>

        <Button variant="secondary" onClick={handlePublish}>
          <ScanEye /> Preview
        </Button>

        <PublishButton />
      </div>
    </div>
  );
};

export default DraftActions;
