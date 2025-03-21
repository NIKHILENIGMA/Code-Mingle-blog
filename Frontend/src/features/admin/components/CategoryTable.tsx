import { FC } from "react";
import { Category } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useCategoryMutations } from "@/features/admin/hooks/useCategoryMutation";
import DeleteDialog from "@/components/DeleteDialog";
import UpdateCategory from "./UpdateCategory";

interface CategoryTableProps {
  categories: Category[];
}

const CategoryTable: FC<CategoryTableProps> = ({ categories }) => {
  const { deleteCategory } = useCategoryMutations();
  const handleDeleteCategory = async (id: number) => {
    // Delete category from the database
    await deleteCategory.mutateAsync(id);
    toast.success("Category deleted successfully");
  };

  return (
    <div className="mt-4">
      <table className="w-full border shadow-sm rounded-md">
        <thead className="text-muted-foreground uppercase text-sm">
          <tr>
            <th className="p-3 text-left w-10">
              <Checkbox className="" />
            </th>
            <th className="p-3 text-left">Category Name</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: Category, index: number) => (
            <tr
              key={index}
              className="border-t transition hover:bg-muted/50 hover:text-accent-foreground"
            >
              <td className="p-3">
                <Checkbox />
              </td>
              <td className="p-3">{category.name}</td>
              <td className="p-3">
                {category.description || "No description provided"}
              </td>
              <td className="p-3 text-center flex justify-center space-x-4">
                <UpdateCategory
                  id={category?.id}
                  name={category?.name}
                  description={category?.description}
                />
                <DeleteDialog
                  id={category?.id}
                  title="Are you sure you want to delete this category?"
                  description="This action cannot be undone. This will permanently delete the category."
                  onDelete={handleDeleteCategory}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
