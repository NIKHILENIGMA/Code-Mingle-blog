import {
  addCategoryService,
  deleteCategoryService,
  updateCategoryService,
} from "@/services/api/adminApiServices";
import queryClient from "@/Utils/queryClient";
import { useMutation } from "@tanstack/react-query";

export const useCategoryMutations = () => {
  // Add category mutation
  const addCategory = useMutation({
    mutationKey: ["addCategory"],
    mutationFn: async (category: { name: string; description: string }) => {
      const response = await addCategoryService(category);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const updateCategory = useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: async ({
      id,
      category,
    }: {
      id: number;
      category: { name: string; description: string };
    }) => {
      const response = await updateCategoryService(id, category);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  // Delete category mutation
  const deleteCategory = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: async (id: number) => {
      const response = await deleteCategoryService(id);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { addCategory, deleteCategory, updateCategory };
};
