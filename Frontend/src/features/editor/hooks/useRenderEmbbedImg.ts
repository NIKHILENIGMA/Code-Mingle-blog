import { isValidURL } from "@/Utils/isValidUrl";
import { useCallback, useState } from "react";
import { Editor } from "@tiptap/core";

interface UseRenderEmbbedImgProps {
  editor: Editor;
  updateAttributes?: (attributes: { src: string; alt: string }) => void;
}

export const useRenderEmbbedImg = ({
  editor,
  updateAttributes,
}: UseRenderEmbbedImgProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [bubbleMenu, setBubbleMenu] = useState<boolean>(false);

  const handleImageChange = useCallback(() => {
    const url = prompt("Enter new image URL:")!;
    if (!url) return;
    try {
      if (!isValidURL(url)) {
        alert("Invalid URL");
        return;
      }

      if (url && updateAttributes) {
        updateAttributes({
          src: url,
          alt: "Image",
        });
      }
    } catch (error) {
      console.error("Error updating image:", error);
      alert("Failed to update image. Please try again with a valid URL.");
    }
    setBubbleMenu((prev) => !prev);
    editor.chain().focus().run();
  }, [editor, updateAttributes, setBubbleMenu]);

  const handleRemoveImage = useCallback(() => {
    editor
      .chain()
      .focus()
      .deleteNode("embbed-image")
      .setImage({ src: "" })
      .setNode("paragraph")
      .run();
  }, [editor]);

  return {
    showModal,
    setShowModal,
    bubbleMenu,
    setBubbleMenu,
    handleImageChange,
    handleRemoveImage,
  };
};
