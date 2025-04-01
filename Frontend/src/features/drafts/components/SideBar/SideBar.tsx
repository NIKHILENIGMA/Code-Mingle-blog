import { FC } from "react";
import { useDraftQuery } from "@/features/drafts/hooks/useDraftQuery";
import SideBarNewDraftButton from "./SideBarNewDraftButton";
import SideBarDraftList from "./SideBarDraftList";
import { ArrowLeftToLine } from "@/Utils/Icons";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@/components";

const Sidebar: FC = () => {
  const { getDraftsQuery } = useDraftQuery();
  const { data: drafts, isLoading, isError } = getDraftsQuery;
  
  const navigate = useNavigate();

  return (
    <div className="w-[18rem] min-h-screen p-4 flex flex-col justify-between border-r border-primary-100">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-xl font-bold mb-4">NODEDRAFTS</h1>
        {/* Search Bar */}

        {/* New Draft Button */}
        <SideBarNewDraftButton />
        {/* Divider */}
        <Separator />
        <Input
          type="text"
          placeholder="Search Drafts"
          className="w-full px-3 py-2 mb-4 border rounded-md"
        />

        {/* Draft Items */}
        <SideBarDraftList
          drafts={drafts?.data || null}
          isLoading={isLoading}
          isError={isError}
          filter={"search"}
        />
      </div>

      {/* Back to Home Button */}
      <Button variant={"outline"} onClick={() => navigate("/")}>
        <ArrowLeftToLine size={17} />
        Back to home
      </Button>
    </div>
  );
};

export default Sidebar;
