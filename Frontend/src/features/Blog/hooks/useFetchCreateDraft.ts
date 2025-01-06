import { useMutation } from "@tanstack/react-query";
import { createDraftService } from "@/services/api/draftServices";
import { useNavigate } from "react-router-dom";

export const useFetchCreateDraft = () => {
  const navigate = useNavigate();

  const { mutateAsync: newDraftMutation } = useMutation({
    mutationKey: ["newDraft"],
    mutationFn: async () => {
      const response = await createDraftService();
      console.log("Mutation Fn: ", response);
      return response?.data;
    },
  });

  const handleNewDraft = async () => {
    try {
      const newDraft = await newDraftMutation();

      if (!newDraft) {
        throw new Error("Draft creation failed!");
      } else {
        navigate(`/draft/${newDraft?.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [handleNewDraft];
};
