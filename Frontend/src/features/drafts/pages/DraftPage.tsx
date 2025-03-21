import { FC, useEffect } from "react";
import { DraftActions, DraftForm } from "@/features/Blog/components";
import { useParams } from "react-router-dom";
import DraftCoverImage from "@/features/drafts/components/Drafts/DraftCoverImage";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDraft } from "../slices/draftSlice";
import { RootState } from "@/app/store/store";
import { useDraftQuery } from "../hooks/useDraftQuery";
import { toast } from "sonner";

// DraftPage component: Responsible for displaying and managing a single draft page
const DraftPage: FC = () => {
  // Extract the draftId from the URL parameters
  const { draftId } = useParams<{ draftId: string }>();
  
  // If no draftId is provided, show an error toast and throw an error
  if (!draftId) {
    toast.error("Draft ID is required");
    throw new Error("Draft ID is required");
  }

  // Initialize the Redux dispatch function
  const dispatch = useDispatch();

  // Retrieve the currently selected draft from the Redux store
  const selectedDraft = useSelector(
    (state: RootState) => state?.draft?.selectedDraft
  );

  // Fetch the draft data using a custom hook
  const { getDraftQuery } = useDraftQuery(draftId);
  const Draft = getDraftQuery.data; // The fetched draft data

  // useEffect hook: Sync the fetched draft with the Redux store
  useEffect(() => {
    // If no draft is selected in the store and the draft data is fetched, update the store
    if (!selectedDraft && Draft) {
      dispatch(setSelectedDraft({ selectedDraft: Draft }));
    }
  }, [Draft, selectedDraft, dispatch]);

  // Render the draft page UI
  return (
    <div className="w-full h-full">
      {/* Actions related to the draft (e.g., save, delete) */}
      <DraftActions />
      {/* Component to display the draft's cover image */}
      <DraftCoverImage id={draftId} />
      {/* Form to edit or manage the draft's content */}
      <DraftForm />
    </div>
  );
};

export default DraftPage;
