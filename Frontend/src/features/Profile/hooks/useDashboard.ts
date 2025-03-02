import { useQuery } from "@tanstack/react-query";
import { userDashboard } from "@/services/api/userApiSevices";

export const useDashboard = () => {
  const { data: user, isPending } = useQuery({
    queryKey: ["dashboard"],
    queryFn: userDashboard,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep cache for 10 minutes even if unused
    refetchOnWindowFocus: false, // Prevent refetching when switching tabs
  });

  return { user: user?.data.dashboard, isPending };
};
