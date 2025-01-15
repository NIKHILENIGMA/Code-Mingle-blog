// src/components/Sidebar.tsx
import React from "react";
import { useDrafts } from "../../hooks/useDrafts";
import SideBarNewDraftButton from "./SideBarNewDraftButton";
import SideBarDraftList from "./SideBarDraftList";

const Sidebar: React.FC = () => {
  const { drafts, isError, isLoading } = useDrafts();

  return (
    <div className="w-[20vw] sticky top-0 h-screen p-4 bg-gray-100 border-r border-gray-300 sidebar">
      {/* SideBar new button handle the new draft creation */}
      <SideBarNewDraftButton />

      {/* Search bar handle to search user previous draft */}
      <input
        type="text"
        placeholder="Search drafts..."
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
      />

      {/* Sidebar draft list is responsible to render the user drafts */}
      <SideBarDraftList
        drafts={drafts || null}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default Sidebar;
