import { FC, useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

const AdminCategory: FC = () => {
  const [categories, setCategories] = useState([
    { name: "Example Category", description: "This is an example category." },
  ]);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      setCategories([
        ...categories,
        { name: categoryName, description: description.trim() },
      ]);
      setCategoryName("");
      setDescription("");
    }
  };

  const handleDeleteCategory = (index: number) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  };

  return (
    <div className="w-full min-h-[70vh] overflow-y-auto mx-auto mt-2 p-6 bg-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Category Management
      </h2>

      <Dialog>
        <DialogTrigger 
        >
          {/* className="bg-purple-600 px-4 py-2 rounded-md text-white hover:bg-purple-500" */}
          Add category
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new category</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new category. Provide a name
              and an optional description.
            </DialogDescription>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter category name"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                cols={42}
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Enter category description (optional)"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500"
              >
                Add Category
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* Table */}
      <div className="mt-6">
        <table className="w-full bg-white border border-gray-200 shadow-sm rounded-md">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="p-3 text-left w-10">
                <Checkbox className="fill-purple-400"/>
              </th>
              <th className="p-3 text-left">Category Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index} className="border-t hover:bg-gray-100 transition">
                <td className="p-3">
                  <Checkbox />
                </td>
                <td className="p-3">{category.name}</td>
                <td className="p-3">
                  {category.description || "No description provided"}
                </td>
                <td className="p-3 text-center flex justify-center space-x-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Pencil />
                  </button>
                  <button
                    onClick={handleDeleteCategory.bind(null, index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategory;
