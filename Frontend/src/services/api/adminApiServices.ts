import { ADMIN_URL } from "@/constants/constants";
import { apiInstance } from "./apiInstance";
import { toast } from "sonner";

export const addCategoryService = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  try {
    const response = await apiInstance.post(`${ADMIN_URL}/categories/new`, {
      name,
      description,
    });

    if (response.status !== 200) {
      toast.error("Failed to add category");
      throw new Error(`${response?.statusText}`);
    }

    toast.success("Category added successfully");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to add category");
  }
};

export const updateCategoryService = async (
  id: number,
  category: { name: string; description: string }
) => {
  try {
    const response = await apiInstance.patch(`${ADMIN_URL}/categories/${id}`, {
      name: category.name,
      description: category.description,
    });

    if (response.status !== 200) {
      toast.error("Failed to update category");
      throw new Error(`${response?.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Failed to update category");
  }
};

export async function deleteCategoryService(id: number) {
  try {
    const response = await apiInstance.delete(`${ADMIN_URL}/categories/${id}`);

    if (response.status !== 200) {
      toast.error("Failed to delete category");
      throw new Error("Failed to delete category");
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getCategoriesService = async () => {
  try {
    const response = await apiInstance.get(`${ADMIN_URL}/categories/`);

    if (response.status !== 200) {
      toast.error("Failed to fetch categories");
      throw new Error(`${response?.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
