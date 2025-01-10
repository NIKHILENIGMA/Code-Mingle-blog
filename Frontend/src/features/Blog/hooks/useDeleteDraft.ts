import { deleteDraftService } from "@/services/api/draftApiServices";
import { Draft } from "@/Types/draft";
import queryClient from "@/Utils/queryClient";
import { useMutation } from "@tanstack/react-query";

export const useDeleteDraft = (id: string) => {
  const {
    mutateAsync: deleteDraftMutation,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["deleteDraft", id],
    mutationFn: async () => {
      await deleteDraftService(id);
    },

    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["drafts"] });
      // Snapshot the previous value
      const previousDrafts = queryClient.getQueryData<{ drafts: Draft[] }>([
        "drafts",
      ]);
      // Optimistically update to the new value
      queryClient.setQueryData<{ drafts: Draft[] }>(["drafts"], (old) => {
        if (!old) return { drafts: [] };
        return {
          drafts: old.drafts.filter((draft: Draft) => draft.id !== id),
        };
      });

      // Return the previous value to rollback
      return { previousDrafts };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData<{ drafts: Draft[] }>(
        ["drafts"],
        context?.previousDrafts
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
    },
  });

  const handleDeleteDraft = async () => {
    try {
      await deleteDraftMutation();
    } catch (error) {
      console.error(error);
    }
  };

  return [handleDeleteDraft, isPending, isError];
};
