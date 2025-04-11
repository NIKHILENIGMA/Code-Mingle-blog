import { FC, useState } from "react";
import ImageBubbleMenu from "./ImageBubbleMenu";
import { Node } from "@tiptap/pm/model";

interface ImageModalProps {
  node: Node;
  bubbleMenu: boolean;
  setBubbleMenu: (value: boolean) => void;
  handleImageChange: () => void;
  handleRemoveImage: () => void;
}

const ImageModal: FC<ImageModalProps> = ({
  node,
  bubbleMenu,
  setBubbleMenu,
  handleImageChange,
  handleRemoveImage,
}) => {
  const [copy, setCopy] = useState<boolean>(false);

  return (
    <div
      className="w-full h-auto"
      onMouseEnter={() => {
        setBubbleMenu(true);
      }}
      onMouseLeave={() => {
        setBubbleMenu(false);
      }}
    >
      <img
        src={node.attrs.src}
        alt={node.attrs.alt}
        className="w-full h-full object-cover rounded-lg"
      />
      {bubbleMenu ? (
        <ImageBubbleMenu
          isCopy={copy}
          onCopyImageUrl={() => {
            navigator.clipboard.writeText(node.attrs.src);
            setCopy(true);
            setTimeout(() => {
              setCopy(false);
            }, 2000);
          }}
          onImageChange={handleImageChange}
          onRemoveImage={handleRemoveImage}
        />
      ) : null}
    </div>
  );
};

export default ImageModal;
