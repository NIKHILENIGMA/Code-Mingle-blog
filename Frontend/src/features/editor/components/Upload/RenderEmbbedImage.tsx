import {
  FC,
  MouseEvent,
  useState,
  useCallback,
  useRef,
  ChangeEvent,
} from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { NodeViewProps } from "@tiptap/core";
import { Button, Input, Label } from "@/components";
import { Plus, Upload } from "@/Utils/Icons";
import { Separator } from "@/components/ui/separator";

const RenderEmbbedImage: FC<NodeViewProps> = ({
  editor,
  node,
  updateAttributes,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [bubbleMenu, setBubbleMenu] = useState<boolean>(false);
  const [navigation, setNavigation] = useState<"upload" | "url">("upload");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleNavigation = (name: "upload" | "url") => {
    if (name === "upload") {
      setNavigation(name);
    } else {
      setNavigation(name);
    }
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
      setShowModel(false);
    }
  }, [image, updateAttributes]);

  return (
    <NodeViewWrapper
      className="embbed-image relative max-w-4xl mx-auto my-6"
      contentEditable={false}
    >
      <div className="w-full h-auto relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden hover:border-blue-500 transition-colors duration-200">
        <div className="relative w-full h-auto">
          {!node.attrs.src ? (
            <div
              onClick={() => setShowModel((prev) => !prev)}
              className="w-full p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <h4 className="text-lg font-medium text-gray-600 dark:text-gray-300">
                Add Image
              </h4>
              <p className="text-sm text-gray-400">
                Click to upload or paste URL
              </p>
            </div>
          ) : (
            <div className="w-full h-auto group relative">
              <img
                src={node.attrs.src}
                alt={node.attrs.alt}
                className="w-full h-auto"
                onClick={(e: MouseEvent<HTMLImageElement>) => {
                  e.stopPropagation();
                  setBubbleMenu((prev) => !prev);
                }}
              />
              {bubbleMenu ? (
                <div className="absolute z-40 -top-4 right-[40%] p-2 space-x-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
                  <Button
                    onClick={() => setShowModel((prev) => !prev)}
                    className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .deleteNode("embbed-image")
                        .setImage({ src: "" })
                        .setNode("paragraph")
                        .run()
                    }
                    className="px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900"
                  >
                    Delete
                  </Button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
      {showModel && (
        <div className="absolute w-full top-[110%] rounded-md flex flex-col justify-center items-center space-y-4 p-5 bg-gray-50 dark:bg-gray-800">
          <div className="w-full flex items-center justify-start space-x-4 relative">
            <Button
              variant={"secondary"}
              onClick={() => handleToggleNavigation("upload")}
              className={`${
                navigation === "upload" ? "bg-blue-500 text-white" : ""
              } hover:bg-blue-300`}
            >
              Upload Image
            </Button>
            <Button
              variant={"secondary"}
              onClick={() => handleToggleNavigation("url")}
              className={`${
                navigation === "url" ? "bg-blue-500 text-white" : ""
              }hover:bg-blue-300 `}
            >
              Embbed Image
            </Button>

            <div className="absolute top-0 right-4  rounded-lg transition-transform duration-200 transform translate-x-0">
              <Button
                className="bg-transparent"
                onClick={() => setShowModel(false)}
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
                className="w-2/3 h-[20vh] flex items-center justify-center space-x-4 border border-dashed border-blue-400 text-blue-500 px-4 py-2 rounded-lg cursor-pointer"
                onClick={() => inputRef.current?.click()}
              >
                <h3 className="text-blue-400 text-center">
                  Upload Image from <br /> your device
                </h3>
              </div>
              <Button
                className="w-2/3 flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                onClick={handleUploadImage}
              >
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
                className="w-2/3 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              />
              <Button
                onClick={handleUploadImage}
                className="w-2/3 flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                <Upload className="w-5 h-5" />
                <span>Embbed Image</span>
              </Button>
            </div>
          )}
        </div>
      )}
    </NodeViewWrapper>
  );
};

export default RenderEmbbedImage;
