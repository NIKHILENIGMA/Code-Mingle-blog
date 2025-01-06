import { Node } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    textAlign: {
      setTextAlign: (align: string) => ReturnType;
    };
  }
}

const TextAlign = Node.create({
  name: "textAlign",

  addOptions() {
    return {
      types: ["heading", "paragraph"],
      defaultAlignment: "left",
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: null,
            parseHTML: (element: HTMLElement) => {
              return {
                textAlign:
                  element.style.textAlign || this.options.defaultAlignment,
              };
            },
            renderHTML: (attributes) => {
              if (
                !attributes.textAlign ||
                this.options.defaultAlignment === attributes.textAlign
              )
                return {};
              return {
                style: `text-align: ${attributes.textAlign}`,
              };
            },
          },
        },
      },
    ];
  },

  addComment() {
    return {
      textAlign: {
        setTextAlign:
          (alignment: "left" | "right" | "center" | "justify") =>
          ({
            commands,
          }: {
            commands: {
              updateNodeAttributes: (
                type: string,
                attrs: { textAlign: "left" | "right" | "center" | "justify" }
              ) => boolean;
            };
          }) => {
            return this.options.types.every((type: string) =>
              commands.updateNodeAttributes(type, { textAlign: alignment })
            );
          },
        unsetTextAlign:
          () =>
          ({
            commands,
          }: {
            commands: {
              updateNodeAttributes: (
                type: string,
                attrs: { textAlign: null }
              ) => boolean;
            };
          }) => {
            return this.options.types.every((type: string) =>
              commands.updateNodeAttributes(type, { textAlign: null })
            );
          },
      },
    };
  },
});

export default TextAlign;
