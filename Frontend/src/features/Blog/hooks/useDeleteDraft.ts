import { deleteDraftService } from "@/services/api/draftApiServices";
import { Draft } from "@/Types/draft";
import queryClient from "@/Utils/queryClient";
import { useMutation } from "@tanstack/react-query";

/**
 * The useDeleteDraft function is a custom hook in TypeScript that handles deleting a draft and
 * invalidating the drafts query.
 * @returns The `useDeleteDraft` custom hook is being returned, which includes a `deleteDraftMutation`
 * object containing the mutation configuration for deleting a draft.
 */

export const useDeleteDraft = () => {
  const deleteDraftMutation = useMutation({
    mutationKey: ["deleteDraft"],
    mutationFn: (draft: Draft) => deleteDraftService(draft.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
    },
  });

  return { deleteDraftMutation };
};
