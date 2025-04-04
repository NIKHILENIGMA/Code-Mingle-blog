import { Editor, Extension } from "@tiptap/core";
import { changeTone } from '@/services/openAI';

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    tone: {
      setTone: (toneType: string) => ReturnType;
    };
  }
}

export const ChangeToneExtension = Extension.create({
  name: "tone-changer",

  addCommands() {
    return {
      setTone:
        (toneType: string) =>
        ({ editor }: { editor: Editor }) => {
            //  Get the range of the selected text from the editor
            const { from, to } = editor.state.selection;
            
            // If there is no selected text, return
            if (from === to) return false;
            
            // Get the selected text from the editor
            const selectedText = editor.state.doc.textBetween(from, to, " ");
            
            // If there is no selected text, return
            if (!selectedText.trim()) return false;
            
            // Api call to change the tone of the selected text
            const changedTone = async () => {
                try {
                const response = await changeTone(selectedText, toneType);
                  
                const changeToneText = response?.data;
                editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .insertContentAt(from, changeToneText)
                    .run();
                } catch (error) {
                console.error(error);
                return false;
                }
            };
            
            // Call the function to change the tone
            changedTone();
            // Return true if the tone is changed successfully
            return true; 
        },
    };
  },
});
