import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Pencil } from "@/Utils/Icons";
import SearchBar from "@/features/Blog/components/Drafts/SearchBar";
import { useCreateDraft } from "@/features/Blog/hooks/useCreateDraft";
import Logo from "@/components/Logo";
import HeaderNavigationLinks from "@/components/Header/HeaderNavigationLinks";
import Authenticated from "@/components/Header/Authenticated";
import NotAuthenticated from "@/components/Header/NotAuthenticated";
import { ModeToggle } from "../mode-toggle";
import HeaderMobileView from "./HeaderMobileView";

const Header: FC = () => {
  const navigate = useNavigate();
  const { createDraftMutation } = useCreateDraft();
  const authenticate = useSelector(
    (state: RootState) => state.auth?.accessToken
  );

  const handleNewDraftNavigate = async (): Promise<void> => {
    const draftId = await createDraftMutation.mutateAsync();
    if (!draftId) {
      navigate("/");
    } else {
      navigate(`/draft/${draftId}`);
    }
  };

  return (
    <header className="fixed top-0 z-20 w-full h-16 p-4  bg-transparent shadow-none backdrop-blur-sm">
      <nav className="flex items-center justify-between w-full h-full">
        {/* Logo */}
        <Logo />
        {/* Navigation Links */}
        <HeaderNavigationLinks />
        {/* Toggle dark mode */}
        <ModeToggle />
        {/* Search Bar */}
        <div className="items-center justify-around px-4 py-2 space-x-4 lg:flex">
          <span className="px-2 py-2 bg-orange-500 rounded-full cursor-pointer">
            <Pencil
              size={20}
              color="white"
              className=""
              onClick={handleNewDraftNavigate}
            />
          </span>
          <SearchBar />
        </div>
        {/* User Auth */}
        <div className="items-center justify-around hidden space-x-4 lg:flex">
          {
            // User Auth
            authenticate ? (
              <Authenticated />
            ) : (
              <NotAuthenticated />
            )
          }
        </div>

        {/* /// Mobile menu */}
        <HeaderMobileView
          isAuthenticated={authenticate ?? ""}
          onChange={handleNewDraftNavigate}
        />
      </nav>
    </header>
  );
};

export default Header;
