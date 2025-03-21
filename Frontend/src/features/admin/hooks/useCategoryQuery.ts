import { useQuery } from "@tanstack/react-query";
import { getCategoriesService } from "@/services/api/adminApiServices";

export const useCategoryQuery = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => await getCategoriesService(),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        gcTime: 1000 * 60 * 10,
    });

    const categories = data?.data;

    return { categories, isLoading };
};