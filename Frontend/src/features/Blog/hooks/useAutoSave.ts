import { autoSaveService } from "@/services/api/draftApiServices";
import { useMutation } from "@tanstack/react-query";
import { useAutoSaveReturn } from "../types/useAutoSave.types";
import { PostContent } from "../components/Drafts/DraftForm";
import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSaveDraft } from "../slices/draftSlice";
import queryClient from "@/Utils/queryClient";
import { Draft } from "@/Types/draft";

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
    onMutate: async () => {
      dispatch(setSaveDraft({ saveDraft: false }));

      // Cancel all queries related to drafts and draft
      await queryClient.cancelQueries({ queryKey: ["drafts"] }); // Cancel all drafts queries
      await queryClient.cancelQueries({ queryKey: ["draft", id] }); // Cancel draft query

      // Snapshot the previous value
      const previousDraft = queryClient.getQueryData<{ draft: Draft }>([
        "draft",
        id,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData<{ draft: Draft }>(["draft", id], (old) => {
        if (!old) return { draft: { title: "", content: "", id } };
        return {
          draft: {
            title: content.title,
            content: content.content,
            id: old?.draft.id || id,
          },
        };
      });

      // Update the drafts query
      queryClient.setQueryData<{ drafts: Draft[] }>(["drafts"], (old) => {
        if (!old || !Array.isArray(old?.drafts)) {
          return { drafts: [] }; // Return an empty drafts array if the old data is undefined or invalid
        }
        return {
          drafts: old?.drafts?.map((draft) => {
            if (draft.id === id) {
              return { title: content.title, content: content.content, id };
            }
            return draft;
          }),
        };
      });

      // Return the previous value to rollback
      return { previousDraft };
    },
    onSettled: () => {
      dispatch(setSaveDraft({ saveDraft: true }));

      // Invalidate all queries related to drafts and draft
      queryClient.invalidateQueries({ queryKey: ["drafts"] }); // Invalidate all drafts queries
      queryClient.invalidateQueries({ queryKey: ["draft", id] }); // Invalidate draft query
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
