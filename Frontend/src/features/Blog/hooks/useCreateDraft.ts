import { useMutation } from "@tanstack/react-query";
import { createDraftService } from "@/services/api/draftServices";
import { useNavigate } from "react-router-dom";
import { useCreateDraftReturn } from "../types/useCreateDraft.types";

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
      const response = await createDraftService();
      console.log("Created user data: ", response?.data);
      return response?.data;
    },
  });

  /// Handle new draft creation
  const handleNewDraft = async () => {
    try {
      const newDraft = await newDraftMutation();

      if (!newDraft) {
        throw new Error("Draft creation failed!");
      } else {
        console.log("New draft created: ", newDraft);
        navigate(`${newDraft?.draftId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { handleNewDraft, isPending, isError };
};
