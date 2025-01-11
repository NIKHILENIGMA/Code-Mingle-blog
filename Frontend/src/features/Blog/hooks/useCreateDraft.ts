import { useMutation } from "@tanstack/react-query";
import { createDraftService } from "@/services/api/draftApiServices";
import { useCreateDraftReturn } from "../types/useCreateDraft.types";
import queryClient from "@/Utils/queryClient";

export const useCreateDraft = (): useCreateDraftReturn => {
  /// Create a new draft
  const {
    mutateAsync: newDraftMutation,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["newDraft"],
    mutationFn: async () => {
      const axiosResponse = await createDraftService();
      console.log("Created user data: ", axiosResponse?.data);
      return axiosResponse?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["drafts"]});
    },
  });

  /// Handle new draft creation
  const handleNewDraft = async () => {
    try {
      // Create a new draft
      const newDraft = await newDraftMutation();

      if (!newDraft) {
        throw new Error("Draft creation failed!");
      } else {
        console.log("New draft created: ", newDraft);
        const draftId = newDraft?.draft?.id;

        return draftId;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleNewDraft, isPending, isError };
};
