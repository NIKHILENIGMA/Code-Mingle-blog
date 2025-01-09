import { autoSaveService } from "@/services/api/draftServices";
import { useMutation } from "@tanstack/react-query";
import { useAutoSaveReturn } from "../types/useAutoSave.types";
import { PostContent } from "../components/Drafts/DraftForm";
import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSaveDraft } from "../slices/draftSlice";

export const useAutoSave = (
  id: string,
  content: PostContent
): useAutoSaveReturn => {
  const lastSavedContent = useRef<PostContent | null>(null);
  const dispatch = useDispatch();
  const {
    mutateAsync: autoSaveMutation,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["updateDraft", id],
    mutationFn: () =>
      autoSaveService(id, { title: content.title, content: content.content }),
    onMutate: () => {
      dispatch(setSaveDraft({ saveDraft: false }));
    },
    onSuccess: () => {
      dispatch(setSaveDraft({ saveDraft: true }));
    }
  });

  const handleAutoSave = useCallback(async () => {
    try {
      if (!content.title || !content.content) {
        return; // Skip if no content
      }
      if (
        JSON.stringify(content) === JSON.stringify(lastSavedContent.current)
      ) {
        return; // Skip if no changes
      }

      await autoSaveMutation();

      console.log("Auto saving...");
      lastSavedContent.current = content; // Update last saved content
    } catch (error) {
      console.error(`${(error as Error)?.message} Auto save failed`);
    }
  }, [content, autoSaveMutation]);

  return { handleAutoSave, isPending, isError };
};
