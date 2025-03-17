import { StarterKit } from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";
import Youtube from "@tiptap/extension-youtube";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import { lowLightConfig } from "../config/lowLightConfig";
import { SlashExtension } from "./SlashExtension";
// import { TitleNode } from "../nodes/title/TitleNode";
import { ImageNode } from "../nodes/media/ImageNode";

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
    bold: {
      HTMLAttributes: {
        class: "dark:text-white",
      },
    },
    codeBlock: false,
    code: {
      HTMLAttributes: {
        class:
          "rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-2",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc pl-4 marker:text-blue-500 dark:marker:text-blue-300",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class:
          "list-decimal pl-4 marker:text-blue-500  dark:marker:text-blue-300",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class:
          "border-l-4 border-gray-300 pl-4 dark:border-gray-600 text-black dark:text-white",
      },
    },
    horizontalRule: {
      HTMLAttributes: {
        class: "border-t-2 border-gray-300 dark:border-gray-600 my-4",
      },
    },
  }).extend({
    inclusive: false, 
  }),
  SlashExtension,
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return "Heading";
      } else if (node.type.name == "paragraph") {
        return 'Type something or Type "/" for commands';
      }
      return "";
    },
  }),
  ImageNode,
  CodeBlockLowlight.configure({
    lowlight: lowLightConfig,
    defaultLanguage: "javascript",
    HTMLAttributes: {
      class: "rounded-md bg-gray-100 dark:bg-gray-800",
    },
  }),
  GlobalDragHandle.configure({
    dragHandleWidth: 15,
    scrollTreshold: 100,
  }),
  Youtube.configure({
    controls: false,
    width: 560,
    height: 315,
  }),
  Underline,
  Highlight.configure({
    multicolor: true,
    HTMLAttributes: {
      class: "px-2 rounded-md",
    },
  }).extend({
    inclusive: false,
    addKeyboardShortcuts() {
      return {
        "Mod-Alt-h": () => this.editor.chain().focus().toggleHighlight().run(),
      };
    },
  }),
  Link.configure({
    openOnClick: true,
    autolink: true,
    linkOnPaste: true,
    protocols: ["ftp", "mailto"],
    HTMLAttributes: {
      class: "text-black dark:text-white underline underline-dotted",
    },
  }).extend({
    inclusive: false,
  }),
  // TitleNode,
];

export default extensions;
