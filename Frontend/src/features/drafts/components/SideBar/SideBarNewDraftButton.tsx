import { FC } from "react";
import { Button } from "@/components";
import { FilePlus2, ShieldAlert } from "@/Utils/Icons";
import SpinLoader from "@/components/Loader/SpinLoader";
import { useDraftMutations } from "../../hooks/useDraftMutations";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSelectedDraft } from "../../slices/draftSlice";

const SideBarNewDraftButton: FC = () => {
  const { createDraftMutation } = useDraftMutations();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNewDraft = async () => {
    try {
      const response = await createDraftMutation.mutateAsync();
      if (response?.draftId) {
        navigate(`/draft/${response.draftId}`);
        dispatch(
          setSelectedDraft({
            selectedDraft: {
              id: response.draftId,
              title: "",
              content: "",
              image: "",
            },
          })
        );
        toast.success("New Draft created successfully");
      } else {
        toast.error("Failed to create draft: Missing draftId");
      }
    } catch (error) {
      console.error("Error creating draft:", error);
      toast.error("Failed to create draft");
    }
  };

  return (
    <div className="w-full rounded-xl">
      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={handleNewDraft}
        className="w-full flex items-center justify-start space-x-2"
      >
        {createDraftMutation.isPending ? (
          <>
            <SpinLoader />
            Creating Draft
          </>
        ) : createDraftMutation.isError ? (
          <>
            <ShieldAlert size={20} />
            Error Creating Draft
          </>
        ) : (
          <>
            <FilePlus2 size={20} />
            New Draft
          </>
        )}
      </Button>
    </div>
  );
};

export default SideBarNewDraftButton;
