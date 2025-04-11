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

  // Check if the innerWidth is less than 768px
  const size = innerWidth < 640;

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
            isActive ? "text-primary/90" : "text-muted-foreground/80"
          } flex items-center truncate w-full px-1 text-nowrap overflow-hidden hover:text-primary/80 transition-colors duration-200 ease-in-out space-x-1`
        }
      >
        <FileText size={24} className="flex-shrink-0 px-1" />
        <span className="truncate">
          {draft?.title ? truncate(draft?.title, size ? 60 : 33) : "Untitled"}
        </span>
      </NavLink>
      <SideBarDraftDropDownActions draft={draft} />
    </div>
  );
};

export default SidebarCard;
