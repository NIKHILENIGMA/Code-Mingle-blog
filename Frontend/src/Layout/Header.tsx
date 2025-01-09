import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Button, Img } from "@/components";
import { NavItems } from "@/constants/constants";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Pencil } from "@/Utils/Icons";
import SearchBar from "@/features/Blog/components/Drafts/SearchBar";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const authenticate = useSelector(
    (state: RootState) => state.auth?.accessToken
  );
  const navigate = useNavigate();
  const { logout } = useLogout();

  const handleNewDraft = () => {
    navigate("/draft/new");
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      console.log("Logged out successfully");
    } catch (error) {
      console.error(error);
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
        <div className="text-xl font-bold">
          <Link to="/">
            <Img
              src="/Image/light-techscribe-logo-2.png"
              alt=""
              cn="w-32 h-32"
            />
          </Link>
        </div>
        {/* Navigation Links */}
        <div className="items-center justify-around hidden h-full px-5 py-6 space-x-4 lg:flex">
          {NavItems.map((navOpt, index) => (
            <NavLink
              key={index}
              to={navOpt.path}
              className={({ isActive }: { isActive: boolean }): string =>
                `${
                  isActive ? "text-sky-500" : ""
                } flex items-center space-x-1 font-serif font-medium hover:text-sky-700`
              }
            >
              <span>{React.createElement(navOpt.icon, { size: "18" })}</span>{" "}
              <span className="text-sm">{navOpt.name} </span>
            </NavLink>
          ))}
        </div>
        <div className="items-center justify-around px-4 py-2 space-x-4 lg:flex">
          <span className="px-2 py-2 bg-orange-500 rounded-full cursor-pointer">
            <Pencil size={20} color="white" onClick={handleNewDraft} />
          </span>
          <SearchBar />
        </div>
        <div className="items-center justify-around hidden space-x-4 lg:flex">
          {
            // User Auth
            authenticate ? (
              <div className="space-x-4">
                <Link to="/profile" className="hover:text-gray-700">
                  Profile
                </Link>
                <Button
                  onClick={handleLogout}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="hover:text-gray-700">
                  Login
                </Link>
                <Link to="/signup" className="hover:text-gray-700">
                  Register
                </Link>
              </div>
            )
          }
        </div>

        {/* Mobile menu*/}
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
              {NavItems.map((navOpt, index) => (
                <Link
                  key={index}
                  to={navOpt.path}
                  className="font-serif text-3xl font-medium hover:text-gray-700"
                >
                  {navOpt.name}
                </Link>
              ))}
              <Pencil
                size={40}
                className="px-4 py-2 text-3xl"
                onClick={() => navigate("/drafts/:draftId")}
              />
              <SearchBar size={40} />
              {
                // User Auth
                authenticate ? (
                  <div className="flex flex-col items-center justify-around space-y-8 text-3xl">
                    <Link to="/profile" className="hover:text-gray-700">
                      Profile
                    </Link>
                    <Button
                      onClick={handleLogout}
                      className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-around space-y-8 text-3xl">
                    <Link to="/login" className="hover:text-gray-700">
                      Login
                    </Link>
                    <Link to="/signup" className="hover:text-gray-700">
                      Register
                    </Link>
                  </div>
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
