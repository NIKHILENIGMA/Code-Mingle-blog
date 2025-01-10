import { useQuery } from "@tanstack/react-query";
import { allDraftsService } from "@/services/api/draftApiServices";
import { DRAFT_GC_TIME, DRAFT_STALE_TIME } from "@/constants/constants";


export const useDrafts = (isVisible: boolean) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["drafts"],
    queryFn: async () => {
      try {
        const response = await allDraftsService();

        if (!response) {
          throw new Error(`Draft generation failed: ${response}`);
        }

        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    enabled: !!isVisible,
    staleTime: DRAFT_STALE_TIME,
    gcTime: DRAFT_GC_TIME,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
};
