import { FC } from "react";
import { Draft } from "@/Types/draft";
import Loader from "@/components/Loader/Loader";
import DraftSideBarCard from "../Cards/DraftSideBarCard";
import SideBarNotRender from "@/components/Error/SideBarNotRender";

interface SideBarDraftListProps {
  isLoading: boolean;
  isError: boolean;
  drafts: { drafts: Draft[] } | null;
}

const SideBarDraftList: FC<SideBarDraftListProps> = ({
  isLoading,
  isError,
  drafts,
}) => {

  const draftRenderCondition = drafts && Array.isArray(drafts) && drafts?.length > 0
  
  return (
    <div className="space-y-2 draft-list">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <SideBarNotRender />
      ) : draftRenderCondition ? (
        drafts.map((draft, index) => <DraftSideBarCard key={draft?.id + index} draft={draft} />)
      ) : (
        <div>No drafts found</div>
      )}
    </div>
  );
};

export default SideBarDraftList;
