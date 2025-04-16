import Underline from "@tiptap/extension-underline";

export const ExtendedUnderline = Underline.extend({
  name: "extendedUnderline",

  addKeyboardShortcuts() {
    return {
      "Mod-U": () => {
        this.editor.commands.toggleUnderline();
        return true;
      },
    };
  },
});
