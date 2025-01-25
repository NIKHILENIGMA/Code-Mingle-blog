import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Editor } from "@tiptap/react";

const fontWeightTypes = [
  {
    name: "Smaller",
    value: "12px", // Use pixel values
  },
  {
    name: "Small",
    value: "14px",
  },
  {
    name: "Medium",
    value: "16px",
  },
  {
    name: "Large",
    value: "20px",
  },
  {
    name: "Extra Large",
    value: "24px",
  },
];

interface FontWeightTypesProps {
  editor: Editor;
  onChange?: (value: boolean) => void;
}

const FontSizeChange: React.FC<FontWeightTypesProps> = ({
  editor,
  // onChange,
}) => {
  const currentFontSize = editor.getAttributes("textStyle").fontSize || "16px";

  return (
    <div className="w-28">
      <Select
            value={currentFontSize}
            onValueChange={(value) =>
              editor.chain().focus().setFontSize(value).run()
            }
          >
            <SelectTrigger
              className="w-full"
              // Crucial: Prevent event from bubbling up
              onPointerDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <SelectValue placeholder="Medium" />
            </SelectTrigger>
            <SelectContent
              // Stop event propagation
              onPointerDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              {fontWeightTypes.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  // Prevent event propagation
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
    </div>
  );
};

export default FontSizeChange;
