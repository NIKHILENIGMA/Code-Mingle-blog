import { FC } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { EllipsisVertical, Trash2, ScanEye } from "@/Utils/Icons";
import { Button } from "@/components";
import { useDeleteDraft } from "../../hooks/useDeleteDraft";
import { Draft } from "@/Types/draft";
import { useNavigate } from "react-router-dom";

const SideBarDraftDropDownActions: FC<{ draft: Draft }> = ({ draft }) => {
  const { deleteDraftMutation } = useDeleteDraft();
  const navigation = useNavigate();

  const handleDelete = () => {
    deleteDraftMutation.mutate(draft);
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
