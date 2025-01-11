import  { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Pencil } from "@/Utils/Icons";
import SearchBar from "@/features/Blog/components/Drafts/SearchBar";
import { useCreateDraft } from "@/features/Blog/hooks/useCreateDraft";
import Logo from "@/components/Logo";
import HeaderNavigationLinks from "@/components/Header/HeaderNavigationLinks";
import AuthenticatedOptions from "@/components/Header/AuthenticatedOptions";
import NotAuthenticatedOptions from "@/components/Header/NotAuthenticatedOptions";

const Header: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { handleNewDraft, isPending } = useCreateDraft();

  const authenticate = useSelector(
    (state: RootState) => state.auth?.accessToken
  );

  const handleNewDraftNavigate = async (): Promise<void> => {
    const draftId: string | void = await handleNewDraft();
    if (!draftId) {
      navigate("/");
    } else {
      navigate(`/draft/${draftId}`);
    }
  };

  const handleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    console.log("Mobile menu toggled");
  };

  return (
    <header className="fixed top-0 z-20 w-full h-16 p-4 text-black bg-transparent shadow-none backdrop-blur-sm">
      <nav className="flex items-center justify-between w-full h-full">
        {/* Logo */}
        <Logo />
        {/* Navigation Links */}
        <HeaderNavigationLinks />
        <div className="items-center justify-around px-4 py-2 space-x-4 lg:flex">
          <span className="px-2 py-2 bg-orange-500 rounded-full cursor-pointer">
            <Pencil
              size={20}
              color="white"
              className={`${isPending ? "animate-spin" : ""}`}
              onClick={handleNewDraftNavigate}
            />
          </span>
          <SearchBar />
        </div>
        <div className="items-center justify-around hidden space-x-4 lg:flex">
          {
            // User Auth
            authenticate ? (
              <AuthenticatedOptions />
            ) : (
              <NotAuthenticatedOptions />
            )
          }
        </div>

        {/* /// Mobile menu */}
        <div
          className="absolute z-20 flex cursor-pointer lg:hidden top-4 right-4"
          onClick={handleMobileMenu}
        >
          <HamburgerMenuIcon className="w-6 h-6" />
        </div>
        <div
          className={`fixed top-0 right-0 z-10 w-full h-full bg-white transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out lg:hidden`}
        >
          <div className="flex flex-col items-center justify-around h-full p-4 space-y-4">
            <div className="flex flex-col items-center justify-around space-y-8 ">
              <HeaderNavigationLinks />
              <Pencil
                size={40}
                className="px-4 py-2 text-3xl"
                onClick={handleNewDraftNavigate}
              />
              <SearchBar size={40} />
              {
                // User Auth
                authenticate ? (
                  <AuthenticatedOptions />
                ) : (
                  <NotAuthenticatedOptions />
                )
              }
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
