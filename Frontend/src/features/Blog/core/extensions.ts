import { StarterKit } from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { EmbbedImage } from "../../editor/nodes/Basic/image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowLightConfig } from "./lowLightConfig";
import { SlashExtension } from "../../editor/extensions/SlashExtension";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";
import { TaskList } from "@/features/editor/nodes/Basic/TaskList";
import { TaskItem } from "@/features/editor/nodes/Basic/TaskItem";
import { ClickHandler } from "@/features/editor/extensions/ClickHandler";
import Youtube from "@tiptap/extension-youtube";

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
    codeBlock: false,
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
  EmbbedImage,
  CodeBlockLowlight.configure({
    lowlight: lowLightConfig,
    defaultLanguage: "plaintext",
  }),
  GlobalDragHandle.configure({
    dragHandleWidth: 15,
    scrollTreshold: 100,
  }),
  TaskItem,
  ClickHandler,
  TaskList,
  Youtube.configure({
    controls: false,
    width: 560,
    height: 315,
  }),
];

export default extensions;
