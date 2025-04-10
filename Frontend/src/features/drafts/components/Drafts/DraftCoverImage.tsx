import { FC, MouseEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components";
import { removeDraftCoverImageService } from "@/services/api/draftApiServices";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ImagePlus, Trash2, Upload } from "@/Utils/Icons";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedDraft } from "@/features/drafts/slices/draftSlice";
import { RootState } from "@/app/store/store";
import UnsplashImage from "./UnsplashImage";
import UploadImage from "./UploadImage";
import { Separator } from '@/components/ui/separator';

type Navigation = "upload" | "unslash";

interface DraftCoverImageProps {
  id: string;
}
const DraftCoverImage: FC<DraftCoverImageProps> = ({ id }) => {
  const [navigate, setNavigate] = useState<Navigation>("upload");
  const dispatch = useDispatch();
  const draftState = useSelector(
    (state: RootState) => state?.draft?.selectedDraft
  );

  // Handle navigation between upload and unsplash
  const handleNavigation = (path: Navigation) => {
    setNavigate(path);
  };

  // Remove cover image from the server
  const handleRemoveCoverImage = async (e: MouseEvent<HTMLButtonElement>) => {
    // Remove cover image from the server
    e.preventDefault();
    if (!id) throw new Error("Draft ID is required to remove cover image");
    await removeDraftCoverImageService(id);
    // Update the selected draft state
    dispatch(updateSelectedDraft({ image: "" }));
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto ">
      {draftState && draftState.image !== "" && draftState.image !== null ? (
        <div className="relative">
          <img
            src={draftState?.image}
            alt="Cover Image"
            className="w-full h-auto rounded-lg object-cover"
          />
          <Button
            variant={"destructive"}
            onClick={handleRemoveCoverImage}
            className="absolute top-2 right-2 bg-white text-red-500 border border-red-500 rounded-full p-2 "
          >
            <Trash2 color="red" />
          </Button>
          <Separator />
        </div>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size={"sm"}>
              <ImagePlus /> Add Cover Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Add Cover Image</DialogTitle>
              <DialogDescription>
                Add a cover image to your draft to make it more appealing.
              </DialogDescription>
            </DialogHeader>

            <div className=" w-full p-4 rounded-lg min-h-full space-y-2">
              <div className="flex space-x-3 w-full p-1">
                <Button onClick={() => handleNavigation("upload")}>
                  <Upload />
                  Upload
                </Button>
                <Button
                  className="overflow-hidden"
                  onClick={() => handleNavigation("unslash")}
                >
                  <img
                    src="unsplash.svg"
                    alt="unsplash-icon"
                    className="w-10 h-10 object-cover"
                  />
                  Unsplash
                </Button>
              </div>

              <div className="w-full p-2">
                {navigate === "upload" ? (
                  <UploadImage id={id} />
                ) : (
                  <UnsplashImage id={id} />
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DraftCoverImage;
