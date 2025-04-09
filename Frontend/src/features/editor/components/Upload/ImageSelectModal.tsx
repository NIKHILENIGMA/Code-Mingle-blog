import { Button } from "@/components";
import { FC } from "react";
import { Plus, Upload } from "@/Utils/Icons";
import { Editor } from '@tiptap/core';


interface ImageSelectModalProps {
    onModalChange: (show: boolean) => void;
    deleteNode: () => void;
    editor: Editor
}

const ImageSelectModal: FC<ImageSelectModalProps> = ({ onModalChange, deleteNode, editor }) => {
  return (
    <div
      onClick={() => onModalChange(!editor.isActive('image'))}
      className="relative w-full p-4 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200"
    >
      <div className="absolute top-0 right-0 p-2 z-50">
        <Button
          variant={"ghost"}
          onClick={() => {
            deleteNode();
            editor.chain().focus().run();
          }}
          className="bg-transparent hover:bg-card/50 text-muted-foreground"
        >
          <Plus className="rotate-45" />
        </Button>
      </div>
      <Upload className="w-8 h-8 mb-2" />
      <h4 className="text-lg font-medium ">Add Image</h4>
      <p className="text-sm">Click to upload or paste URL</p>
    </div>
  );
};

export default ImageSelectModal;
