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
  const [error, setError] = useState<string | null>(null);

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
    }, 3000); // Clear error after 3 seconds
  };
  

  const handleImageChange = useCallback(
    () => {
      const url = prompt("Enter the new image URL:");
      if (!url) return;
      try {
        if (!isValidURL(url)) {

          handleError("Invalid URL");
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
        handleError("Failed to update image. Please try again with a valid URL.");
      }
      setBubbleMenu((prev) => !prev);
      editor.chain().focus().run();
    },
    [editor, updateAttributes, setBubbleMenu]
  );

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
    error,
    setShowModal,
    bubbleMenu,
    setBubbleMenu,
    handleImageChange,
    handleRemoveImage,
  };
};
