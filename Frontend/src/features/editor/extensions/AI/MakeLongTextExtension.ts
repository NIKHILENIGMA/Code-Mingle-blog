import { makeTextLong } from "@/services/openAI";
import { Editor, Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    makeLongText: {
      makeLongText: () => ReturnType;
    };
  }
}

export const MakeLongTextExtension = Extension.create({
  name: "make-long-text",
  addCommands() {
    return {
      makeLongText:
        () =>
        ({ editor }: { editor: Editor }) => {
          const { from, to } = editor.state.selection;
          if (from === to) return false;
          const selectedText = editor.state.doc.textBetween(from, to, " ");
          if (!selectedText.trim()) return false;
          const shortenedText = async () => {
            try {
              const response = await makeTextLong(selectedText);

              if (!response) return false;

              const extendedText = response.data?.choices[0]?.message?.content;
              editor
                .chain()
                .focus()
                .deleteRange({ from, to })
                .insertContentAt(from, extendedText)
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
