import type { Extension, Mark, Node } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import UniqueID from "@tiptap/extension-unique-id";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { SlashCommand } from "../extensions/SlashCommand";
import {
  Color,
  TextStyle,
  BackgroundColor,
} from "@tiptap/extension-text-style";
import { ImagePlaceholderExtension } from "../extensions/ImagePlaceholderExtension";
import { AiExtension } from "../extensions/AIExtension";
import { AIHighlightMark } from "../extensions/AIHighlightMark";
import { ImageExtension } from "../extensions/ImageExtension";
import { CodeBlockExtension } from "../extensions/CodeBlockOptions";
import { lowlightConfig } from "./lowLight";

/**
 * Default extensions configuration for TipTap editor.
 *
 * Includes essential extensions for rich text editing functionality:
 * - StarterKit with customized list and code block settings
 * - Underline formatting support
 * - Link handling with autolink and protocol support
 * - Dynamic placeholder text based on node type and heading level
 * - Slash command functionality
 * - Callout blocks for highlighted content
 *
 * @example
 * ```typescript
 * const editor = new Editor({
 *   extensions: defaultExtensions,
 *   content: '<p>Hello world!</p>'
 * });
 * ```
 */

export const defaultExtensions: (Extension | Mark | Node)[] = [
  StarterKit.configure({
    bulletList: { keepMarks: true },
    orderedList: { keepMarks: true },
    codeBlock: false,
    trailingNode: {
      node: "paragraph",
      notAfter: ["image-placeholder", "image"],
    },
    link: false,
  }).extend({
    code: {
      inclusive: false,
    },
    strike: {
      inclusive: false,
    },
  }),
  Link.configure({
    openOnClick: true,
    autolink: true,
    protocols: ["http", "https", "mailto", "tel"],
  }).extend({
    inclusive: false,
  }),
  TaskList,
  TaskItem.configure({
    taskListTypeName: 'taskList',
  }),
  CodeBlockExtension.configure({
    lowlight: lowlightConfig,
    defaultLanguage: "plaintext",
  }),

  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        if (node.attrs.level === 1) {
          return "Write a great title...";
        } else if (node.attrs.level === 2) {
          return "Write a section title...";
        } else if (node.attrs.level === 3) {
          return "Write a sub-section title...";
        }
      }
      if (node.type.name === "ai-chat-extension") {
        return "";
      }
      return "Write something awesome...";
    },
  }),
  UniqueID.configure({
    types: [
      "paragraph",
      "heading",
      "listItem",
      "blockquote",
      "image",
      "codeBlock",
    ],
  }),
  TextStyle,
  Color,
  SlashCommand.configure({
    suggestion: {
      toggle: ["codeBlock", "image-placeholder", "image", "ai-chat-extension"],
    },
  }),
  BackgroundColor,
  ImageExtension,
  ImagePlaceholderExtension.configure({}),
  AiExtension,
  AIHighlightMark,
];

//   TaskList,
//   TaskItem.configure({ nested: true }),
//   HorizontalRule,
