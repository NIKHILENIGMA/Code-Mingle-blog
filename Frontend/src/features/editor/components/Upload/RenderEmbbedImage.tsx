import { FC } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { NodeViewProps } from "@tiptap/core";
import ImageUploadModal from "./ImageUploadModal";
import ImageSelectModal from "./ImageSelectModal";
import { useRenderEmbbedImg } from "../../hooks/useRenderEmbbedImg";
import ImageModal from "./ImageModal";

const RenderEmbbedImage: FC<NodeViewProps> = ({
  editor,
  node,
  updateAttributes,
  deleteNode,
}) => {
  const {
    showModal,
    setShowModal,
    bubbleMenu,
    setBubbleMenu,
    handleImageChange,
    handleRemoveImage,
  } = useRenderEmbbedImg({
    editor,
    updateAttributes,
  });

  return (
    <NodeViewWrapper
      className="embbed-image relative max-w-4xl mx-auto my-6"
      contentEditable={false}
    >
      <div className="w-full h-auto relative rounded-lg overflow-hidden transition-colors duration-200">
        <div className="relative w-full h-auto">
          {!node.attrs.src ? (
            <ImageSelectModal
              onModalChange={setShowModal}
              deleteNode={deleteNode}
              editor={editor}
            />
          ) : (
            <ImageModal
              node={node}
              bubbleMenu={bubbleMenu}
              setBubbleMenu={setBubbleMenu}
              handleImageChange={handleImageChange}
              handleRemoveImage={handleRemoveImage}
            />
          )}
        </div>
      </div>
      {showModal && (
        <ImageUploadModal
          onModalChange={setShowModal}
          updateAttributes={updateAttributes}
        />
      )}
    </NodeViewWrapper>
  );
};

export default RenderEmbbedImage;
