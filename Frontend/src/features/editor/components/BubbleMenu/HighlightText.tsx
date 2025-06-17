import { FC } from "react";
import { Editor } from "@tiptap/core";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components";
import { TEXT_HIGHLIGHT_HEXCODES } from "@/constants";

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
        className="w-[100px] border-none bg-transparent hover:bg-transparent shadow-none"
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
        {TEXT_HIGHLIGHT_HEXCODES.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            onPointerDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <span
              className="inline-block w-3 h-3 mr-2 rounded-full"
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
      className="rounded-md bg-card"
      onMouseDown={(e) => e.preventDefault()} // prevents BubbleMenu from closing
    >
      <Button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 px-3 py-1 text-sm rounded-md bg-card"
      >
        Highlight <ChevronDown className="w-4 h-4" />
      </Button>

      {open && (
        <div className="absolute top-full md:-right-[30%] lg:-right-[70%] mt-2 w-36 border border-primary/70 rounded-md shadow-md bg-card z-20">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center justify-start w-full space-y-2"
            >
              <button
                onClick={() => handleSelect(option.value)}
                className="flex items-center w-full h-full gap-2 px-3 py-1 transition-colors rounded-sm text-start"
              >
                <span
                  className="flex items-center justify-center w-4 h-4 p-3 border-2 rounded-md"
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
