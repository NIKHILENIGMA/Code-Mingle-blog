import { Extension } from "@tiptap/core";

export interface TextColorOptions {
  types: string[];
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    TextBackgroundExtension: {
      /**
       * Set the color of the selected text.
       */
      setTextBackgroundColor: (color: string) => ReturnType;
      unsetTextBackgroundColor: () => ReturnType;
    };
  }
}

export const TextBackgroundExtension = Extension.create<TextColorOptions>({
  name: "TextBackgroundExtension",

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
          backgroundColor: {
            default: null,
            parseHTML: (element: HTMLElement) => {
              return {
                backgroundColor: element.style.backgroundColor || null,
              };
            },

            renderHTML: (attributes: { backgroundColor?: string }) => {
              if (!attributes.backgroundColor) return {};
              return {
                style: `background-color: ${attributes.backgroundColor}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setTextBackgroundColor:
        (color: string) =>
        ({ commands }) => {
          return commands.setMark("textStyle", { backgroundColor: color });
        },
      unsetTextBackgroundColor:
        () =>
        ({ commands }) => {
          return commands.unsetMark("textStyle");
        },
    };
  },
});
