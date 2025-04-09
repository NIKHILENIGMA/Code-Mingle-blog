import { FC, useCallback } from "react";
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
import HighlightText from "./HighlightText";
import LinkButton from "./LinkButton";
import AISuggestion from "./AISuggestion";
import ChangeTextColor from "./ChangeTextColor";
import { EditorState, NodeSelection } from "@tiptap/pm/state";
// import type { Instance, Props } from "tippy.js";

interface CustomeBubbleMenuProps {
  editor: Editor;
}

export type Level = 1 | 2 | 3;

const CustomBubbleMenu: FC<CustomeBubbleMenuProps> = ({ editor }) => {
  const shouldShow = useCallback(
    ({ editor, state }: { editor: Editor; state: EditorState }) => {
      const { from, to } = state.selection;
      const isTextSelected = from !== to;
      const isNodeSelection = state.selection instanceof NodeSelection;
      const isImageNode =
        isNodeSelection &&
        (state.selection as NodeSelection).node.type.name === "embbed-image";

      return isTextSelected && !editor.isEmpty && !isImageNode;
    },
    []
  );

  return (
    <BubbleMenu
      pluginKey="bubbleMenu"
      editor={editor}
      tippyOptions={{
        duration: 100,
      }}
      shouldShow={shouldShow}
      className="flex items-center bg-card border border-secondary p-1 px-2 space-x-1 shadow-lg rounded-md w-full lg:min-w-[750px] overflow-hidden"
    >
      <AISuggestion editor={editor} />

      <Separator orientation="vertical" />

      <ChangeNodeType editor={editor} />

      <Separator orientation="vertical" />
      {/* Bold the selected text */}
      <ToolbarButton
        icon={<Bold className="" />}
        isActive={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />

      {/* Italic the selected text */}
      <ToolbarButton
        icon={<Italic className="" />}
        isActive={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />

      {/* Underline the selected text */}
      <ToolbarButton
        icon={<UnderLineIcon className="" />}
        isActive={editor.isActive("underline")}
        onClick={() => {
          if (!editor) return null;
          editor.chain().focus().toggleUnderline().run();
        }}
      />

      {/* Strike the selected text */}
      <ToolbarButton
        icon={<Strikethrough className="" />}
        isActive={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />

      {/* Add code to the text */}
      <ToolbarButton
        icon={<CodeXml className="" />}
        isActive={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
      />

      {/* Add code block to the text */}
      <ToolbarButton
        icon={<SquareChartGantt className="" />}
        isActive={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />

      <Separator orientation="vertical" />

      <LinkButton editor={editor} />

      <Separator orientation="vertical" />

      <HighlightText editor={editor} />

      <Separator orientation="vertical" />

      <ChangeTextColor editor={editor} />
      {/* Change the text color */}
    </BubbleMenu>
  );
};

export default CustomBubbleMenu;
