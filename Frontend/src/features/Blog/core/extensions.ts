import { StarterKit } from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Underline from "@tiptap/extension-underline";
import { lowLightConfig } from "./lowLightConfig";
import { aiWriter } from "./aiWriter";
import { TextColorExtension } from "./CustomExtensions/TextColorExtension";
import { TextBackgroundExtension } from "./CustomExtensions/TextBackgroundExtension";
import { TextStyle } from "./CustomeMarks/TextStyle";
import FontSizeExtension from "./CustomExtensions/FontSizeExtension";
import TextAlign from "./CustomNode/TextAlign";
import { SlashCommands } from "./CustomExtensions/SlashCommands";
import DraggableBlock from "./CustomNode/DraggableBlock";

const extensions = [
  SlashCommands,
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  Heading,
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        switch (node.attrs.level) {
          case 1:
            return "Heading 1";
          case 2:
            return "Heading 2";
          case 3:
            return "Heading 3";
          default:
            return "Heading...";
        }
      }

      return 'Type "/" for commands';
    },
  }),
  CodeBlockLowlight.configure({
    lowlight: lowLightConfig,
    defaultLanguage: "javascript",
  }),
  Underline,
  aiWriter,
  TextStyle,
  TextColorExtension,
  TextBackgroundExtension,
  FontSizeExtension,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    defaultAlignment: "left",
  }),
  DraggableBlock,
];

export default extensions;
