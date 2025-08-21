import { FC } from "react";
import { NavLink } from "react-router";
import { FileText } from "@/Utils/Icons";
import { Draft } from "@/features/drafts/types";
import { useDispatch } from "react-redux";
import { setSelectedDraft } from "@/features/drafts/slices/draftSlice";
import SideBarDraftDropDownActions from "./SideBarDraftDropDownActions";

interface DraftSideBarCardProps {
  draft: Draft;
}

const SidebarCard: FC<DraftSideBarCardProps> = ({ draft }) => {
  const dispatch = useDispatch();
  const handleSelectDraft = (draft: Draft) => {
    dispatch(setSelectedDraft({ selectedDraft: draft }));
  };

  return (
    <div
      key={draft.id}
      className="flex p-1 space-y-2 border rounded-md border-primary/70 bg-card hover:bg-card/20"
    >
      <NavLink
        to={`/draft/${draft.id}`}
        onClick={() => handleSelectDraft(draft)}
        className={({ isActive }: { isActive: boolean }): string =>
          `${
            isActive ? "text-primary/90" : "text-muted-foreground/80"
          } flex items-center truncate w-full px-1 text-nowrap overflow-hidden hover:text-primary/80 transition-colors duration-200 ease-in-out space-x-1`
        }
      >
        <FileText size={24} className="px-1 shrink-0" />
        <span className="overflow-hidden truncate text-clip whitespace-nowrap">
          {draft?.title ? draft?.title : "Untitled"}
        </span>
      </NavLink>
      <SideBarDraftDropDownActions draft={draft} />
    </div>
  );
};

export default SidebarCard;
