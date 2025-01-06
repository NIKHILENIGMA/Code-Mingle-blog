import React from "react";
import { Button, Input } from "@/components";
import { Editor } from "@tiptap/react";

interface ColorPickerProps {
  editor: Editor;
  icon: React.ReactNode;
  color: string;
  onColorChange: (color: string) => void;
  commandType?: "textColor" | "textBackgroundColor";
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  editor,
  icon,
  color,
  commandType = "textColor",
  onColorChange,
}) => {
  const colorInputRef = React.useRef<HTMLInputElement>(null);

  const handleColorChange = () => {
    if (colorInputRef.current) {
      const selectedColor = colorInputRef.current.value;
      if (commandType === "textColor") {
        editor.chain().focus().setTextColor(selectedColor).run();
      } else {
        editor.chain().focus().setTextBackgroundColor(color).run();
      }
      onColorChange(selectedColor);
    }
  };

  const toggleColorPicker = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };
  return (
    <>
      <Button
        variant={"link"}
        className={
          editor.isActive(
            commandType === "textColor" ? "palette" : "backgroundPalette"
          )
            ? "bg-black text-slate-200"
            : ""
        }
        onClick={toggleColorPicker}
      >
        {icon}
      </Button>
      <Input
        type="color"
        value={color}
        ref={colorInputRef}
        className="hidden"
        onChange={handleColorChange}
      />
    </>
  );
};

export default ColorPicker;
