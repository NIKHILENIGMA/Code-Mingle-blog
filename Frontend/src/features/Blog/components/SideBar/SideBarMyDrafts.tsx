import { FC, useEffect, useState } from "react";
import { Draft } from "@/Types/draft";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader/Loader";
import truncate from "@/Utils/truncate";
import SideBarDraftDropDownActions from "./SideBarDraftDropDownActions";
import { useDispatch } from "react-redux";
import { useDrafts } from "@/features/Blog/hooks/useDrafts";
import { setSelectedDraft } from "../../slices/draftSlice";
import { EllipsisVertical, FileText } from "@/Utils/Icons";

const SideBarMyDrafts: FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const [isComponentVisible, setIsComponentVisible] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const draftLength = drafts?.draft?.length;

  const handleSelectDraft = (draft: Draft | null) => {
    if (!draft) return null;
    dispatch(setSelectedDraft({ selectedDraft: draft }));
    navigate(`/draft/${draft.id}`);
  };

  useEffect(() => {
    setIsComponentVisible(isVisible);
  }, [isVisible]);

  return (
    <div className="taskbar border-t-[1px] border-slate-400 w-full h-[80%] overflow-y-auto scroll-smooth hide-scrollbar">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>
          <h3 className="w-full font-bold px-2 py-2 text-[13px] text-nowrap uppercase cursor-pointer">
            <span className="text-xs">My Drafts</span>
          </h3>
          <div className="w-full min-h-10">
            <div className="w-full text-[13px] font-normal flex text-wrap text-black space-y-2 hover:bg-slate-200 rounded-md cursor-pointer">
              <div className="flex flex-col items-center justify-around w-full px-2 py-1 space-y-2">
                <div className="flex items-center justify-between w-full px-4 hover:bg-slate-500">
                  <div className="flex items-center">
                    <FileText size={22} />
                    <div className="flex items-center w-[10vw] h-6">
                      <span className="flex w-full px-2 font-semibold text-md text-nowrap">
                        No drafts available
                      </span>
                    </div>
                  </div>
                  <div className="flex px-1 font-semibold text-md text-nowrap">
                    <EllipsisVertical />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-10">
          <h3 className="w-full font-bold px-2 py-2 text-[13px] text-nowrap uppercase cursor-pointer">
            <span className="text-xs">
              My Drafts ({drafts ? draftLength : 0})
            </span>
          </h3>
          <div className="w-full min-h-10">
            <div className="w-full text-[13px] font-normal flex text-wrap text-black space-y-2 hover:bg-slate-200 rounded-md cursor-pointer">
              {isLoading ? (
                <Loader />
              ) : (
                <div className="flex flex-col items-center justify-around w-full px-2 py-1 space-y-2">
                  {drafts &&
                    Array.isArray(drafts) &&
                    drafts?.map((draft: Draft, index) => (
                      <div className="flex" key={draft.id || index}>
                        <div
                          className="flex items-center justify-between w-full px-4 hover:bg-slate-200"
                          onClick={() => handleSelectDraft(draft)}
                        >
                          <div className="flex items-center">
                            
                            <div className="flex items-center w-[10vw] h-6">
                              <span className="flex w-full px-2 font-semibold text-md text-nowrap">
                                {truncate(
                                  draft.title?.toString() ?? "Untitled",
                                  20
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <SideBarDraftDropDownActions draftId={draft?.id} />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBarMyDrafts;
