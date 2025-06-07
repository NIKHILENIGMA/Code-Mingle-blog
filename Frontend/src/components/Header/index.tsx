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
    <header className="fixed top-0 left-0 z-50 w-full bg-transparent shadow-sm backdrop-blur-md dark:bg-background/50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold">NODEDRAFTS</div>
          <nav className="hidden space-x-8 md:flex">
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
                <button className="flex items-center space-x-2 border-none shadow-none hover:text-primary">
                  <Pencil size={18} /> <span>Write</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="relative w-48">
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
            <div className="flex items-center pr-4 space-x-4">
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
