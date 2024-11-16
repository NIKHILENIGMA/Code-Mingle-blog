import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { HousePlus } from "lucide-react";

export const insertHelloWorldItem = (editor: BlockNoteEditor) => ({
  title: "Code Block",

  onItemClick: () => {
    // Block that the text cursor is currently in.
    const currentBlock = editor.getTextCursorPosition().block;

    // New block we want to insert.
    const codeBlock: PartialBlock = {
      type: "paragraph",
      content: [
        { 
          type: "text", 
          text: "", 
          styles: { 
            bold: false, 
            italic: true 
          } 
        }
      ],
    };

    // Inserting the new block after the current one.
    editor.insertBlocks([codeBlock], currentBlock, "after");
  },

  aliases: ["helloworld", "hw"],
  group: "Custom",
  icon: <HousePlus />,
  subtext: "Used to insert a block with 'Hello World' below.",
});
