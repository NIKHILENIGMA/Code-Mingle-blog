import { FC } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { EllipsisVertical, Trash2, ScanEye } from "@/Utils/Icons";
import { Button } from "@/components";
import { Draft } from "../../types";
import { useNavigate } from "react-router-dom";
import { useDraftMutations } from "../../hooks/useDraftMutations";
import { toast } from "sonner";

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
          <Button variant="ghost" onClick={() => handlePreview(draft.id)}>
            <ScanEye />
            Preview
          </Button>
          <Button
            variant="ghost"
            onClick={handleDelete}
            disabled={deleteDraftMutation?.isPending}
          >
            <Trash2 />
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SideBarDraftDropDownActions;
