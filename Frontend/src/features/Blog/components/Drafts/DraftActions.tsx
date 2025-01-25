import { FC } from "react";
import { ScanEye, Save } from "@/Utils/Icons";
import { Button } from "@/components";
import PublishButton from "./PublishButton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useAutoSaveDraft } from "../../hooks/useAutoSaveDraft";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

const DraftActions: FC = () => {
  const navigate = useNavigate();
  const selectedDraft = useSelector(
    (state: RootState) => state?.draft?.selectedDraft
  );
  const { saveDraftMutation } = useAutoSaveDraft();

  //todo Complete the save function to save the draft
  const handleSave = async () => {
    if (!selectedDraft) return;

    await saveDraftMutation.mutateAsync(selectedDraft);
  };

  const handlePreview = () => {
    navigate(`/preview/${selectedDraft?.id}`);
  };

  return (
    <div className="fixed top-0 z-10 flex items-center justify-center w-full h-16 backdrop:blur-md ">
      <div className="flex items-center justify-center h-full px-3 space-x-2 md:w-1/4 lg:w-1/3">
        <ModeToggle />
        <Button variant="ghost" onClick={handleSave}>
          <Save /> Save
        </Button>

        <Button variant="secondary" onClick={handlePreview}>
          <ScanEye /> Preview
        </Button>

        <PublishButton />
      </div>
    </div>
  );
};

export default DraftActions;
