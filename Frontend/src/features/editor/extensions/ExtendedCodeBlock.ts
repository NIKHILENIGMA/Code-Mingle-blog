import { ReactNodeViewRenderer } from "@tiptap/react";
import LanguageSelectorNodeView from "../components/LanguageSelectorNodeView";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";




export const ExtendedCodeBlock = CodeBlockLowlight.extend({
  name: "extendedCodeBlock",

  addNodeView() {
    return ReactNodeViewRenderer(LanguageSelectorNodeView);
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-K": () => {
        this.editor.commands.toggleCodeBlock();
        return true;
      },
    };
  }
});
