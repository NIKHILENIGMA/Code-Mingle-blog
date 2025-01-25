import { Editor, Extension } from "@tiptap/react";

interface FontSizeOptions {
  types: string[];
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType;
      unsetFontSize: () => ReturnType;
      toggleFontSize: (fontSize: string) => ReturnType; 
    };
  }
}

const FontSizeExtension = Extension.create<FontSizeOptions>({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: HTMLElement) => {
              return {
                fontSize: element.style.fontSize || null,
              };
            },

            renderHTML: (attributes: { fontSize?: string }) => {
              if (!attributes.fontSize) return {};
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ commands }) => {
          return commands.setMark("textStyle", { fontSize });
        },
      unsetFontSize:
        () =>
        ({ commands }) => {
          return commands.unsetMark("textStyle");
        },

        toggleFontSize:
        (fontSize: string) =>
        ({ commands }) => {
          return commands.toggleMark("textStyle", { fontSize });
        },
    };
  },

  /** Add an isActive query for styling purposes */
  addProseMirrorPlugins() {
    return [];
  },

  /** Add editor queries for current state */
  addStorage() {
    return {
      getCurrentFontSize: (editor: Editor) => {
        const attributes = editor.getAttributes("textStyle");
        return attributes.fontSize || "default";
      },
    };
  },
});

export default FontSizeExtension;