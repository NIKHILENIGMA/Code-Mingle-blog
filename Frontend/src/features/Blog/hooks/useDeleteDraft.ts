import { deleteDraftService } from "@/services/api/draftApiServices";
import { Draft } from "@/Types/draft";
import queryClient from "@/Utils/queryClient";
import { useMutation } from "@tanstack/react-query";

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
