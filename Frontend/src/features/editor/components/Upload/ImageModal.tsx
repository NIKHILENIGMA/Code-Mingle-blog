import { FC, MouseEvent } from "react";
import ImageBubbleMenu from "./ImageBubbleMenu";
import { Node } from "@tiptap/pm/model";

interface ImageModalProps {
  node: Node
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
  return (
    <div className="w-full h-auto">
      <img
        src={node.attrs.src}
        alt={node.attrs.alt}
        className="w-full h-full object-cover rounded-lg"
        onClick={(e: MouseEvent<HTMLImageElement>) => {
          e.stopPropagation();
          setBubbleMenu(!bubbleMenu);
        }}
      />
      {bubbleMenu ? (
        <ImageBubbleMenu
          onImageChange={handleImageChange}
          onRemoveImage={handleRemoveImage}
        />
      ) : null}
    </div>
  );
};

export default ImageModal;
