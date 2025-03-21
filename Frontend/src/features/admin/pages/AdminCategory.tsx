import { FC } from "react";
import AddCategoryForm from "../components/AddCategoryForm";
import CategoryTable from "../components/CategoryTable";
import { useCategoryQuery } from "../hooks/useCategoryQuery";

const AdminCategory: FC = () => {
  const { categories, isLoading } = useCategoryQuery();

  return (
    <div className="w-full min-h-[70vh] overflow-y-auto mx-auto mt-2 p-6 ">
      <h2 className="text-2xl font-semibold mb-4">Category Management</h2>
      <AddCategoryForm />
      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <CategoryTable categories={categories} />
      )}
    </div>
  );
};

export default AdminCategory;
