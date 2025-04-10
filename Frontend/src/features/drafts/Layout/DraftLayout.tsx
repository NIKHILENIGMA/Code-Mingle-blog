import { FC, useState } from "react";
import SideBar from "../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { Button } from "@/components";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

const DraftLayout: FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleSidebar = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="flex w-full h-screen bg-background overflow-hidden relative ">
      <SideBar sidebarOpen={expanded} />

      {/* Toggle Button */}
      <div className="fixed top-4 left-4 z-50">
        {expanded ? (
          <Button
            variant="outline"
            onClick={toggleSidebar}
            className="fixed top-2 start-52 md:start-48 lg:start-80 border-none z-50 p-2 rounded "
          >
            <GoSidebarCollapse size={20} />
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={toggleSidebar}
            className="fixed top-2 left-0 sm:left-4 z-50 p-2 rounded border-none"
          >
            <GoSidebarExpand size={20} />
          </Button>
        )}
      </div>

      <div
        className={`
          transform transition-transform duration-500 ease-in-out 
          w-full h-full overflow-y-auto 
          ${expanded ? "ml-64" : "flex justify-center"}
        `}
      >
        <div className="max-w-6xl w-full flex justify-center">
          <Outlet />
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default DraftLayout;
