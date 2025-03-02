import { currentUserService } from "@/services/api/authApiServices";
import { useQuery } from "@tanstack/react-query";

const MINUTE = 60 * 1000;
const STALE_COLLECTION_TIME = 5 * MINUTE;
const GARBAGE_COLLECTION_TIME = 10 * MINUTE;

export const useUser = () => {
  const { data: currentUser, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await currentUserService();
      return response.data?.userDetails;
    },
    staleTime: STALE_COLLECTION_TIME,
    gcTime: GARBAGE_COLLECTION_TIME,
  });

  return { currentUser, isPending };
};
