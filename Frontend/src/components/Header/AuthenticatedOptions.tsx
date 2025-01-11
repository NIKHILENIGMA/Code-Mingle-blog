import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useLogout } from "@/features/auth/hooks/useLogout";

const AuthenticatedOptions: FC = () => {
  /// Use the useLogout hook to logout the user
  const { logout } = useLogout();

  /// Handle the logout function
  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      console.log("Logged out successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-x-4">
      <Link to="/profile/@username/posts" className="hover:text-gray-700">
        Profile
      </Link>
      <Button
        onClick={handleLogout}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Logout
      </Button>
    </div>
  );
};

export default AuthenticatedOptions;
