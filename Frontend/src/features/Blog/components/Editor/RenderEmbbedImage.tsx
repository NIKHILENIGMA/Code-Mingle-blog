import { FC, useState } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { NodeViewProps } from "@tiptap/core";
import { Image } from "@/Utils/Icons";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/components";

interface RenderEmbbedImageProps extends NodeViewProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  showPreview: boolean;
  name: string;
}
const RenderEmbbedImage: FC<NodeViewProps> = ({ node, updateAttributes }) => {
  const {
    src,
    alt,
    width = 560,
    height = 315,
    showPreview,
  } = node.attrs as RenderEmbbedImageProps;
  const [url, setURL] = useState<string>(src);

  const handleImageUpload = () => {
    if (url) {
      updateAttributes({ src: url, showPreview: true });
    }
  };
  return (
    <NodeViewWrapper className="embbed-image" contentEditable={false}>
      {url && showPreview ? (
        <figure className="w-full">
          <img
            src={url}
            alt={alt}
            width={width}
            height={height}
            className="w-full object-cover"
            onError={() => setURL("https://via.placeholder.com/560x315")} // Fallback image
          />
          {alt && <figcaption>{alt}</figcaption>}
        </figure>
      ) : (
        <div className="flex items-center justify-center w-full h-32 border border-dashed border-gray-300 rounded-md">
          <Popover>
            <PopoverTrigger className="flex justify-center w-1/5 px-3 py-1 font-medium rounded-lg hover:bg-slate-200">
              Add Cover
            </PopoverTrigger>

            <PopoverContent className="w-[50vw] h-full ml-[10vw]">
              <div className="flex items-center justify-start w-full space-x-4 h-1/4">
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={url}
                  onChange={(e) => setURL(e.target.value)}
                  className="w-1/2 h-1/2 px-3 py-1 border border-gray-300 rounded-md"
                />
                <Button onClick={handleImageUpload} className="w-1/4">
                  {" "}
                  <Image color="white" size="80" />
                  Upload
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </NodeViewWrapper>
  );
};

export default RenderEmbbedImage;
