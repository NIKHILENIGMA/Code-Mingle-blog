import { CommandProps, mergeAttributes, Node, nodeInputRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ContentGeneration from "../../components/ContentGeneration";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    contentGeneration: {
      setContentGeneration: () => ReturnType;
    };
  }
}

export const AIContentNode = Node.create({
  name: "aiContent",
  group: "block",
  atom: true,
  inline: false,
  draggable: true,

  addOptions() {
    return {
      allowGapCursor: true,
      HTMLAttributes: {
        class: "ai-content",
      },
    };
  },

  addInputRules() {
    return [
      // Add any input rules here if needed
      nodeInputRule({
        find: /^%askai/,
        type: this.type,
        getAttributes: () => ({
          prompt: "",
          response: "",
          status: "",
        }),
      }),
    ];
  },

  // defining the default attributes
  addAttributes() {
    return {
      prompt: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("prompt") || "",
        renderHTML: (attributes: { prompt: string }) => {
          return attributes.prompt ? { prompt: attributes.prompt } : {};
        },
      },
      response: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("response") || "",
        renderHTML: (attributes: { response: string }) => {
          return attributes.response ? { response: attributes.response } : {};
        },
      },
      status: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("status") || "",
        renderHTML: (attributes: { status: string }) => {
          return attributes.status ? { status: attributes.status } : {};
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: "ai-content" }];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "ai-content",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      node.attrs.prompt,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ContentGeneration);
  },

  addCommands() {
    return {
      setContentGeneration:
        () =>
        ({ commands }: CommandProps) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              prompt: "",
              response: "",
              status: "",
            },
          });
        },
    };
  },
});
