import { FC } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

interface DeleteDialogProps {
  id: string | number;
  title: string;
  btnText?: string;
  description: string;
  variant?: "ghost" | "secondary";
  onDelete: (id: string | number) => void;
}

//
// This action cannot be undone. This will permanently delete the category.
const DeleteDialog: FC<DeleteDialogProps> = ({
  id,
  title,
  description,
  btnText = "Delete",
  variant = "ghost",
  onDelete,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          className="px-3 py-2 border rounded-md hover:text-primary hover:border-primary/65"
        >
          <Trash2 size={16} className="" /> {btnText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <div className="flex justify-end space-x-4">
            <Button
              variant={"destructive"}
              className=" border rounded-md"
              onClick={() => onDelete(id)}
            >
              Delete
            </Button>
            <Button
              variant={"secondary"}
              onClick={() =>
                document.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "Escape" })
                )
              }
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
