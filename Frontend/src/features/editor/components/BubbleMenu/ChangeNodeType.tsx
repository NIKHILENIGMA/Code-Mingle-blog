import { FC } from "react";
import { Editor } from "@tiptap/core";

export type Level = 1 | 2 | 3;

interface ChangeNodeTypeProps {
  editor: Editor;
}

const nodeOptions = [
  { value: "paragraph", label: "Paragraph" },
  { value: "1", label: "Heading 1" },
  { value: "2", label: "Heading 2" },
  { value: "3", label: "Heading 3" },
  
];

const ChangeNodeType: FC<ChangeNodeTypeProps> = ({ editor }) => {
  return (
    <div className="relative flex-1  border">
      <select
        name="heading"
        onChange={(e) => {
          if (!editor) return null;
          const value = e.target.value;
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
        }}
        value={
          editor.isActive("heading")
            ? editor.getAttributes("heading").level
            : "paragraph"
        }
        className="block min-w-[100px] appearance-none p-2 text-black bg-[#fff] hover:bg-slate-100 dark:bg-[#1E293B] dark:text-white rounded-md transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {nodeOptions.map((option, index) => (
          <option key={`${option.value}+${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChangeNodeType;
