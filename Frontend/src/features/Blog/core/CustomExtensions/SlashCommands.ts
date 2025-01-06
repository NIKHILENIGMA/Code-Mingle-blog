import { Editor, Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { ReactRenderer } from "@tiptap/react";
import tippy, { Instance as TippyInstance } from "tippy.js";
import SlashCommandsMenu from "../../components/Editor/SlashCommandsMenu";
import {
  Code,
  Columns2,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Text,
  TextQuote,
  // Wand,
} from "@/Utils/Icons";

let tippyInstance: TippyInstance | null;

export const SlashCommands = Extension.create({
  name: "slashCommands",

  addOptions() {
    return {
      commands: [
        // AI Writer command
        // {
        //   title: "AI Writer",
        //   command: ({ editor }: { editor: Editor }) => {
        //     if (!editor) return null;
        //     editor.chain().focus().insertContent({
        //       type: "aiWriterNode",
        //       attrs: {
        //         prompt: "",
        //       },
        //     })
        //     .run();
        //     // Call the AI Writer component to render
        //   },
        //   description: "Generate AI written text",
        //   icon: Wand,
        // },

        // Text command
        {
          title: "Text",
          command: ({ editor }: { editor: Editor }) => {
            if (!editor) return null;
            editor.chain().focus().setNode("text").run();
          },
          description: "Insert a text node",
          icon: Text,
        },

        // Heading 1 command
        {
          title: "Heading 1",
          command: ({ editor }: { editor: Editor }) => {
            if (!editor) return null;
            editor.chain().focus().setNode("heading", { level: 1 }).run();
          },
          description: "Insert a title",
          icon: Heading1,
        },

        // Heading 2 command
        {
          title: "Heading 2",
          command: ({ editor }: { editor: Editor }) => {
            if (!editor) return null;
            editor.chain().focus().setNode("heading", { level: 2 }).run();
          },
          description: "Insert a subtitle",
          icon: Heading2,
        },

        // Heading 3 command
        {
          title: "Heading 3",
          command: ({ editor }: { editor: Editor }) => {
            if (!editor) return null;
            editor.chain().focus().setNode("heading", { level: 3 }).run();
          },
          description: "Insert a section heading",
          icon: Heading3,
        },

        // Block quote command
        {
          title: "Block quote",
          command: ({ editor }: { editor: Editor }) => {
            if (!editor) return null;
            editor.chain().focus().toggleBlockquote().run();
          },
          description: "Insert a block quote",
          icon: TextQuote,
        },

        // Bullet list command
        {
          title: "Bullet list",
          command: ({ editor }: { editor: Editor }) => {
            if (!editor) return null;
            editor.chain().focus().toggleBulletList().run();
          },
          description: "Insert a bullet list",
          icon: List,
        },

        // Ordered list command
        {
          title: "Ordered list",
          command: ({ editor }: { editor: Editor }) => {
            if (!editor) return null;
            editor.chain().focus().toggleOrderedList().run();
          },
          description: "Insert an ordered list",
          icon: ListOrdered,
        },

        // Code block command
        {
          title: "Code block",
          command: ({ editor }: { editor: Editor }) => {
            if (!editor) return null;
            editor.chain().focus().setNode("codeBlock").run();
          },
          description: "Insert a code block",
          icon: Code,
        },

        // Horizontal rule command
        {
          title: "Horizontal rule",
          command: ({ editor }: { editor: Editor }) => {
            if (!editor) return null;
            editor.chain().focus().setHorizontalRule().run();
          },
          description: "Insert a horizontal rule",
          icon: Columns2,
        },
      ],
    };
  },

  addProseMirrorPlugins() {
    const editor = this.editor;
    const { commands } = this.options;
    return [
      new Plugin({
        key: new PluginKey("slashCommands"),
        props: {
          handleKeyDown: (view, event) => {
            if (event.key === "/") {
              console.log("Slash key pressed");
              const { state } = view;
              const { selection } = state;
              const { $from } = selection;

              // Check if the cursor is at the start of the document
              if ($from.pos !== 1) {
                return false;
              }

              // Render the SlashCommandsMenu component
              const component = new ReactRenderer(SlashCommandsMenu, {
                props: {
                  editor: editor,
                  commands: commands,
                  onCloseMenu: () => {
                    if (tippyInstance) {
                      console.log("tippyInstance", tippyInstance);
                      tippyInstance.hide();
                      console.log("tippyInstance destroyed");
                    }
                    // Destroy the React component to unmount it
                    component.destroy();
                  },
                },
                editor: editor,
              });

              // Insert the component at the current position
              const cords = view.coordsAtPos($from.pos);

              // Adjust the position for better user experience
              const adjustedLeft = cords.left; // Move -12px to the right
              const adjustedTop = cords.top + 35; // Move 35px down

              const dom = component.element;
              // Show the menu using
              tippy("body", {
                getReferenceClientRect: () => {
                  const rect = new DOMRect(adjustedLeft, adjustedTop, 0, 0);
                  return rect;
                },
                appendTo: () => document.body,
                content: dom,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
                onHide: () => {
                  if (tippyInstance) {
                    tippyInstance.destroy();
                    tippyInstance = null;
                    component.destroy();
                  }
                },
              });

              // Save the tippy instance
              return true;
            }
            // Return false if the key is not a slash
            return false;
          },
        },
      }),
    ];
  },
});
