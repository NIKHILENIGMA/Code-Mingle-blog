import { useMutation } from "@tanstack/react-query";
import { createDraftService } from "@/services/api/draftApiServices";
import queryClient from "@/Utils/queryClient";

/**
 * The useCreateDraft function in TypeScript defines a mutation for creating a draft and invalidating
 * the drafts query.
 * @returns The `useCreateDraft` hook is being returned, which includes the `createDraftMutation`
 * function that can be used to create a draft and invalidate the "drafts" query in the `onSuccess`
 * callback.
 */

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
