import React, { useRef } from "react";
import { Button, Input } from "@/components";
import { useDispatch } from "react-redux";
import { setCoverImage } from "../../slices/blogSlice";

const UploadImage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const url = file ? URL.createObjectURL(file) : null;
    // const trimUrl = url?.split("blob:")[1] ?? "";
    if (url) {
      dispatch(setCoverImage({ coverImageUrl: url }));
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-2">
      <div className="flex items-center justify-center w-full ">
        <Input
          id="upload"
          type="file"
          ref={fileInputRef}
          placeholder="Upload Image"
          onChange={handleFile}
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="secondary"
          className="w-full"
        >
          Upload Image
        </Button>
      </div>
    </div>
  );
};

export default UploadImage;
