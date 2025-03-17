import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { FC, useEffect } from "react";
import extensions from "@/features/editor/extensions";
import CustomBubbleMenu from "@/features/editor/components/BubbleMenu";
// import Title from "../Ttitle";

interface TiptapEditorProps {
  initialContent: string;
  onContentChange?: (content: string) => void;
}

const TiptapEditor: FC<TiptapEditorProps> = ({
  initialContent,
  onContentChange,
}) => {
  const editor: Editor | null = useEditor({
    extensions: extensions,
    content: initialContent || `<p></p>`, // Initial content if no content present
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      if (onContentChange) {
        onContentChange(htmlContent);
      }
    },
    enableContentCheck: true,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-md xl:prose-xl mx-1 focus:outline-none prose-headings:my-2 prose-p:my-1 rounded-lg text-wrap text-pretty prose dark:prose-dark group",
        style: "min-width: 98%; min-height: 30vw;",
        "aria-label": "Rich Text Editor",
      },
    },
  });
  
  useEffect(() => {
    if (editor && initialContent && editor.getHTML() !== initialContent) {
      queueMicrotask(() => {
        editor.commands.setContent(initialContent, false);
      });
    }
  }, [initialContent, editor]);
  

  useEffect(() => {
    // Cleanup the editor
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  return (
    <div className="relative w-full min-h-screen space-y-2 g editor-wrapper">
      {editor && <CustomBubbleMenu editor={editor} />}

      {/* <Title /> */}
      <EditorContent
        editor={editor}
        className="min-h-[20vw] rounded-lg py-2 w-full flex justify-start pl-2 items-start "
      />

      {/* <hr />
      <div>{editor && <div>{editor.getHTML()}</div>}</div> */}
    </div>
  );
};

export default TiptapEditor;
