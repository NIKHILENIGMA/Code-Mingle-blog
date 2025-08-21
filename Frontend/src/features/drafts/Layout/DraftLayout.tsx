import { FC, useEffect, useState } from "react";
import SideBar from "../components/SideBar/SideBar";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

const DraftLayout: FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleSidebar = () => {
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLocaleLowerCase() === "e") {
        e.preventDefault();
        setExpanded((prev) => !prev); // Expand the sidebar
      } else if (e.key === "Escape") {
        setExpanded(false); // Collapse the sidebar
      }
    };

    // Add event listener for keydown events
    addEventListener("keydown", handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      className="relative flex w-full h-screen overflow-hidden bg-background"
      tabIndex={0} // Make the div focusable to capture key events
    >
      <SideBar sidebarOpen={expanded} />

      {/* Toggle Button */}
      <div className="fixed z-50 top-4 left-4">
        {expanded ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={toggleSidebar}
                  className="fixed z-50 p-2 border-none rounded top-2 start-52 md:start-48 lg:start-80"
                >
                  <GoSidebarCollapse size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="space-x-3 border z-9999 bg-card border-secondary/50"
              >
                <div className="flex flex-col items-center space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    Collapse Sidebar
                  </p>
                  <span className="text-xs text-foreground/30">
                    Ctrl + E / Escape
                  </span>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button
            variant="outline"
            onClick={toggleSidebar}
            className="fixed left-0 z-50 p-2 border-none rounded top-2 sm:left-4"
          >
            <GoSidebarExpand size={20} />
          </Button>
        )}
      </div>

      <div
        className={`
          transform transition-transform duration-500 ease-in-out 
          w-full h-full overflow-y-auto 
          ${expanded ? "ml-80" : "flex justify-center"}
        `}
      >
        <div className="flex justify-center w-full max-w-6xl">
          <Outlet />
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default DraftLayout;
