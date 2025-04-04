import { createElement, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { DraftingCompass, Notebook, Pencil } from "@/Utils/Icons";
import SearchBar from "@/features/drafts/components/Drafts/SearchBar";
import { NavLink, useNavigate } from "react-router-dom";
import { NavItems } from "@/constants/constants";
import Authenticated from "@/components/Header/Authenticated";
import NotAuthenticated from "@/components/Header/NotAuthenticated";
import { ModeToggle } from "../DarkMode/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDraftMutations } from "@/features/drafts/hooks/useDraftMutations";
import { toast } from "sonner";
import { setSelectedDraft } from "@/features/drafts/slices/draftSlice";

const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authenticate = useSelector(
    (state: RootState) => state.auth?.accessToken
  );

  const { createDraftMutation } = useDraftMutations();

  const handleCreateDraft = async () => {
    try {
      const response = await createDraftMutation.mutateAsync();

      if (response?.draftId) {
        navigate(`/draft/${response.draftId}`);
        dispatch(
          setSelectedDraft({
            selectedDraft: {
              id: response.draftId,
              title: "",
              content: "",
              image: "",
            },
          })
        );
        toast.success("New Draft created successfully");
      } else {
        toast.error("Failed to create draft: Missing draftId");
      }
    } catch (error) {
      toast.error("Failed to create draft");
      console.error("Error creating draft:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full shadow-sm z-50 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold">NODEDRAFTS</div>
          <nav className="hidden md:flex space-x-8">
            {NavItems.map((navOpt, index) => (
              <NavLink
                key={index}
                to={navOpt.path}
                className={({ isActive }: { isActive: boolean }): string =>
                  `${
                    isActive ? "text-purple-600 dark:text-purple-400" : ""
                  } flex items-center space-x-2 font-serif font-medium hover:text-primary`
                }
              >
                <span>{createElement(navOpt.icon, { size: "18" })}</span>{" "}
                <span className="text-sm">{navOpt.name}</span>
              </NavLink>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className=" border-none flex space-x-2 shadow-none items-center hover:text-primary">
                  <Pencil size={18} /> <span>Write</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 relative">
                <DropdownMenuLabel>My Drafts</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleCreateDraft}
                  >
                    <Notebook /> New Draft
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer">
                    <DraftingCompass /> Edit Draft
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <div className="flex items-center space-x-4 pr-4">
              <SearchBar size={18} />
              <div className="hidden space-x-4 lg:flex">
                {authenticate ? <Authenticated /> : <NotAuthenticated />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
