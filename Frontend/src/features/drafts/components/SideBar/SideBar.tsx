// src/components/Sidebar.tsx
import { FC } from "react";
import { useDrafts } from "../../hooks/useDrafts";
import SideBarNewDraftButton from "./SideBarNewDraftButton";
import SideBarDraftList from "./SideBarDraftList";
import { ArrowLeftToLine } from "@/Utils/Icons";
import { Separator } from "@/components/ui/separator";

const Sidebar: FC = () => {
  const { drafts, isError, isLoading } = useDrafts();

  return (
    <div className="w-[18rem] min-h-screen bg-white p-4 flex flex-col justify-between border-r border-gray-200">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-xl font-bold mb-4">NODEDRAFTS</h1>

        {/* Search Bar */}
        {/* <Input
          type="text"
          placeholder="Search Drafts"
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        /> */}

        {/* New Draft Button */}
        <SideBarNewDraftButton />

        {/* Divider */}
        <Separator />

        {/* Draft Items */}
        <SideBarDraftList
          drafts={drafts || null}
          isLoading={isLoading}
          isError={isError}
          filter={"search"}
        />
      </div>

      {/* Back to Home Button */}
      <button className="flex items-center justify-center gap-2 mt-4 border border-purple-600 text-purple-600 py-2 rounded-md hover:bg-purple-50 transition">
        <ArrowLeftToLine size={17} />
        Back to home
      </button>
    </div>
  );
};

export default Sidebar;
