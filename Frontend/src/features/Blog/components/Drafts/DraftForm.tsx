import React, { FC, useState, useCallback, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import ShowBlogCoverImage from "@/features/Blog/components/BlogImages/ShowBlogCoverImage";
import TiptapEditor from "@/features/Blog/components/Editor/TipTapEditor";
import CoverImagePopover from "@/features/Blog/components/BlogImages/CoverImagePopover";
import { useImage } from "../../hooks/useImage";
import { Draft } from "@/Types/draft";
import { useDebounce } from "@/hooks/useDebounce";
import { useAutoSave } from "../../hooks/useAutoSave";

export interface PostContent {
  title: string;
  content: string;
}

interface DraftFormProps {
  draft: Draft;
}

const DraftForm: FC<DraftFormProps> = ({ draft }) => {
  const [postContent, setPostContent] = useState<PostContent>({
    title: draft?.title || "",
    content: draft?.content || "",
  });

  /// Get blog cover image
  const { blogCoverImg } = useImage();

  /// Handle title changes
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setPostContent((prev) => ({
        ...prev,
        title: value,
      }));
    },
    []
  );

  /// Handle editor change
  const handleEditorChange = useCallback((content: string) => {
    setPostContent((prev) => ({
      ...prev,
      content,
    }));
  }, []);

  /// Debounce the content
  const debounceContent = useDebounce(postContent, 2000);
  
  /// Handle auto save
  const { handleAutoSave } = useAutoSave(draft.id, debounceContent);
  
  /// Auto save on content change
  useEffect(() => {
    if (debounceContent) {
      handleAutoSave();
    }
  }, [debounceContent, handleAutoSave]);

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen p-5 py-10 mt-5">
      <div className="flex flex-col h-full w-[80vw] p-2 lg:pl-32 mx-auto space-y-3 rounded-lg">
        <div className="flex flex-col justify-start w-full mb-4 space-y-4">
          {blogCoverImg ? (
            <ShowBlogCoverImage image={blogCoverImg} />
          ) : (
            <CoverImagePopover className="w-1/4" />
          )}

          <Textarea
            name="title"
            rows={1}
            maxLength={90}
            value={postContent.title}
            placeholder="Article Title...."
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
            onChange={handleTitleChange}
            className="text-3xl font-bold border-none shadow-none outline-none resize-none focus:border-white focus:ring-0 focus:outline-none focus:ring-offset-white"
          />
        </div>

        <div className="w-full h-full space-y-4">
          <TiptapEditor
            initialContent={postContent.content}
            onContentChange={handleEditorChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DraftForm;
