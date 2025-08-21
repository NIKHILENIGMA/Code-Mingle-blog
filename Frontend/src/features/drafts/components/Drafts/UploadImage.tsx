import { FC } from "react";
import { uploadDraftCoverImageService } from "@/services/api/draftApiServices";
import { useDispatch } from "react-redux";
import { updateSelectedDraft } from "../../slices/draftSlice";
import { Input } from "@/components";
import { Upload } from "@/Utils/Icons";
import { useFileUpload } from "@/hooks/useFileUpload";
import { toast } from "sonner";

interface UploadImageProps {
  id: string;
  onLoading: (loading: boolean) => void; // Optional loading state handler
}

const UploadImage: FC<UploadImageProps> = ({ id, onLoading }) => {
  const dispatch = useDispatch();
  const { selectFile, loading, handleFileChange } = useFileUpload({
    fileName: "draftCoverImg",
    onUploadService: uploadDraftCoverImageService,
    onUploadSuccess: (response) => {
      onLoading(loading);
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
      const { image } = response;
      dispatch(updateSelectedDraft({ image }));
      toast.success("Image uploaded successfully!");
    },
  });

  return (
    <div className="flex flex-col space-y-2 rounded-lg">
      <div
        className="w-full h-[35vw] flex justify-center items-start border-2 bg-background text-muted-foreground border-dashed rounded-lg space-x-3 p-5"
        onClick={() => selectFile.current?.click()}
      >
        <div className="flex flex-col items-center space-y-2 justify-center w-full h-full">
          <Upload />
          <h2 className="text-xl">Upload your image here</h2>
        </div>
      </div>
      <Input
        type="file"
        className="hidden"
        ref={selectFile}
        onChange={(e) => handleFileChange(e, id)}
      />
    </div>
  );
};

export default UploadImage;
