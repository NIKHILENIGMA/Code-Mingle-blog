import { FC, useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Pencil } from "@/Utils/Icons";
import HeaderNavigationLinks from "./HeaderNavigationLinks";
import { SearchBar } from "@/features/Blog/components";
import AuthenticatedOptions from "./Authenticated";
import NotAuthenticatedOptions from "./NotAuthenticated";

interface HeaderMobileViewProps {
  isAuthenticated: string;
  onChange: () => void;
}

const HeaderMobileView: FC<HeaderMobileViewProps> = ({
  isAuthenticated,
  onChange,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
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
              onClick={onChange}
            />
            <SearchBar size={40} />
            {
              // User Auth
              isAuthenticated ? (
                <AuthenticatedOptions />
              ) : (
                <NotAuthenticatedOptions />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMobileView;
