import { getDraftService } from "@/services/api/draftApiServices";
import { useQuery } from "@tanstack/react-query";
// import { useDraftReturn } from "../types/useDraft.types";
import { DRAFT_STALE_TIME } from "@/constants/constants";

export const useDraft = (draftId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["drafts", draftId],
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
    refetchOnWindowFocus: false,
    staleTime: DRAFT_STALE_TIME,
    gcTime: DRAFT_STALE_TIME,
  });

  return { Draft: data, isLoading, isError };
};
