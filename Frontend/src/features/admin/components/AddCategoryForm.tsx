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
import { Textarea } from "@/components/ui/textarea";
import { useCategoryMutations } from "../hooks/useCategoryMutation";

const AddCategoryForm: FC = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const { addCategory } = useCategoryMutations();

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

  const handleCategorySubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Add category to the database
    await addCategory.mutateAsync(category);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    setCategory({
      name: "",
      description: "",
    });
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add category</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new category</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new category. Provide a name
              and an optional description.
            </DialogDescription>
            <form onSubmit={handleCategorySubmit}>
              <div className="mt-4">
                <Label className="block mb-2 text-muted-foreground">
                  Category Name:
                </Label>
                <Input
                  type="text"
                  name="name"
                  value={category?.name}
                  onChange={handleInputChange}
                  autoComplete="off"
                  placeholder="Enter category name"
                />
              </div>
              <div className="mt-4">
                <Label className="block mb-2 text-muted-foreground">
                  Description:
                </Label>
                <Textarea
                  cols={42}
                  rows={5}
                  name="description"
                  autoComplete="off"
                  value={category?.description}
                  onChange={handleInputChange}
                  placeholder="Enter category description"
                />
              </div>
              <div className="mt-6 flex justify-end">
                <Button type="submit" variant={"default"}>
                  Add Category
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCategoryForm;
