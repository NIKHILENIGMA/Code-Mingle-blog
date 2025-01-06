import { getDraftService } from "@/services/api/draftServices";
import { useQuery } from "@tanstack/react-query";

export const useFetchDraftById = (draftId: string) => {
  const { data, isLoading } = useQuery({
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
  });

  return { data, isLoading };
};
