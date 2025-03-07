import { FC } from "react";
import SideBar from "../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";

const DraftLayout: FC = () => {
  return (
    <div className="flex w-full h-screen overflow-hidden ">
      <SideBar />
      <div className="flex-1 h-full overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default DraftLayout;
