import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Button } from "@/components";
import { NavItems } from "@/constants/constants";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const Header: React.FC = () => {
  const authenticate = useSelector(
    (state: RootState) => state.auth?.accessToken
  );
  const { logout } = useLogout();

  

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      console.log("Logged out successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleMobileMenu = (): void => {
    // Add your logic to handle mobile menu toggle here
    console.log("Mobile menu toggled");
  };

  return (
    <header className="fixed top-0 z-20 w-full h-16 p-4 text-black bg-white shadow-md">
      <nav className="flex items-center justify-between w-full h-full">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">Logo</Link>
        </div>
        {/* Navigation Links */}
        <div className="items-center justify-around hidden space-x-4 lg:flex">
          {NavItems.map((navOpt, index) => (
            <Link
              key={index}
              to={navOpt.path}
              className="font-serif font-medium hover:text-gray-700"
            >
              {navOpt.name}
            </Link>
          ))}
        </div>
        <div className="items-center justify-around hidden space-x-4 lg:flex">
          {
            // User Auth
            authenticate ? (
              <div className="space-x-4">
                <Link to="/profile" className="hover:text-gray-700">Profile</Link>
                <Button onClick={handleLogout} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Logout</Button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="hover:text-gray-700">Login</Link>
                <Link to="/signup" className="hover:text-gray-700">Register</Link>
              </div>
            )
          }
        </div>
        <div className="flex cursor-pointer lg:hidden" onClick={handleMobileMenu}>
          <HamburgerMenuIcon className="block w-6 h-6" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
