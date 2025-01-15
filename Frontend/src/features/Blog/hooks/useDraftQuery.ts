import { DRAFT_STALE_TIME } from "@/constants/constants";
import {
  allDraftsService,
  autoSaveService,
  createDraftService,
  deleteDraftService,
} from "@/services/api/draftApiServices";
import { Draft } from "@/Types/draft";
import queryClient from "@/Utils/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useDrafts = () => {
  const { data, isPending } = useQuery<{ draft: Draft[] }>({
    queryKey: ["drafts"],
    queryFn: async () => {
      const response = await allDraftsService();
      return response.data;
   },
    staleTime: DRAFT_STALE_TIME,
    gcTime: DRAFT_STALE_TIME,
    refetchOnWindowFocus: false,
  });

  return { data, isPending };
};

export const useCreateDraft = () => {
  const createMutation = useMutation({
    mutationKey: ["createDraft"],
    mutationFn: createDraftService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
    },
  });

  return createMutation;
};



export const useDeleteDraft = () => {
  const deleteMutation = useMutation({
    mutationKey: ["deleteDraft"],
    mutationFn: (id: string) => deleteDraftService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drafts"] });
    },
  });

  return deleteMutation;
};
