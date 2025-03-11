import { FC } from "react";
import { Editor } from "@tiptap/core";

const options = [
  { value: "#FFFFFF", label: "Default" },
  { value: "#FFD700", label: "Yellow" },
  { value: "#00FF00", label: "Green" },
  { value: "#007BFF", label: "Blue" },
  { value: "#FF0000", label: "Red" },
  { value: "#A020F0", label: "Purple" },
  { value: "#FF8C00", label: "Orange" },
  { value: "#FF69B4", label: "Pink" },
  { value: "#A9A9A9", label: "Gray" },
  { value: "#000000", label: "Black" },
];

interface HighlightOptionProps {
  editor: Editor | null;
}

const HighlightOption: FC<HighlightOptionProps> = ({ editor }) => {
  return (
    <div className="relative flex-1">
      <select
        name="highlight"
        className="block min-w-[100px] appearance-none p-2 text-black bg-[#fff] hover:bg-slate-100 dark:bg-[#1E293B] dark:text-white rounded-md transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
        onChange={(e) => {
          const { value } = e.target as HTMLSelectElement;
          console.log("value: ", value);

          if (!editor) return;
          editor
            .chain()
            .focus()
            .toggleMark("highlight", { color: value })
            .run();
        }}
      >
        {options.map((option, index) => (
          <option
            key={`${option.value}+${index}`}
            value={option.value}
            className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 space-x-3"
          >
            A {option?.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HighlightOption;
