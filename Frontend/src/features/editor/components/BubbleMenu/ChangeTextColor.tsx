import { FC, useState } from "react";
import { Editor } from "@tiptap/core";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components";

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

interface ChangeTextColorProps {
  editor: Editor | null;
}

const ChangeTextColor: FC<ChangeTextColorProps> = ({ editor }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleSelect = (color: string) => {
    editor?.chain().focus()?.setColor(color).run();
    setOpen(false);
  };

  return (
    <div
      className="bg-card rounded-md "
      onMouseDown={(e) => e.preventDefault()} // prevents BubbleMenu from closing
    >
      <Button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 px-3 py-1 rounded-md bg-card  text-sm"
      >
        Color <ChevronDown className="w-4 h-4" />
      </Button>

      {open && (
        <div className="absolute top-full lg:-right-[92%] mt-2 w-36 bg-popover border border-border rounded-md shadow-md z-20">
          {options.map((option) => (
            <div
              key={option.value}
              className="w-full flex items-center justify-start space-y-2"
            >
              <button
                onClick={() => handleSelect(option.value)}
                className="text-start h-full flex items-center gap-2 px-3 py-1 w-full hover:bg-primary/10 rounded-sm hover:text-primary transition-colors hover:border-primary"
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
    </div>
  );
};

export default ChangeTextColor;
