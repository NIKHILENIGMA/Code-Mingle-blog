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
import { toast } from "sonner";
import { SiUnsplash } from "react-icons/si";
import Loader from "@/components/Loader/Loader";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Remove cover image from the server
  const handleRemoveCoverImage = async (e: MouseEvent<HTMLButtonElement>) => {
    // Remove cover image from the server
    e.preventDefault();
    if (!id) throw new Error("Draft ID is required to remove cover image");
    await removeDraftCoverImageService(id);
    // Update the selected draft state
    dispatch(updateSelectedDraft({ image: "" }));
    toast.success("Cover image removed successfully", { duration: 3000 });
  };

  return (
    <div className="max-w-4xl p-4 mx-auto md:p-8 ">
      {draftState && draftState.image !== "" && draftState.image !== null ? (
        <div className="relative">
          <img
            src={draftState?.image}
            alt="Cover Image"
            className="object-cover w-full h-auto rounded-lg"
          />
          <Button
            variant={"destructive"}
            onClick={handleRemoveCoverImage}
            className="absolute p-2 px-2 bg-transparent rounded-full top-2 right-2 hover:bg-transparent"
          >
            <Trash2 color="red" />
          </Button>
          {/* <Separator /> */}
        </div>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size={"sm"}>
              <ImagePlus /> Add Cover Image
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader className="px-5">
              <DialogTitle>Add Cover Image</DialogTitle>
              <DialogDescription>
                Add a cover image to your draft to make it more appealing.
              </DialogDescription>
            </DialogHeader>

            <div className="w-full min-h-full p-4 space-y-2 rounded-lg ">
              <div className="flex w-full p-1 space-x-3">
                <Button
                  variant={navigate === "upload" ? "default" : "outline"}
                  onClick={() => setNavigate("upload")}
                >
                  <Upload />
                  Upload
                </Button>
                <Button
                  variant={navigate === "unslash" ? "default" : "outline"}
                  className="overflow-hidden"
                  onClick={() => setNavigate("unslash")}
                >
                  <SiUnsplash />
                  Unsplash
                </Button>
              </div>

              <div className="w-full p-2">
                {navigate === "upload" ? (
                  isLoading ? (
                    <Loader size={16}/>
                  ) : (
                    <UploadImage id={id} onLoading={setIsLoading} />
                  )
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
