import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useNavigate } from "react-router";
import { useDraftMutations } from "./useDraftMutations";

export const useDraftActions = () => {
  const navigate = useNavigate();
  const selectedDraft = useSelector(
    (state: RootState) => state?.draft?.selectedDraft
  );
  const { updateDraftMutation } = useDraftMutations();

  /**
   * * Handles the save action for the draft.
   *    
   * @returns {Promise<void>}
   */
  const handleSave = async (): Promise<void> => {
    if (!selectedDraft) return;

    await updateDraftMutation.mutateAsync({
      id: selectedDraft.id,
      draft: {
        title: selectedDraft?.title ?? "",
        content: selectedDraft?.content ?? "",
      },
    });
  };

  const handlePreview = (): void => {
    navigate(`/preview/${selectedDraft?.id}`);
  };

  return { handleSave, handlePreview };
};
