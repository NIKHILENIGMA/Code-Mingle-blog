import { deleteDraftService } from "@/services/api/draftServices";
import { useMutation } from "@tanstack/react-query";

export const useDeleteDraft = (id: string) => {
  const {
    mutateAsync: deleteDraftMutation,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["deleteDraft"],
    mutationFn: async () => {
      await deleteDraftService(id);
    },
  });

  const handleDeleteDraft = async () => {
    try {
      await deleteDraftMutation();
    } catch (error) {
      console.error(error);
    }
  };

  return [handleDeleteDraft, isPending, isError];
};
