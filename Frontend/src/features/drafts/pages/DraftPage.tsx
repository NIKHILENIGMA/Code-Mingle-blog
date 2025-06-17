import { FC, useEffect } from "react";
import { DraftActions, DraftForm } from "@/features/Blog/components";
import { useParams } from "react-router-dom";
import DraftCoverImage from "@/features/drafts/components/Drafts/DraftCoverImage";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDraft } from "../slices/draftSlice";
import { RootState } from "@/app/store/store";
import { useDraftQuery } from "../hooks/useDraftQuery";
import { toast } from "sonner";


/**
 * DraftPage component for displaying and editing a specific draft.
 * 
 * This component serves as the main page for viewing and editing draft content.
 * It fetches draft data based on the draftId URL parameter, manages the selected
 * draft state in Redux, and renders the draft's actions, cover image, and form.
 * 
 * @component
 * @example
 * ```tsx
 * // Used in router configuration
 * <Route path="/draft/:draftId" element={<DraftPage />} />
 * ```
 * 
 * @throws {Error} Throws an error if draftId parameter is not provided in the URL
 * 
 * @returns {JSX.Element} The rendered draft page containing:
 *   - DraftActions: Action buttons for the draft (save, delete, etc.)
 *   - DraftCoverImage: Component displaying the draft's cover image
 *   - DraftForm: Form for editing the draft's content
 * 
 * @requires useParams - React Router hook to extract draftId from URL
 * @requires useDispatch - Redux hook for dispatching actions
 * @requires useSelector - Redux hook for accessing selectedDraft state
 * @requires useDraftQuery - Custom hook for fetching draft data
 * 
 * @sideEffects
 * - Displays error toast if draftId is missing
 * - Updates Redux state with selected draft when draft data is loaded
 * - Fetches draft data from API based on draftId parameter
 */
const DraftPage: FC = () => {
  
  const { draftId } = useParams<{ draftId: string }>();
  if (!draftId) {
    toast.error("Draft ID is required");
    throw new Error("Draft ID is required");
  }

  const dispatch = useDispatch();
  const selectedDraft = useSelector(
    (state: RootState) => state?.draft?.selectedDraft
  );
  const { getDraftQuery } = useDraftQuery(draftId);
  const Draft = getDraftQuery.data; 

  useEffect(() => {
    if (!selectedDraft && Draft) {
      dispatch(setSelectedDraft({ selectedDraft: Draft }));
    }
  }, [Draft, selectedDraft, dispatch]);

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
