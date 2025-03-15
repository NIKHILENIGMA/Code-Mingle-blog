import queryClient from "@/Utils/queryClient";
import { Draft } from "@/Types/draft";
import { useMutation } from "@tanstack/react-query";
import { updateDraftService } from "@/services/api/draftApiServices";

export const useAutoSaveDraft = () => {
  const saveDraftMutation = useMutation({
    mutationKey: ["saveDraft"],
    mutationFn: (draft: Draft) =>
      updateDraftService(draft.id, {
        title: draft?.title || "",
        content: draft?.content || "",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
    },
  });

  return { saveDraftMutation };
};
