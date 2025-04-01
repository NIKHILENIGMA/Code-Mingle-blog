import { FC } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { EllipsisVertical, ScanEye } from "@/Utils/Icons";
import { Button } from "@/components";
import { Draft } from "../../types";
import { useNavigate } from "react-router-dom";
import { useDraftMutations } from "../../hooks/useDraftMutations";
import { toast } from "sonner";
import DeleteDialog from "@/components/DeleteDialog";

const SideBarDraftDropDownActions: FC<{ draft: Draft }> = ({ draft }) => {
  const navigation = useNavigate();
  const { deleteDraftMutation } = useDraftMutations();

  const handleDelete = () => {
    deleteDraftMutation.mutate(draft?.id);
    toast.success("Draft deleted successfully", { duration: 3000 });
  };

  const handlePreview = (id: string) => {
    // Preview draft
    navigation(`/preview/${id}/`);
    console.log("Preview draft", id);
  };

  return (
    <div
      className="flex px-1 font-semibold text-md text-nowrap"
      key={draft?.id}
    >
      <Popover>
        <PopoverTrigger>
          <EllipsisVertical />
        </PopoverTrigger>

        {/* Preview and Delete draft */}
        <PopoverContent className="sticky flex flex-col p-2 space-y-2 bg-white dark:bg-[#000700] rounded-md shadow-md">
          <Button
            variant="ghost"
            onClick={() => handlePreview(draft.id)}
            className="border rounded-md hover:text-primary hover:border-primary/65"
          >
            <ScanEye />
            Preview
          </Button>
          <DeleteDialog
            id={draft?.id}
            title="Confirm Draft Deletion"
            description="By deleting this draft, you will lose all the changes made to it. This action cannot be undone. This will permanently delete the draft."
            onDelete={handleDelete}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SideBarDraftDropDownActions;
