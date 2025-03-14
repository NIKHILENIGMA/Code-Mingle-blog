import { Editor } from "@tiptap/core";
import {
  // ArrowLeftToLine,
  // ArrowRightToLine,
  // AudioLines,
  // Eraser,
  Columns2,
  Heading1,
  Heading2,
  Heading3,
  Image,
  List,
  ListOrdered,
  // ListTodo,
  Code,
  // Mic,
  MonitorPlay,
  // SwatchBook,
  Table,
  Text,
  TextQuote,
} from "@/Utils/Icons";

export interface CommandInterface {
  title: string;
  action: ({ editor }: { editor: Editor }) => void;
  icon: React.ComponentType;
  group: string;
  description: string;
  shortcut: string;
}

/**
 * Commands for basic text formatting
 * @param editor - The editor instance
 * @returns An array of commands
 */
export const BASIC_COMMANDS = [
  {
    title: "Paragraph",
    action: ({ editor }: { editor: Editor }) => {
      // const { from, to } = editor.state.selection;
      editor.chain().focus().setNode("paragraph").run();
    },
    icon: Text,
    group: "Basic",
    description: "Add a paragraph",
    shortcut: "cntrl + shift + p",
  },
  {
    title: "Heading 1",
    action: ({ editor }: { editor: Editor }) => {
      const selection = editor.view.state.selection;
      const from = selection.$from.posAtIndex(0);
      const to = selection.$from.posAtIndex(1);
      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .setHeading({ level: 1 })
        .run();
    },
    icon: Heading1,
    group: "Basic",
    description: "Add a heading 1",
    shortcut: "#",
  },
  {
    title: "Heading 2",
    action: ({ editor }: { editor: Editor }) => {
      const selection = editor.view.state.selection;
      const from = selection.$from.posAtIndex(0);
      const to = selection.$from.posAtIndex(1);
      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .setHeading({ level: 2 })
        .run();
    },
    icon: Heading2,
    group: "Basic",
    description: "Add a heading 2",
    shortcut: "##",
  },
  {
    title: "Heading 3",
    action: ({ editor }: { editor: Editor }) => {
      const selection = editor.view.state.selection;
      const from = selection.$from.posAtIndex(0);
      const to = selection.$from.posAtIndex(1);

      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .setHeading({ level: 3 })
        .run();
    },
    icon: Heading3,
    group: "Basic",
    description: "Add a heading 3",
    shortcut: "###",
  },
  {
    title: "Code Block",
    action: ({ editor }: { editor: Editor }) => {
      const selection = editor.view.state.selection;
      const from = selection.$from.posAtIndex(0);
      const to = selection.$from.posAtIndex(1);

      editor.chain().focus().deleteRange({ from, to }).toggleCodeBlock().run();
    },
    icon: Code,
    group: "Code",
    description: "Add a code block",
    shortcut: "```",
  },
  {
    title: "Divider",
    action: ({ editor }: { editor: Editor }) => {
      const selection = editor.view.state.selection;
      const from = selection.$from.posAtIndex(0);
      const to = selection.$from.posAtIndex(1);

      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .setHorizontalRule()
        .run();
    },
    icon: Columns2,
    group: "Basic",
    description: "Add a divider",
    shortcut: "---",
  },
  {
    title: "Block Quote",
    action: ({ editor }: { editor: Editor }) => {
      const selection = editor.view.state.selection;
      const from = selection.$from.posAtIndex(0);
      const to = selection.$from.posAtIndex(1);

      editor.chain().focus().deleteRange({ from, to }).setBlockquote().run();
    },
    icon: TextQuote,
    group: "Quote",
    description: "Add a block quote",
    shortcut: "cntrl + shift + q",
  },
  {
    title: "Bullet List",
    action: ({ editor }: { editor: Editor }) => {
      const selection = editor.view.state.selection;
      const from = selection.$from.posAtIndex(0);
      const to = selection.$from.posAtIndex(1);

      editor.chain().focus().deleteRange({ from, to }).toggleBulletList().run();
    },
    icon: List,
    group: "List",
    description: "Add a bullet list",
    shortcut: "cntrl + shift + 8",
  },
  {
    title: "Number List",
    action: ({ editor }: { editor: Editor }) => {
      const selection = editor.view.state.selection;
      const from = selection.$from.posAtIndex(0);
      const to = selection.$from.posAtIndex(1);

      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .toggleOrderedList()
        .run();
    },
    icon: ListOrdered,
    group: "List",
    description: "Add an ordered list",
    shortcut: "cntrl + shift + 7",
  },
  // {
  //   title: "Task List",
  //   action: ({ editor }: { editor: Editor }) => {
  //     editor.chain().focus()
  //   },
  //   icon: ListTodo,
  //   group: "List",
  //   description: "Add a task list",
  //   shortcut: "cntrl + shift + 9",
  // },
  // {
  //   title: "Simplify text",
  //   action: ({ editor }: { editor: Editor }) =>
  //     editor.chain().focus().setHeading({ level: 1 }).run(),
  //   icon: SwatchBook,
  //   group: "Artificial Intelligence",
  //   description: "Simplify the text",
  //   shortcut: "#",
  // },
  // {
  //   title: "Spelling & Grammar",
  //   action: ({ editor }: { editor: Editor }) =>
  //     editor.chain().focus().setHeading({ level: 2 }).run(),
  //   icon: Eraser,
  //   group: "Artificial Intelligence",
  //   description: "Summarize the text",
  //   shortcut: "##",
  // },
  // {
  //   title: "Make longer",
  //   action: ({ editor }: { editor: Editor }) =>
  //     editor.chain().focus().setHeading({ level: 3 }).run(),
  //   icon: ArrowRightToLine,
  //   group: "Artificial Intelligence",
  //   description: "Expand the text",
  //   shortcut: "###",
  // },
  // {
  //   title: "Make shorter",
  //   action: ({ editor }: { editor: Editor }) =>
  //     editor.chain().focus().setNode("paragraph").run(),
  //   icon: ArrowLeftToLine,
  //   group: "Artificial Intelligence",
  //   description: "Make the text shorter",
  //   shortcut: "cntrl + shift + p",
  // },
  // {
  //   title: "Change tone",
  //   action: ({ editor }: { editor: Editor }) =>
  //     editor.chain().focus().setNode("paragraph").run(),
  //   icon: Mic,
  //   group: "Artificial Intelligence",
  //   description: "Change the tone of the text",
  //   shortcut: "cntrl + shift + p",
  // },
  {
    title: "Image",
    action: ({ editor }: { editor: Editor }) => {
      const selection = editor.view.state.selection;
      const from = selection.$from.posAtIndex(0);
      const to = selection.$from.posAtIndex(1);

      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .setImage({ src: "" })
        .run();
    },
    icon: Image,
    group: "Media",
    description: "Add an image",
    shortcut: "%img",
  },
  {
    title: "Youtube",
    action: ({ editor }: { editor: Editor }) => {
      const selection = editor.view.state.selection;
      const from = selection.$from.posAtIndex(0);
      const to = selection.$from.posAtIndex(1);

      editor
        .chain()
        .focus()
        .deleteRange({ from, to })
        .setYoutubeVideo({ src: "" })
        .run();
    },
    icon: MonitorPlay,
    group: "Media",
    description: "Add a youtube video link",
    shortcut: "%youtube",
  },
  // {
  //   title: "Audio",
  //   action: ({ editor }: { editor: Editor }) =>
  //     editor.chain().focus().setHeading({ level: 3 }).run(),
  //   icon: AudioLines,
  //   group: "Media",
  //   description: "Add an audio file",
  //   shortcut: "%audio",
  // },
];

/**
 * Commands for table operations
 * @param editor - The editor instance
 * @returns An array of commands
 */

// Todo: Add the table commands to the editor
export const TABLE_COMMANDS = [
  {
    title: "Table",
    action: ({ editor }: { editor: Editor }) =>
      editor.chain().focus().setNode("table").run(),
    icon: Table,
    group: "Table",
    description: "Add a table",
    shortcut: "%table",
  },
];
