import { FC } from "react";
import {
  ScanEye,
  CloudUpload,
  LoaderCircle,
  CloudAlert,
  Save,
} from "@/Utils/Icons";
import { Button } from "@/components";
import PublishButton from "./PublishButton";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useAutoSaveDraft } from "../../hooks/useAutoSaveDraft";
import { useNavigate } from "react-router-dom";

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

  /// Get the save status from the store
  const saveStatus = useSelector((state: RootState) => state.draft.saveDraft);

  return (
    <div className="fixed top-0 z-10 flex items-center justify-center w-full h-16 backdrop:blur-md ">
      <div className="flex items-center justify-center h-full px-3 space-x-2 md:w-1/4 lg:w-1/3">
        {saveStatus === "saved" ? (
          <div className="flex items-center justify-center h-full px-3 space-x-2 md:w-1/4 lg:w-1/3 animate-in">
            <p className="flex items-center w-32 text-green-500 justify-evenly text-md">
              <CloudUpload stroke="#00C55E" size={32} /> Saved
            </p>
          </div>
        ) : saveStatus === "saving" ? (
          <div className="flex items-center justify-center h-full px-3 space-x-2 md:w-1/4 lg:w-1/3">
            <span className="text-slate-400">
              <LoaderCircle />
              Saving...
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full px-3 space-x-2 md:w-1/4 lg:w-1/3">
            <span className="text-red-500">
              <CloudAlert stroke="#cc0000" fill="#cc0000" />
              Error
            </span>
          </div>
        )}

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
