import { useEditor, EditorContent, Editor } from "@tiptap/react";
import { FC, useEffect } from "react";
import extensions from "../../core/extensions";
import CustomBubbleMenu from "../BubbleMenu/CustomBubbleMenu";

interface TiptapEditorProps {
  initialContent: string;
  onContentChange?: (content: string) => void;

}
// 
/**
 *  TiptapEditor
 */

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
          "prose prose-sm sm:prose lg:prose-md xl:prose-xl mx-1 focus:outline-none prose-headings:my-2 prose-p:my-1 rounded-lg text-wrap text-pretty",
        style: "min-width: 98%; min-height: 30vw;",
        "aria-label": "Rich Text Editor",
      },
    },
  });
  useEffect(() => {
    // Set initial content if it changes after the editor is mounted and content is not the same
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
      
  }, [initialContent, editor]);

  useEffect(() => {
    // Cleanup the editor
    return () => {
      editor?.destroy();
    }; 
  }, [editor]);
  

  return (
    <div className="relative w-full min-h-full space-y-2 g editor-wrapper">
      {editor && <CustomBubbleMenu editor={editor} />}
      <EditorContent
        editor={editor}
        className="min-h-[20vw] rounded-lg py-2 w-full flex justify-start pl-2 items-start "
      />
    </div>
  );
};

export default TiptapEditor;
