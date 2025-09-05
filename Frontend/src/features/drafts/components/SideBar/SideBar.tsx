import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDraftQuery } from "@/features/drafts/hooks/useDraftQuery";
import SideBarNewDraftButton from "./SideBarNewDraftButton";
import SideBarDraftList from "./SideBarDraftList";
import { ArrowLeftToLine } from "@/Utils/Icons";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router";
import { Button, Input } from "@/components";
import { useDebounce } from "@/hooks/useDebounce";
import { Draft } from "../../types";

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar: FC<SidebarProps> = ({ sidebarOpen }) => {
  const navigate = useNavigate();
  const { getDraftsQuery } = useDraftQuery();
  const { data: drafts, isLoading, isError } = getDraftsQuery;
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [filterDrafts, setFilterDrafts] = useState<Draft[]>([]);

  const handleCardSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  // Filter logic runs after debounce settles
  useEffect(() => {
    if (drafts?.data && debouncedSearch) {
      const filtered: Draft[] = drafts.data.filter(
        (draft: Draft) =>
          typeof draft.title === "string" &&
          draft.title.toLowerCase().includes(debouncedSearch)
      );
      setFilterDrafts(filtered);
    } else {
      setFilterDrafts([]);
    }
  }, [debouncedSearch, drafts]);

  //fixed md:static top-0 left-0 z-40 bg-background min-h-screen md:min-h-full p-4 flex flex-col justify-between border-r border-primary-100 transition-transform duration-300 ease-in-out w-full  ${sidebarOpen ? "translate-x-0 " : "-translate-x-full"}

  return (
    <aside
      className={`fixed top-0 left-0 z-40 min-h-screen bg-background md:min-h-full p-4 flex flex-col justify-between border-r border-primary-100 w-full sm:w-[40%] md:w-[32%] lg:w-[25%] transform transition-transform duration-500 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Header */}
      <div className="space-y-2">
        <h1
          className="mb-4 text-xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          NODEDRAFTS
        </h1>
        <SideBarNewDraftButton />
        <Separator />
        <div className="relative flex items-center justify-between w-full">
          <Input
            type="text"
            placeholder="Search Drafts"
            value={search}
            onChange={handleCardSearch}
            className="w-full px-3 py-2 mb-4 border rounded-md"
          />
          {search && (
            <Button
              variant={"link"}
              className="absolute inset-y-0 p-2 end-2 hover:no-underline"
              onClick={() => setSearch("")}
            >
              clear
            </Button>
          )}
        </div>

        {/* Draft Items */}
        <SideBarDraftList
          drafts={debouncedSearch ? filterDrafts : drafts?.data || []}
          isLoading={isLoading}
          isError={isError}
        />
      </div>

      {/* Back to Home Button */}
      <Button variant={"outline"} onClick={() => navigate("/")}>
        <ArrowLeftToLine size={17} />
        Back to home
      </Button>
    </aside>
  );
};

export default Sidebar;
