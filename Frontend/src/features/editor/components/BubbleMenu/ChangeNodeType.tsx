import { FC } from "react";
import { Editor } from "@tiptap/core";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components";
import { nodeOptions } from "@/constants/constants";

export type Level = 1 | 2 | 3;

interface ChangeNodeTypeProps {
  editor: Editor;
}

const ChangeNodeType: FC<ChangeNodeTypeProps> = ({ editor }) => {
  const handleValueChange = (value: string) => {
    if (!editor) return;

    // If the value is paragraph, set the paragraph
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      // Otherwise, set the heading level
      editor
        .chain()
        .focus()
        .toggleHeading({ level: parseInt(value) as Level })
        .run();
    }
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger
        className="w-[100px] border-none bg-transparent hover:bg-transparent shadow-none"
        onPointerDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        Paragraph
      </SelectTrigger>
      <SelectContent
        onPointerDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {nodeOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: option.value }}
            />
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ChangeNodeType;

