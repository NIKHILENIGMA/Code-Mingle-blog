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
    <div className="flex justify-between items-center mb-4 p-3">
      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={handleSave}
          className="flex items-center gap-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50 transition"
        >
          <Save size={16} /> Save
        </Button>
        <Button
          variant="secondary"
          onClick={handlePreview}
          className="flex items-center gap-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50 transition"
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
