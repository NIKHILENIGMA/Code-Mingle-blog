import { autoSaveService } from "@/services/api/draftApiServices";
import { useMutation } from "@tanstack/react-query";
import { useAutoSaveReturn } from "../types/useAutoSave.types";
import { PostContent } from "../components/Drafts/DraftForm";
import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSaveDraft } from "../slices/draftSlice";
import queryClient from "@/Utils/queryClient";


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
    mutationFn: async () => {
      await autoSaveService(id, {
        title: content.title,
        content: content.content,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
      dispatch(setSaveDraft({ saveDraft: true }));
    },
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
      console.error(`${error as Error} Auto save failed`);
    }
  }, [content, autoSaveMutation]);

  return { handleAutoSave, isPending, isError };
};
