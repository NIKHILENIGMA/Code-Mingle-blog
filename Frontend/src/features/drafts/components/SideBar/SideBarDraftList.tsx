import { FC } from "react";
import { Draft } from "@/features/drafts/types";
import SidebarCard from "./SidebarCard";
import SideBarNotRender from "@/components/Error/SideBarNotRender";
import SidebarLoader from "@/components/Loader/SidebarLoader";

interface SideBarDraftListProps {
  isLoading: boolean;
  isError: boolean;
  drafts: { drafts: Draft[] } | null;
  filter?: string;
}

const SideBarDraftList: FC<SideBarDraftListProps> = ({
  isLoading,
  isError,
  drafts = { drafts: [] },
  // filter = "",
}) => {
  const draftRenderCondition =
    drafts && Array.isArray(drafts) && drafts?.length > 0;

  return (
    <div className="space-y-2 draft-list  overflow-x-hidden overflow-y-auto py-3 h-[60%]">
      {isLoading ? (
        <SidebarLoader />
      ) : isError ? (
        <SideBarNotRender />
      ) : draftRenderCondition ? (
        drafts?.map((draft, index) => (
          <SidebarCard key={draft?.id + index} draft={draft} />
        ))
      ) : (
        <div>No drafts found</div>
      )}
    </div>
  );
};

export default SideBarDraftList;
