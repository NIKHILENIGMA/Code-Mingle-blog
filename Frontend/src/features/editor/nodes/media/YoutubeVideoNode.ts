import { CommandProps, mergeAttributes, Node, nodeInputRule, RawCommands } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import RenderYoutubeVideo from "../../components/RenderYoutubeVideo";

/**
 * YoutubeVideoNode is a custom node for rendering YouTube videos in the editor.
 * It extends the Tiptap Node class and provides methods for parsing HTML,
 * rendering HTML, and handling commands related to the YouTube video node.
 * It also includes attributes for the video source and alternative text.
 */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    youtubeVideo: {
      setYoutubeVideo: (attributes: {
        src: string;
        alt?: string;
      }) => ReturnType;
      unsetYoutubeVideo: () => ReturnType;
    };
  }
}

/**
 * YoutubeVideoNode is a custom node for rendering YouTube videos in the editor.
 * It extends the Tiptap Node class and provides methods for parsing HTML,
 * rendering HTML, and handling commands related to the YouTube video node.
 * It also includes attributes for the video source and alternative text.
 * The node is defined as a block element and is draggable within the editor.
 */

export const YoutubeVideoNode = Node.create({
  name: "youtube-video",
  group: "block",
  inline: false,
  draggable: true,

  /**
   * The addOptions method is used to define the options for the node.
   * It specifies that the node allows a gap cursor and sets the HTML attributes for the node.
   * @returns An object containing the options for the node.
   */
  addOptions() {
    return {
      allowGapCursor: true,
      HTMLAttributes: {
        class: "youtube-video",
      },
    };
  },

  addInputRules() {
    return [
          // Add any input rules here if needed
          nodeInputRule({
            find: /^%yt/,
            type: this.type,
            getAttributes: () => ({
              src: "",
              alt: "",
            }),
          }),
        ];
  },

  /**
   * The addAttributes method is used to define the attributes for the node.
   *  It specifies the default values and how to parse and render the attributes.
   * The attributes include the source URL of the YouTube video and alternative text.
   * @returns An object containing the attributes for the node.
   */
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
    };
  },

  // defining the parseHTML
  parseHTML() {
    return [
      {
        tag: "iframe",
        attrs: {
          src: { default: null },
          alt: { default: "" },
          class: { default: "youtube-video" },
        },
      },
    ];
  },

  // defining the renderHTML
  renderHTML({ HTMLAttributes }) {
    return [
      "iframe",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  // defining the addNodeView
  addNodeView() {
    return ReactNodeViewRenderer(RenderYoutubeVideo);
  },

  /**
   * The addCommands method is used to define custom commands for the node.
   * It includes commands for setting the YouTube video attributes and unsetting the node.
   * The setYoutubeVideo command allows you to insert a YouTube video with the specified attributes.
   * @param attributes - The attributes for the YouTube video node.
   * @param commands - The command props for the editor.
   * The unsetYoutubeVideo command allows you to remove the YouTube video node from the editor.
   * @param chain - The chain for the editor.
   * @returns An object containing the commands for the node.
   */
  addCommands() {
    return {
      setYoutubeVideo:
        (attributes: { src: string; alt?: string }) =>
        ({ chain }: CommandProps) => {
          return chain()
            .focus()
            .insertContent({
              type: this.name,
              attrs: attributes,
            })
            .insertContent({
              type: "paragraph",
              content: [{ type: "text", text: "" }],
            })
            .run();
        },
      unsetYoutubeVideo:
        () =>
        ({ chain }: CommandProps) => {
          chain().focus().deleteNode("youtube-video").run();
        },
    } as Partial<RawCommands>;
  },
});
