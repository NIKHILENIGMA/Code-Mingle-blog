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

// import Modal from "@/components/common/Modal";

interface CustomeBubbleMenuProps {
  editor: Editor;
}

export type Level = 1 | 2 | 3;

const CustomBubbleMenu: FC<CustomeBubbleMenuProps> = ({ editor }) => {
  // const [open, setOpen] = useState<boolean>(false);
  const shouldShow = useCallback(
    ({ editor, state }: { editor: Editor; state: EditorState }) => {
      const { from, to } = state.selection;
      const isTextSelected = from !== to;
      const isNodeSelection = state.selection instanceof NodeSelection;
      const isImageNode =
        isNodeSelection &&
        (state.selection as NodeSelection).node.type.name === "embbed-image";

      const isAICustomNode =
        isNodeSelection &&
        (state.selection as NodeSelection).node.type.name === "aiContent";

      const isYoutubeNodeSelected =
        isNodeSelection &&
        (state.selection as NodeSelection).node.type.name === "youtube-video";

      return (
        isTextSelected &&
        !editor.isEmpty &&
        !isImageNode &&
        !isAICustomNode &&
        !isYoutubeNodeSelected
      );
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
      className="flex items-center bg-card border border-secondary p-1 px-2 space-x-1 shadow-lg rounded-md w-full lg:min-w-[750px] overflow-y-auto lg:overflow-hidden scrollbar-thin"
    >
      <AISuggestion editor={editor} />

      <Separator
        orientation="vertical"
        className="bg-gray-200 dark:bg-gray-400 py-3"
      />

      <ChangeNodeType editor={editor} />

      <Separator
        orientation="vertical"
        className="bg-gray-200 dark:bg-gray-400 py-3"
      />
      {/* Bold the selected text */}
      <ToolbarButton
        icon={<Bold className="" />}
        isActive={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        content="Bold"
        shortcut="Ctrl + B"
      />

      {/* Italic the selected text */}
      <ToolbarButton
        icon={<Italic className="" />}
        isActive={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        content="Italic"
        shortcut="Ctrl + I"
      />

      {/* Underline the selected text */}
      <ToolbarButton
        icon={<UnderLineIcon className="" />}
        isActive={editor.isActive("underline")}
        onClick={() => {
          if (!editor) return null;
          editor.chain().focus().toggleUnderline().run();
        }}
        content="Underline"
        shortcut="Ctrl + U"
      />

      {/* Strike the selected text */}
      <ToolbarButton
        icon={<Strikethrough className="" />}
        isActive={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        content="Strikethrough"
        shortcut="Ctrl + Shift + X"
      />

      {/* Add code to the text */}
      <ToolbarButton
        icon={<CodeXml className="" />}
        isActive={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
        content="Code"
        shortcut="Ctrl + Shift + C"
      />

      {/* Add code block to the text */}
      <ToolbarButton
        icon={<SquareChartGantt className="" />}
        isActive={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        content="Code Block"
        shortcut="Ctrl + Shift + K"
      />

      <Separator
        orientation="vertical"
        className="bg-gray-200 dark:bg-gray-400 py-3"
      />

      <LinkButton editor={editor} />

      <Separator
        orientation="vertical"
        className="bg-gray-200 dark:bg-gray-400 py-3"
      />

      <HighlightText editor={editor} />

      <Separator
        orientation="vertical"
        className="bg-gray-200 dark:bg-gray-400 py-3"
      />

      <ChangeTextColor editor={editor} />
      {/* Change the text color */}
    </BubbleMenu>
  );
};

export default CustomBubbleMenu;
