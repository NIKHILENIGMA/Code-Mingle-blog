// src/tiptap/components/EditorRoot.tsx
import { type FC } from "react";
import { EditorContent } from "@tiptap/react";
import { useEditorInstance } from "../hooks/useEditorInstance";
import { BubbleTools } from "./BubbleTools";
import { DragHandle } from "@tiptap/extension-drag-handle-react";
// import { Node as ProseMirrorNode } from "prosemirror-model";

export const EditorRoot: FC = () => {

  
  const { editor, isActive } = useEditorInstance({
    placeholder: "Write something awesome...",
  });

  if (!editor) return null;

  return (
    <div className=" bg-background rounded-2xl">
      {/* <Toolbar editor={editor} /> */}
      <div className="min-h-[70vh] p-6 border-none rounded-md shadow-none">
        {/* Drag handle */}

        <DragHandle
          editor={editor}
          // onNodeChange={({ node }) => {
          //   if (node?.type?.name !== "ai-chat-extension") {
          //     setSelectedNode(null);
          //   } else {
          //     setSelectedNode(node);
          //   }
          // }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-grip-vertical-icon lucide-grip-vertical"
          >
            <circle cx="9" cy="12" r="1" />
            <circle cx="9" cy="5" r="1" />
            <circle cx="9" cy="19" r="1" />
            <circle cx="15" cy="12" r="1" />
            <circle cx="15" cy="5" r="1" />
            <circle cx="15" cy="19" r="1" />
          </svg>
        </DragHandle>

        <EditorContent editor={editor} className="border-none shadow-none" />
      </div>
      <BubbleTools editor={editor} active={isActive} />
    </div>
  );
};
