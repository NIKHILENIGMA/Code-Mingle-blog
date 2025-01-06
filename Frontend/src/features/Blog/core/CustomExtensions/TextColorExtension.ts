import { Extension } from "@tiptap/core";

export interface TextColorOptions {
  types: string[];
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    TextColorExtension: {
      /**
       * Set the color of the selected text.
       */
      setTextColor: (color: string) => ReturnType;
      unsetTextColor: () => ReturnType;
    };
  }
}

export const TextColorExtension = Extension.create<TextColorOptions>({
  name: "TextColorExtension",
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
          color: {
            default: null,
            parseHTML: (element: HTMLElement) => {
              return {
                color: element.style.color || null,
              };
            },

            renderHTML: (attributes: { color?: string }) => {
              if (!attributes.color) return {};
              return {
                style: `color: ${attributes.color}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setTextColor:
        (color: string) =>
        ({ commands }) => {
          return commands.setMark("textStyle", { color });
        },
      unsetTextColor: () => ({ commands }) => {
        return commands.unsetMark("textStyle");
      },
    };
  },
});
