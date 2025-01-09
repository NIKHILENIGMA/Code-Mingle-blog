import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import NewDraft from "../Drafts/NewDraft";
import SideBarToogleButton from "./SideBarToggleButton";
import SideBarMyDrafts from "./SideBarMyDrafts";
import SideBarSuggested from "./SideBarSuggested";

const SideBar: FC = () => {
  const sideBarState: boolean = useSelector(
    (state: RootState) => state.blog.sideBar
  );

  return (
    <div
      className={`fixed top-0 left-0 z-20 flex flex-col items-start h-full p-4 space-y-4 bg-gray-100 shadow-lg w-[85vw] md:w-[50vw] lg:w-[18vw] transition-transform duration-500 ease-in-out ${
        sideBarState ? "transform translate-x-0" : "transform -translate-x-full"
      }`}
    >
      <SideBarToogleButton /> 
      <NewDraft />
      <div className="flex flex-col items-center justify-between w-full  h-[80vw] space-y-3 overflow-hidden ">
        <SideBarMyDrafts />
        <SideBarSuggested />
      </div>
    </div>
  );
};

export default SideBar;
