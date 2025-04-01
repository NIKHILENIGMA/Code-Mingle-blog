import { FC } from "react";
import { NavLink } from "react-router-dom";
import { FileText } from "@/Utils/Icons";
import { Draft } from "@/features/drafts/types";
import { useDispatch } from "react-redux";
import { setSelectedDraft } from "@/features/drafts/slices/draftSlice";
import SideBarDraftDropDownActions from "./SideBarDraftDropDownActions";
import truncate from "@/Utils/truncate";

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
      className="space-y-2 flex p-1 border border-primary/70 rounded-md bg-card hover:bg-card/20"
    >
      <NavLink
        to={`/draft/${draft.id}`}
        onClick={() => handleSelectDraft(draft)}
        className={({ isActive }: { isActive: boolean }): string =>
          `${
            isActive ? "text-primary" : "text-muted-foreground/80"
          } flex items-center truncate w-full px-2`
        }
      >
        <FileText size={24} className="px-1" />
        {draft?.title ? truncate(draft?.title, 20) : "Untitled"}
      </NavLink>
      <SideBarDraftDropDownActions draft={draft} />
    </div>
  );
};

export default SidebarCard;
