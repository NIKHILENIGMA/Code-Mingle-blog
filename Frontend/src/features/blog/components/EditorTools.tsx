import {
  BlockNoteEditor,
  filterSuggestionItems,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";

import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import { insertHelloWorldItem } from "@/Utils/CustomSlashGenerator";

// Custom Slash Menu item to insert a block after the current one.

async function uploadFile(file:File) {
  const data = new FormData();
  data.append('file', file);

  return fetch('https://api.example.com/upload', {
    method: 'POST',
    body: data
  })
}


// List containing all default Slash Menu Items, as well as our custom one.
const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  ...getDefaultReactSlashMenuItems(editor),
  insertHelloWorldItem(editor),
];

export default function EditorTools() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this your writing pad!",
      },
    ],
    uploadFile
  });

  // console.log(editor);
  // Renders the editor instance.
  return (
    <BlockNoteView editor={editor} slashMenu={false} theme={"light"}>
      <SuggestionMenuController
        triggerCharacter={"/"}
        // Replaces the default Slash Menu items with our custom ones.
        getItems={async (query) =>
          filterSuggestionItems(getCustomSlashMenuItems(editor), query)
        }
      />
      
    </BlockNoteView>
  );
}
