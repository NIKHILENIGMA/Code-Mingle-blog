import { CommandProps, mergeAttributes, Node, RawCommands } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import RenderEmbbedImage from "../../components/Upload/RenderEmbbedImage";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    embbedImage: {
      setImage: (attributes: {
        src: string;
        alt?: string;
        width?: number;
        height?: number;
      }) => ReturnType;
      unsetImage: () => ReturnType;
    };
  }
}

export const ImageNode = Node.create({
  name: "embbed-image",
  group: "block",
  inline: false,
  draggable: true,

  addOptions() {
    return {
      allowGapCursor: true,
      HTMLAttributes: {
        class: "embbed-image",
      },
    };
  },

  // defining the default attributes
  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("src") || "",
        renderHTML: (attributes: { src: string }) => {
          return attributes.src ? { src: attributes.src } : {};
        },
      },
      alt: {
        default: "",
        parseHTML: (element: HTMLElement) => element.getAttribute("alt") || "",
        renderHTML: (attributes: { alt: string }) => {
          return attributes.alt ? { alt: attributes.alt } : {};
        },
      },
      width: {
        width: 560,
        parseHTML: (element: HTMLElement) =>
          Number(element.getAttribute("width")) || 560,
        renderHTML: (attributes: { width: number }) => {
          return attributes.width ? { width: attributes.width } : {};
        },
      },
      height: {
        height: 315,
        parseHTML: (element: HTMLElement) =>
          Number(element.getAttribute("height")) || 315,
        renderHTML: (attributes: { height: number }) => {
          return attributes.height ? { height: attributes.height } : {};
        },
      },
      showPreview: {
        default: true,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("showPreview") === "true" || false,
        renderHTML: (attributes: { showPreview: boolean }) => ({
          "data-show-preview": attributes.showPreview.toString(),
        }),
      },
      name: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute("name") || "",
        renderHTML: (attributes: { name: string }) => {
          return attributes.name ? attributes.name : "";
        },
      },
    };
  },

  // defining the parseHTML
  parseHTML() {
    return [
      {
        tag: "img",
        attrs: {
          src: { default: null },
          alt: { default: "" },
          class: { default: "embbed-image" },
        },
      },
    ];
  },

  // defining the renderHTML
  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  // defining the addKeyboardShortcuts
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-i": () =>
        this.editor.commands.insertContent({
          type: this.name,
          attrs: {
            src: "https://via.placeholder.com/560x315",
            alt: "image",
          },
        }),
    };
  },

  // defining the addNodeView
  addNodeView() {
    return ReactNodeViewRenderer(RenderEmbbedImage);
  },

  // defining the addCommands
  addCommands() {
    return {
      setImage:
        (attributes: {
          src: string;
          alt?: string;
          width?: number;
          height?: number;
        }) =>
        ({ commands }: CommandProps) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
          });
        },
      unsetImage:
        () =>
        ({ chain }: CommandProps) => {
          chain().focus().deleteNode("embbed-image").run();
        },
    } as Partial<RawCommands>;
  },
});
