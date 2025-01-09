import { FC, useState } from "react";
import { EllipsisVertical, FileText } from "@/Utils/Icons";
import { useDrafts } from "@/features/Blog/hooks/useDrafts";
import Loader from "@/components/Loader";
import { Link } from "react-router-dom";

const SideBarMyDrafts: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { Drafts, isLoading } = useDrafts({ isOpen });
  const drafts = Drafts && Drafts.data.length ? Drafts.data : null;
  const handleDraftClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="taskbar border-t-[1px] border-slate-400 w-full h-[80%] overflow-y-auto scroll-smooth hide-scrollbar">
      <div className="w-full min-h-10">
        <h3
          className="w-full font-bold px-2 py-2 text-[13px] text-nowrap uppercase cursor-pointer"
          onClick={handleDraftClick}
        >
          <span className="text-xs">
            My Drafts ({drafts && drafts.length ? drafts.length : 0})
          </span>
        </h3>
        {isOpen && (
          <div className="w-full min-h-10">
            <div className="w-full text-[13px] font-normal flex text-wrap text-black space-y-2 hover:bg-slate-200 rounded-md cursor-pointer ">
              {isLoading ? (
                <Loader />
              ) : (
                <div className="flex flex-col items-center justify-around w-full px-2 py-1 space-y-2">
                  {drafts &&
                    drafts.map((draft, index) => (
                      <Link
                        className="flex items-center justify-between w-full px-4 hover:bg-slate-500 "
                        to={`${draft.id}`}
                        key={draft.id + index}
                      >
                        <div className="flex items-center">
                          <FileText size={22} />
                          <div className="flex items-center w-[10vw] h-6">
                            <span className="flex w-full px-2 font-semibold text-md text-nowrap">
                              {draft.title?.toString().substring(0, 20)}....
                            </span>
                          </div>
                        </div>
                        <div className="flex px-1 font-semibold text-md text-nowrap">
                          <EllipsisVertical />
                        </div>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBarMyDrafts;
