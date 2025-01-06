import { FC, useState } from "react";
import { BubbleMenu, Editor } from "@tiptap/react";
// import SelectToolOption from "./SelectToolOption";
import {
  Bold,
  CodeXml,
  Highlighter,
  Italic,
  Link,
  Palette,
  SquareChartGantt,
  Strikethrough,
  Underline as UnderLineIcon,
} from "@/Utils/Icons";
import ToolbarButton from "./ToolbarButton";
import ColorPicker from "./ColorPicker";
import FontSizeChange from "./FontSizeChange";

interface CustomeBubbleMenuProps {
  editor: Editor;
}

const CustomBubbleMenu: FC<CustomeBubbleMenuProps> = ({ editor }) => {
  const [highligting, setHighligting] = useState<string>("");
  const [color, setColor] = useState<string>("");
  return (
    <BubbleMenu
      pluginKey="bubbleMenu"
      editor={editor}
      tippyOptions={{
        placement: "top-start",
      }}
      className="flex items-center w-[20vw] px-10 py-2 bg-slate-300 shadow-md rounded-2xl"
    >
      <div className="z-20 space-x-1 bubble-menu">
        <FontSizeChange editor={editor} />

        {/* Bold the selected text */}
        <ToolbarButton
          icon={<Bold />}
          isActive={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />

        {/* Italic the selected text */}
        <ToolbarButton
          icon={<Italic />}
          isActive={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />

        {/* Underline the selected text */}
        <ToolbarButton
          icon={<UnderLineIcon />}
          isActive={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />

        {/* Strike the selected text */}
        <ToolbarButton
          icon={<Strikethrough />}
          isActive={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />

        {/* Add code to the text */}
        <ToolbarButton
          icon={<CodeXml />}
          isActive={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        />

        {/* Add code block to the text */}
        <ToolbarButton
          icon={<SquareChartGantt />}
          isActive={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />

        {/* Add link the text */}
        <ToolbarButton
          icon={<Link />}
          isActive={editor.isActive("link")}
          onClick={() => editor.chain().focus()}
        />

        {/* Change the background color */}
        <ColorPicker
          icon={<Highlighter />}
          editor={editor}
          commandType="textBackgroundColor"
          color={highligting}
          onColorChange={setHighligting}
        />

        {/* Change the text color */}
        <ColorPicker
          icon={<Palette />}
          commandType="textColor"
          editor={editor}
          color={color}
          onColorChange={setColor}
        />
      </div>
    </BubbleMenu>
  );
};

export default CustomBubbleMenu;
