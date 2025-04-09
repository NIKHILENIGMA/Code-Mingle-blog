import { FC } from "react";
import { Editor } from "@tiptap/core";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components";
import { hexOptions } from "@/constants/constants";

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
        className="w-[100px]"
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

export default ChangeTextColor;

