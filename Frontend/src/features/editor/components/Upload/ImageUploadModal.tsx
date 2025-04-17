import { FC, useState, useRef, ChangeEvent, useCallback } from "react";
import { Button, Input, Label } from "@/components";
import { Separator } from "@/components/ui/separator";
import { Plus, Upload } from "@/Utils/Icons";

interface ImageUploadModalProps {
  error: string | null;
  updateAttributes: (attributes: { src: string; alt: string }) => void;
  onModalChange: (show: boolean) => void;
}

const ImageUploadModal: FC<ImageUploadModalProps> = ({
  error,
  updateAttributes,
  onModalChange,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [navigation, setNavigation] = useState<"upload" | "url">("upload");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleNavigation = (name: "upload" | "url") => {
    setNavigation(name);
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = useCallback(() => {
    if (image) {
      updateAttributes({
        src: image,
        alt: "Image",
      });
      onModalChange(false);
    }
  }, [image, updateAttributes, onModalChange]);

  return (
    <div className="absolute w-full top-[110%] rounded-md flex flex-col justify-center items-center space-y-4 p-5 bg-card border border-secondary/50 shadow-md backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="w-full flex items-center justify-start space-x-4 relative">
        <Button
          variant={"secondary"}
          onClick={() => handleToggleNavigation("upload")}
          className={`${
            navigation === "upload"
              ? "bg-secondary/20 text-primary border border-primary/40"
              : ""
          } hover:bg-card/50 `}
        >
          Upload Image
        </Button>
        <Button
          variant={"secondary"}
          onClick={() => handleToggleNavigation("url")}
          className={`${
            navigation === "url"
              ? "bg-secondary/20 text-primary border border-primary/40"
              : ""
          } hover:bg-card/50 `}
        >
          Embbed Image
        </Button>

        <div className="absolute top-0 right-4 rounded-lg transition-transform duration-200 transform translate-x-0">
          <Button
            className="bg-transparent hover:bg-card/50 text-muted-foreground"
            onClick={() => onModalChange(false)}
          >
            <Plus color="red" className="rotate-45" />
          </Button>
        </div>
      </div>
      <Separator />

      {navigation === "upload" ? (
        <div className="w-full flex flex-col items-center justify-center space-y-4">
          <Label htmlFor="upload-image" className="w-2/3">
            Upload Image
          </Label>
          <Input
            id="upload-image"
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={handleFileChange}
          />
          <div
            className="w-2/3 h-[20vh] flex items-center justify-center space-x-4 border border-dashed px-4 py-2 rounded-lg cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            <h3 className="text-primary text-center">
              Upload Image from <br /> your device
            </h3>
          </div>
          <Button className="w-2/3" onClick={handleUploadImage}>
            <Upload />
            Upload
          </Button>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center space-y-4">
          <Label htmlFor="image-url" className="text-start w-2/3">
            Image URL
          </Label>
          <Input
            type="text"
            id="image-url"
            placeholder="Paste image URL here..."
            onChange={(e) => setImage(e.target.value)}
            className="w-2/3 px-4 py-2 rounded-lg border border-primary/50 focus:border-primary/80 focus:ring-2 focus:ring-primary"
          />
          <Button
            variant={"default"}
            onClick={handleUploadImage}
            className="w-2/3"
          >
            <Upload className="w-5 h-5" />
            <span>Embbed Image</span>
          </Button>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ImageUploadModal;
