import { useQuery } from "@tanstack/react-query";
import { allDraftsService } from "@/services/api/draftServices";

export const useFetchDrafts = ({ isOpen }: { isOpen: boolean }) => {
  const { data, isLoading } = useQuery({
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
    enabled: !!isOpen,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading };
};
