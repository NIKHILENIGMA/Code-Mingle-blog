import { 
  // ChangeEvent, 
  FC } from "react";
import { Editor } from "@tiptap/core";

const options = [
  { value: "simplify", label: "Simplify" },
  { value: "tone-change", label: "Tone" },
  { value: "language-translate", label: "Language" },
  { value: "make-long", label: "Make Long" },
  { value: "make-short", label: "Make Short" },
];
interface AISuggestionProps {
  editor: Editor;
}

const AISuggestion: FC<AISuggestionProps> = () => {
  return (
    <div className="relative flex-1">
      <select
        // onChange={(e: ChangeEvent<HTMLSelectElement>) => (
        //   editor.chain().focus().setNodeMarkup("aiSuggestion", { type: e.target.value }).run()
        // )}
        className="block min-w-[100px] appearance-none p-2 text-black bg-[#fff] hover:bg-slate-100 dark:bg-[#1E293B] dark:text-white rounded-md transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        {options.map((opt, index) => (
          <option key={`${opt.label}` + `${index}`} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AISuggestion;
