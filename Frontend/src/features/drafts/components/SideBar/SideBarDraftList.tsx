import { FC } from "react";
import { Draft } from "@/features/drafts/types";
import SidebarCard from "./SidebarCard";
import SideBarNotRender from "@/components/Error/SideBarNotRender";
import SidebarLoader from "@/components/Loader/SidebarLoader";

interface SideBarDraftListProps {
  isLoading: boolean;
  isError: boolean;
  drafts: Draft[];
}

const SideBarDraftList: FC<SideBarDraftListProps> = ({
  isLoading,
  isError,
  drafts = [],
}) => {
  return (
    <div className="space-y-2 draft-list  overflow-x-hidden overflow-y-auto py-3 h-[60%] hide-scrollbar">
      {isLoading ? (
        <SidebarLoader />
      ) : isError ? (
        <SideBarNotRender />
      ) : drafts.length === 0 ? (
        <p className="text-muted-foreground text-sm italic px-2">
          No drafts found.
        </p>
      ) : (
        <>
          {drafts.map((draft, index) => (
            <SidebarCard key={draft.id + index} draft={draft} />
          ))}
        </>
      )}
    </div>
  );
};

export default SideBarDraftList;
