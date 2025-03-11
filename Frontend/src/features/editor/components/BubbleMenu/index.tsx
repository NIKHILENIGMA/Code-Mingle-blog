import { FC } from "react";
import { BubbleMenu, Editor } from "@tiptap/react";
import {
  Bold,
  CodeXml,
  Italic,
  SquareChartGantt,
  Strikethrough,
  Underline as UnderLineIcon,
} from "@/Utils/Icons";
import ToolbarButton from "./ToolbarButton";
import { Separator } from "@/components/ui/separator";
import ChangeNodeType from "./ChangeNodeType";
import HighlightOption from "./HighlightText";
import LinkButton from "./LinkButton";
import AISuggestion from "./AISuggestion";

interface CustomeBubbleMenuProps {
  editor: Editor;
}

export type Level = 1 | 2 | 3;

const CustomBubbleMenu: FC<CustomeBubbleMenuProps> = ({ editor }) => {
  return (
    <BubbleMenu
      pluginKey="bubbleMenu"
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex items-center space-x-2 px-2 py-1 bg-white shadow-md rounded-md border border-[#dadada] dark:border-[#1E293B] dark:bg-[#1E293B] dark:text-white w-[50vw]"
    >
      <div className="bubble-menu space-x-0.5 w-full items-center flex overflow-hidden whitespace-nowrap  text-black dark:text-white">
        <AISuggestion editor={editor} />

        <Separator orientation="vertical" />

        <ChangeNodeType editor={editor} />

        <Separator orientation="vertical" />
        {/* Bold the selected text */}
        <ToolbarButton
          icon={<Bold className="text-black dark:text-white" />}
          isActive={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />

        {/* Italic the selected text */}
        <ToolbarButton
          icon={<Italic className="text-black dark:text-white" />}
          isActive={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />

        {/* Underline the selected text */}
        <ToolbarButton
          icon={<UnderLineIcon className="text-black dark:text-white" />}
          isActive={editor.isActive("underline")}
          onClick={() => {
            if (!editor) return null;
            editor.chain().focus().toggleUnderline().run();
          }}
        />

        {/* Strike the selected text */}
        <ToolbarButton
          icon={<Strikethrough className="text-black dark:text-white" />}
          isActive={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />

        {/* Add code to the text */}
        <ToolbarButton
          icon={<CodeXml className="text-black dark:text-white" />}
          isActive={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        />

        {/* Add code block to the text */}
        <ToolbarButton
          icon={<SquareChartGantt className="text-black dark:text-white" />}
          isActive={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />

        <Separator orientation="vertical" />

        <LinkButton editor={editor} />

        <Separator orientation="vertical" />

        <HighlightOption editor={editor} />

        <Separator orientation="vertical" />
        {/* Change the text color */}
      </div>
    </BubbleMenu>
  );
};

export default CustomBubbleMenu;
