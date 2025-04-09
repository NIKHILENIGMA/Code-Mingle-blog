import { FC } from "react";
import { Editor } from "@tiptap/core";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components";
import { hexOptions } from "@/constants/constants";

interface HighlightTextProps {
  editor: Editor | null;
}

const HighlightText: FC<HighlightTextProps> = ({ editor }) => {
  const handleValueChange = (value: string) => {
    if (!editor) return;

    editor.chain().focus().toggleMark("highlight", { color: value }).run();
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger
        className="w-[100px]"
        onPointerDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        Highlight
      </SelectTrigger>
      <SelectContent
        onPointerDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {hexOptions.map((option) => (
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

export default HighlightText;
{
  /* <div
      className="bg-card rounded-md"
      onMouseDown={(e) => e.preventDefault()} // prevents BubbleMenu from closing
    >
      <Button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 px-3 py-1 bg-card rounded-md text-sm"
      >
        Highlight <ChevronDown className="w-4 h-4" />
      </Button>

      {open && (
        <div className="absolute top-full md:-right-[30%] lg:-right-[70%] mt-2 w-36 border border-primary/70 rounded-md shadow-md bg-card z-20">
          {options.map((option) => (
            <div
              key={option.value}
              className="w-full flex items-center justify-start space-y-2"
            >
              <button
                onClick={() => handleSelect(option.value)}
                className="text-start h-full flex items-center gap-2 px-3 py-1 w-full rounded-sm transition-colors"
              >
                <span
                  className="border-2 rounded-md p-3 w-4 h-4 flex items-center justify-center"
                  style={{
                    color: option.value,
                  }}
                >
                  A
                </span>
                <span>{option.label}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div> */
}
