import { useMutation } from "@tanstack/react-query";
import { createDraftService } from "@/services/api/draftApiServices";
import queryClient from "@/Utils/queryClient";

export const useCreateDraft = () => {
  const createDraftMutation = useMutation({
    mutationKey: ["createDraft"],
    mutationFn: async () => {
      return await createDraftService();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
    },
  });

  return { createDraftMutation };
};
