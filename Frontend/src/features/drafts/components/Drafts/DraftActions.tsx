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

  const handleSave = async () => {
    if (!selectedDraft) return;

    await saveDraftMutation.mutateAsync(selectedDraft);
  };

  const handlePreview = () => {
    navigate(`/preview/${selectedDraft?.id}`);
  };

  return (
    <div className="flex justify-between items-center mb-4 p-3">
      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={handleSave}
          className=""
        >
          <Save size={16} /> Save
        </Button>
        <Button
          variant="secondary"
          onClick={handlePreview}
          className=""
        >
          <ScanEye /> Preview
        </Button>
        <PublishButton />
      </div>
      <ModeToggle />
    </div>
  );
};

export default DraftActions;
