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
}

const FontSizeChange: React.FC<FontWeightTypesProps> = ({
  editor,
}) => {
  const currentFontSize = editor.getAttributes("textStyle").fontSize || "16px";
  const [showOptions, setShowOptions] = React.useState(false);

  return (
    <div
      className="w-28"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <Select
        value={currentFontSize}
        onValueChange={(value) =>
          editor.chain().focus().setFontSize(value).run()
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Medium" />
        </SelectTrigger>
        {showOptions && (
          <SelectContent>
            {fontWeightTypes.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        )}
      </Select>
    </div>
  );
};

export default FontSizeChange;
