import { FC } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { EllipsisVertical, Trash2, ScanEye } from "@/Utils/Icons";
import { Button } from "@/components";
import { useDeleteDraft } from "../../hooks/useDeleteDraft";

const SideBarDraftDropDownActions: FC<{ draftId: string }> = ({ draftId }) => {
  const { handleDeleteDraft, isPending } = useDeleteDraft(draftId);
    const handleDelete = async () => {
        await handleDeleteDraft();
    }
  return (
    <div className="flex px-1 font-semibold text-md text-nowrap" key={draftId}>
      <Popover>
        <PopoverTrigger>
          <EllipsisVertical />
        </PopoverTrigger>
        <PopoverContent className="sticky flex flex-col p-2 space-y-2 bg-white rounded-md shadow-md">
          <Button variant="ghost">
            <ScanEye />
            Preview
          </Button>
          <Button
            variant="ghost"
            onClick={handleDelete}
            disabled={isPending}
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
