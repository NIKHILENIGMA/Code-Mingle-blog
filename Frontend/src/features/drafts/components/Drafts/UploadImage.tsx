import { uploadDraftCoverImageService } from "@/services/api/draftApiServices";
import { ChangeEvent, FC, MouseEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSelectedDraft } from "../../slices/draftSlice";
import { Button, DialogClose, Input } from "@/components";
import { Trash2, Upload } from "@/Utils/Icons";

interface UploadImageProps {
  id: string;
}

const UploadImage: FC<UploadImageProps> = ({ id }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  // Remove selected file
  const handleRemoveFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedFile(null);
  };

  // Handle file change event
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  // Upload cover image to the server
  const handleUploadCoverImage = async (e: MouseEvent<HTMLButtonElement>) => {
    // Upload cover image to the server
    e.stopPropagation();
    e.preventDefault();

    const formData = new FormData();
    formData.append("draftCoverImg", selectedFile!);

    if (!id) throw new Error("Draft ID is required to upload cover image");

    const coverImgURL = await uploadDraftCoverImageService(id, formData);

    if (!coverImgURL) return;

    dispatch(updateSelectedDraft({ image: coverImgURL?.image }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  };
  return (
    <div className="flex flex-col space-y-2 rounded-lg">
      <div
        className="w-full h-[35vw] flex justify-center items-start bg-blue-100 border-[1px] border-blue-500 border-dashed rounded-lg space-x-3 p-5"
        onClick={() => inputRef.current?.click()}
      >
        {selectedFile ? (
          <div className="w-[80%] h-[95%] relative flex flex-col justify-center items-center space-y-4">
            <Button
              className="absolute top-2 right-2"
              onClick={handleRemoveFile}
            >
              <Trash2 />
            </Button>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected file"
              className="w-full h-full object-cover rounded-lg"
            />
            <DialogClose asChild>
              <Button
                type="button"
                onClick={handleUploadCoverImage}
              >
                Upload
              </Button>
            </DialogClose>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2 justify-center w-full h-full">
            <Upload />
            <h2 className="text-xl">Upload your image here</h2>
          </div>
        )}
      </div>
      <Input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadImage;
