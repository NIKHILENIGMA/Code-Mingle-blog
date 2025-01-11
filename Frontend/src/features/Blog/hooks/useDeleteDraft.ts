import { deleteDraftService } from "@/services/api/draftApiServices";
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
      console.log("Deleting draft");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
    }

  });

  const handleDeleteDraft = async () => {
    try {
      await deleteDraftMutation();
    } catch (error) {
      console.error(error);
    }
  };

  return { handleDeleteDraft, isPending, isError };
};
