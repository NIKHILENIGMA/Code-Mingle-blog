import { useQuery } from "@tanstack/react-query";
import {
    allDraftsService,
    getDraftService,
} from "@/services/api/draftApiServices";
import { DRAFT_GC_TIME, DRAFT_STALE_TIME } from "@/constants/constants";

/**
 * Custom hook to manage queries for drafts.
 *
 * This hook provides two queries:
 * 1. `getDraftsQuery`: Fetches all drafts.
 * 2. `getDraftQuery`: Fetches a specific draft by its ID.
 *
 * @param {string} [id] - Optional ID of the draft to fetch. If not provided, only the `getDraftsQuery` will be active.
 * 
 * @returns {Object} - An object containing the following:
 * - `getDraftsQuery`: Query object for fetching all drafts.
 * - `getDraftQuery`: Query object for fetching a specific draft by ID.
 *
 * ### Usage:
 * ```typescript
 * const { getDraftsQuery, getDraftQuery } = useDraftQuery(draftId);
 * 
 *  Access all drafts
 * const allDrafts = getDraftsQuery.data;
 * 
 *  Access a specific draft
 * const singleDraft = getDraftQuery.data;
 * ```
 *
 * ### Notes:
 * - Both queries use `react-query` for data fetching and caching.
 * - `getDraftQuery` is only enabled when a valid `id` is provided.
 * - `refetchOnWindowFocus` is disabled for both queries to prevent unnecessary refetching.
 * - `staleTime` and `gcTime` are configurable constants for cache management.
 */
export const useDraftQuery = (id?: string) => {
  const getDraftsQuery = useQuery({
    queryKey: ["drafts"],
    queryFn: async () => await allDraftsService(),
    refetchOnWindowFocus: false,
    staleTime: DRAFT_STALE_TIME,
    gcTime: DRAFT_GC_TIME,
  });

  const getDraftQuery = useQuery({
    queryKey: ["drafts", id],
    queryFn: async () => {
      if (!id) return;
      const draft = await getDraftService(id);
      return draft?.data?.draft;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    staleTime: DRAFT_STALE_TIME,
    gcTime: DRAFT_GC_TIME,
  });

  return { getDraftsQuery, getDraftQuery };
};
