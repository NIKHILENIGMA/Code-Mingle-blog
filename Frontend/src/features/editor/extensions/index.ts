import { StarterKit } from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";
// import Youtube from "@tiptap/extension-youtube";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import { SlashExtension } from "./SlashExtension";
import { ImageNode } from "../nodes/media/ImageNode";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { SimplifyExtension } from "./AI/SimplifyExtension";
import { TranslateTextExtension } from "./AI/TranslateTextExtension";
import { MakeShortTextExtension } from "./AI/MakeShortTextExtension";
import { MakeLongTextExtension } from "./AI/MakeLongTextExtension";
import { ChangeToneExtension } from "./AI/ChangeToneExtension";
import { ExtendedCodeBlock } from "./ExtendedCodeBlock";
import { lowLightConfig } from "@/Utils/lowLightConfig";
import { YoutubeVideoNode } from "../nodes/media/YoutubeVideoNode";
import { AIContentNode } from "../nodes/AIContentNode/AIContentNode ";
import { TitleNode } from "../nodes/title/TitleNode";

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
    dropcursor: {
      color: "#7c3aed",
      width: 2,
    },
  }).extend({
    inclusive: false,
  }),
  AIContentNode,
  TextStyle,
  Color.configure({
    types: ["textStyle", "heading", "paragraph"],
  }),
  TitleNode,
  SlashExtension,
  YoutubeVideoNode,
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        if (node.attrs.level === 1) {
          return "Title of the document";
        } else if (node.attrs.level === 2) {
          return "Document Subtitle";
        } else if (node.attrs.level === 3) {
          return "Subheading ";
        } else {
          return "Heading ";
        }
      } else if (node.type.name == "title") {
        return "Title of the document";
      } else {
        return 'Type "/" for commands or Ask AI to generate content';
      }
    },
  }),
  ImageNode,
  ExtendedCodeBlock.configure({
    lowlight: lowLightConfig,
    defaultLanguage: "plaintext",
    HTMLAttributes: {
      class: "rounded-md",
    },
  }),
  GlobalDragHandle.configure({
    dragHandleWidth: 24,
    scrollTreshold: 0, // disables annoying auto-scroll on mobile/small screens
    excludedTags: ["hr"], // hide handle on tags that shouldn’t be moved
    dragHandleSelector: undefined, // use global handle
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
  SimplifyExtension,
  TranslateTextExtension,
  MakeLongTextExtension,
  MakeShortTextExtension,
  ChangeToneExtension,
];

export default extensions;
