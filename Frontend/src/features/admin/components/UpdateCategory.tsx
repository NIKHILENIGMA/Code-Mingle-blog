import { ChangeEvent, FC, FormEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  Input,
  Label,
} from "@/components";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useCategoryMutations } from "../hooks/useCategoryMutation";
import { toast } from "sonner";

interface UpdateCategoryProps {
  id: number;
  name: string;
  description: string;
}

const UpdateCategory: FC<UpdateCategoryProps> = ({ id, name, description }) => {
  const { updateCategory } = useCategoryMutations();
  const [category, setCategory] = useState({
    name,
    description,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  const handleUpdateCategory = async (e: FormEvent, id: number) => {
    e.preventDefault();
    await updateCategory.mutateAsync({
      id,
      category,
    });
    toast.success("Category updated successfully");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  };

  const cancelModel = () => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-3 py-2 border rounded-md hover:text-primary hover:border-primary/65">
          <Pencil size={16} className="" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-card border border-primary rounded-md">
        <DialogHeader>
          <DialogTitle>Edit Category Information</DialogTitle>
          <DialogDescription>
            Edit the details below to update the category. Provide a name and an
            optional description
          </DialogDescription>
          <form
            className="space-y-6"
            onSubmit={(e) => handleUpdateCategory(e, id)}
          >
            <div>
              <Label htmlFor="name" className="block text-sm font-medium">
                Name:
              </Label>
              <Input
                id="name"
                name="name"
                value={category.name}
                placeholder="Enter the new name"
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div>
              <Label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description:
              </Label>
              <Textarea
                rows={6}
                id="description"
                name="description"
                value={category.description}
                placeholder="Enter the new description"
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-xs focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                variant="default"
                type="submit"
                className="px-4 py-2 text-sm font-medium"
              >
                Update
              </Button>
              <Button
                variant="secondary"
                type="button" // Explicitly set type to "button"
                className="px-4 py-2 text-sm font-medium"
                onClick={cancelModel}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategory;
