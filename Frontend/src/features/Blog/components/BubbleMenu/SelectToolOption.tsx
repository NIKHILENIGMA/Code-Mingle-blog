import { FC } from "react";
import { Editor } from "@tiptap/react";

interface SelectToolOptionProps {
  editor: Editor;
}

const SelectToolOption: FC<SelectToolOptionProps> = ({ editor }) => {
  return (
    <div className="w-full" onClick={() => editor.chain().focus().run()}>
      Select Tool Option
    </div>
  );
};

export default SelectToolOption;
