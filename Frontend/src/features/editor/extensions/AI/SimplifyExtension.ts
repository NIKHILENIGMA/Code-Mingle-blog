import { simplifyTextContent } from "@/services/openAI";
import { Editor, Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    simplify: {
      simplify: () => ReturnType;
    };
  }
}

export const SimplifyExtension = Extension.create({
  name: "simplify",

  addCommands() {
    return {
      simplify:
        () =>
        ({ editor }: { editor: Editor }) => {
          // Get the range of the selected text from the editor
          const { from, to } = editor.state.selection;

          // If there is no selected text, return
          if (from === to) return false;

          // Get the selected text from the editor
          const selectedText = editor.state.doc.textBetween(from, to, " ");
          
          // If there is no selected text, return
          if (!selectedText.trim()) return false;

          // Api call to simplify the selected text
          const simplify = async () => {
            try {
              const response = await simplifyTextContent(selectedText);
              if (!response) return false;
              
              const simplifiedText = response?.data?.choices[0]?.message?.content
              // Replace the selected text with the simplified text
              editor
                .chain()
                .focus()
                .deleteRange({ from, to })
                .insertContentAt(from, simplifiedText)
                .run();
            } catch (error) {
              console.error(error);
              return false;
            }
          };

          simplify();
          return true;
        },
    };
  },
});
