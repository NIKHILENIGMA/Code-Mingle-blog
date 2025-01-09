import { getDraftService } from "@/services/api/draftServices";
import { useQuery } from "@tanstack/react-query";
import { useDraftReturn } from "../types/useDraft.types";

export const useDraft = (draftId: string): useDraftReturn => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["draft", draftId],
    queryFn: async () => {
      try {
        if (!draftId) return;
        const post = await getDraftService(draftId);

        return post?.data?.draft;
      } catch (error) {
        console.error(error);
      }
    },
    enabled: !!draftId,
  });

  return { Draft: data, isLoading, isError };
};
