import { FC } from "react";
import { NavLink } from "react-router-dom";
import { FileText } from "@/Utils/Icons";
import { Draft } from "@/Types/draft";
import { useDispatch } from "react-redux";
import { setSelectedDraft } from "@/features/Blog/slices/draftSlice";
import SideBarDraftDropDownActions from "../SideBar/SideBarDraftDropDownActions";
import truncate from "@/Utils/truncate";

interface DraftSideBarCardProps {
  draft: Draft;
}

const DraftSideBarCard: FC<DraftSideBarCardProps> = ({ draft }) => {
  const dispatch = useDispatch();
  const handleSelectDraft = (draft: Draft) => {
    dispatch(setSelectedDraft({ selectedDraft: draft }));
  };

  return (
    <div
      key={draft.id}
      className="flex items-center justify-between p-3 transition bg-white rounded-md shadow-sm draft-card hover:shadow-md"
    >
      <NavLink
        to={`/draft/${draft.id}`}
        onClick={() => handleSelectDraft(draft)}
        className={({isActive}: {isActive: boolean}): string => `${isActive ? ' text-orange-500': ''} flex items-center text-black truncate w-full`}
      >
        <FileText size={22} />
        {draft?.title ? truncate(draft?.title, 20) : "Untitled"}
      </NavLink>
      <SideBarDraftDropDownActions draft={draft} />
    </div>
  );
};

export default DraftSideBarCard;
