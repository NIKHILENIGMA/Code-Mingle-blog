import { FC } from "react";
import { Editor } from "@tiptap/core";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components";
import { TEXT_COLOR_HEXCODES } from "@/constants";

interface ChangeTextColorProps {
  editor: Editor | null;
}

const ChangeTextColor: FC<ChangeTextColorProps> = ({ editor }) => {
  // const [active, setActive] = useState<boolean>(false);
  const handleValueChange = (color: string) => {
    if (!editor) return;
    // setActive(editor.isActive("textStyle")); 
    editor?.chain().focus()?.setColor(color).run();;
  };
  
  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger
        className="w-[90px] border-none bg-transparent hover:bg-transparent shadow-none" 
        onPointerDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        Color
      </SelectTrigger>
      <SelectContent
        onPointerDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {TEXT_COLOR_HEXCODES.map((option) => (
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

export default ChangeTextColor;

