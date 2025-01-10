import { Draft } from "@/Types/draft";
import { useMutation } from "@tanstack/react-query";
import queryClient from "@/Utils/queryClient";
import { createDraftService } from "@/services/api/draftApiServices";
import { useCreateDraftReturn } from "../types/useCreateDraft.types";
import { useNavigate } from "react-router-dom";

export const useCreateDraft = (): useCreateDraftReturn => {
  const navigate = useNavigate();

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
    
    onMutate: async () => {
      // Cancel all queries with the key "drafts"
      await queryClient.cancelQueries({ queryKey: ["drafts"] }); 

      // Snapshot the previous value
      const previousDrafts = queryClient.getQueryData<{ drafts: Draft[] }>([
        "drafts",
      ]);
      if (!previousDrafts) {
        return;
      }

      // Return the previous value to rollback
      return { previousDrafts };
    },

    onError: (_, __, context) => {
      // Rollback to the previous value
      queryClient.setQueryData<{ drafts: Draft[] }>(
        ["drafts"],
        context?.previousDrafts
      );
    },

    onSettled: () => {
      // Invalidate the cache to refetch the data
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
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
        navigate(`${draftId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleNewDraft, isPending, isError };
};
