import { FC } from "react";
import SideBar from "../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";

const DraftLayout: FC = () => {
  return (
    <div className="w-full h-screen ">
      <SideBar />
      <div className="w-full h-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default DraftLayout;
