import { Editor, Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    makeShortText: {
      makeShortText: () => ReturnType;
    };
  }
}

export const MakeShortTextExtension = Extension.create({
  name: "make-short-text",
  addCommands() {
    return {
      makeShortText:
        () =>
        ({ editor }: { editor: Editor }) => {
          const { from, to } = editor.state.selection;
          if (from === to) return false;
          const selectedText = editor.state.doc.textBetween(from, to, " ");
          if (!selectedText.trim()) return false;
          const shortenedText = async () => {
            try {
              const response = selectedText.slice(0, 100);
              editor
                .chain()
                .focus()
                .deleteRange({ from, to })
                .insertContentAt(from, response)
                .run();
            } catch (error) {
              console.error(error);
              return false;
            }
          };
          shortenedText();
          return true;
        },
    };
  },
});
