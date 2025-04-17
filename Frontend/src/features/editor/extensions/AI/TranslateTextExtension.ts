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

              const translatedText = response?.data?.choices[0]?.message?.content;
              // If there is no translated text, return
              if (!translatedText) return false;
              
              // Replace the selected text with the translated text
              editor
                .chain()
                .focus()
                .deleteRange({ from, to })
                .insertContentAt(from, translatedText)
                .run();
            } catch (error) {
              console.error('Error translating text:', error);
              return false;
            }
          };
          translatedText();

          return true;

        },
    };
  },
});
