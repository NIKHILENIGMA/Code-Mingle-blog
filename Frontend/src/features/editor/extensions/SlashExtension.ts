import { Extension } from "@tiptap/core";
import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";
import { ReactRenderer } from "@tiptap/react";
import SlashMenu from "../components/SlashCommand/SlashMenu";

/**
 * A Tiptap extension that adds slash command functionality to the editor
 */
export const SlashExtension = Extension.create({
  name: "slash",
  addProseMirrorPlugins() {
    let MenuRenderer: ReactRenderer | null = null;

    /**
     * Gets the text after the slash character in the current selection
     * @param state - The editor state
     * @returns The text after the slash, or empty string if no match
     */
    const getText = (state: EditorState) => {
      const { $from } = state.selection;
      const text = $from.parent.textBetween(
        0,
        $from.pos - $from.start(),
        "",
        "\0"
      );

      const match = text.match(/\/([a-z]*)$/i);
      if (match) {
        return match[1];
      }
      return "";
    };

    /**
     * Handles the up arrow key press in the menu
     */
    const handleArrowUp = () => {
      if (MenuRenderer) {
        MenuRenderer.updateProps({ direction: "up" });
      }
    };

    /**
     * Opens the slash command menu
     * @param view - The editor view
     */
    const openMenu = (view: EditorView) => {
      if (MenuRenderer) return;

      MenuRenderer = new ReactRenderer(SlashMenu, {
        props: {
          editor: this.editor,
          onClose: closeMenu,
        },
        editor: this.editor,
      });

      updateMenuPosition(view);

      // Ensure it attaches to the document
      document.body.appendChild(MenuRenderer.element);
      MenuRenderer.updateProps({}); // Force re-render
    };

    /**
     * Closes and destroys the slash command menu
     */
    const closeMenu = () => {
      MenuRenderer?.destroy();
      MenuRenderer = null;
    };

    /**
     * Updates the position and query of the slash command menu
     * @param view - The editor view
     */
    const updateMenuPosition = (view: EditorView) => {
      // Ensure the menu is open
      if (!MenuRenderer) return;

      // Get the text after the slash
      const slashText = getText(view.state);

      // Update the query prop
      MenuRenderer.updateProps({ query: slashText });

      // Get the position of the cursor
      const { left, top } = view.coordsAtPos(view.state.selection.$from.pos);
      Object.assign((MenuRenderer.element as HTMLElement).style, {
        position: "absolute",
        left: `${left}px`,
        top: `${top + 30}px`,
        background: "white",
        zIndex: "1000",
      });
    };

    return [
      new Plugin({
        key: new PluginKey("slashCommands"),
        props: {
          /**
           * Handles keyboard events for the slash command menu
           * @param view - The editor view
           * @param event - The keyboard event
           * @returns true if the event was handled, false otherwise
           */
          handleKeyDown: (view, event) => {
            if (event.key === "/") {
              openMenu(view); // Delay menu opening
              return false; // Allow the `/` to be inserted
            }
            if (MenuRenderer) {
              updateMenuPosition(view);
            }
            // Close the menu on enter
            if (MenuRenderer && event.key === "Enter") {
              closeMenu();
              return true;
            }
            // Close the menu on backspace
            if (event.key === "Backspace" && MenuRenderer) {
              const text = getText(view.state);
              if (text === "") {
                closeMenu();
              }
            }

            // Change the selection in the menu
            if (MenuRenderer && event.key === "ArrowUp") {
              handleArrowUp();
              return true;
            } else if (MenuRenderer && event.key === "ArrowDown") {
              MenuRenderer.updateProps({ direction: "down" });
              return true;
            }

            // Close the menu on escape
            if (MenuRenderer && event.key === "Escape") {
              closeMenu();
              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});
