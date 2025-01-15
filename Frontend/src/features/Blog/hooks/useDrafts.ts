import { useQuery } from "@tanstack/react-query";
import { allDraftsService } from "@/services/api/draftApiServices";
import { DRAFT_GC_TIME, DRAFT_STALE_TIME } from "@/constants/constants";
import { ApiResponse } from "@/Types/app-response";
import { Draft } from "@/Types/draft";

export const useDrafts = () => {
  const { data, isLoading, isError } = useQuery<ApiResponse<{ drafts: Draft[] }>, Error>({
    queryKey: ["drafts"],
    queryFn: async () => {
      return await allDraftsService();
    },
    staleTime: DRAFT_STALE_TIME,
    gcTime: DRAFT_GC_TIME,
    refetchOnWindowFocus: false,
  });
  const drafts = data?.data

  return { drafts, isLoading, isError };
};
