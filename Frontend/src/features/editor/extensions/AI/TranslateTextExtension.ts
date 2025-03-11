import { Editor, Extension } from "@tiptap/core";
import { translateTextContent } from "@/services/openAI";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    translateText: {
      translateText: (translateTo: string) => ReturnType;
    };
  }
}

export const TranslateTextExtension = Extension.create({
  name: "translate",

  addCommands() {
    return {
      translateText:
        (translateTo: string) =>
        ({ editor }: { editor: Editor }) => {
          // Get the range of the selected text from the editor
          const { from, to } = editor.state.selection;
          // If there is no selected text, return
          if (from === to) return false;
          // Get the selected text from the editor
          const selectedText = editor.state.doc.textBetween(from, to, " ");
          // If there is no selected text, return
          if (!selectedText.trim()) return false;

          // Api call to translate the selected text
          const translatedText = async () => {
            try {
              const response = await translateTextContent(
                selectedText,
                translateTo
              );

              // Replace the selected text with the translated text
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
          translatedText();

          return true;
        },
    };
  },
});
