import { FC, useEffect } from "react";
import { DraftActions, DraftForm } from "@/features/Blog/components";
import { useParams } from "react-router-dom";
import DraftCoverImage from "@/features/drafts/components/Drafts/DraftCoverImage";
import { useDraft } from "../hooks/useDraft";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDraft } from "../slices/draftSlice";
import { RootState } from "@/app/store/store";

const DraftPage: FC = () => {
  const dispatch = useDispatch();
  const { draftId } = useParams<{ draftId: string }>();
  const { Draft } = useDraft(draftId ?? "");
  const selectedDraft = useSelector(
    (state: RootState) => state?.draft?.selectedDraft
  );

  useEffect(() => {
    if (!selectedDraft && Draft) {
      dispatch(setSelectedDraft({ selectedDraft: Draft }));
    }
  }, [Draft, selectedDraft, dispatch]);

  return (
    <div className="w-full h-full">
      <DraftActions />
      <DraftCoverImage id={draftId ?? ""} />
      <DraftForm />
    </div>
  );
};

export default DraftPage;
