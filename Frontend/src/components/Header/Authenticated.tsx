import { FC } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useUserLoggedIn } from "@/hooks/useUserLoggedIn";

const Authenticated: FC = () => {
  const { handleLogout } = useLogout();
  const { user } = useUserLoggedIn();

  return (
    <div className=" flex justify-start w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage
              src={user?.avatarImg || "/no-avatar-user.png"}
              className="border-[3px] border-white rounded-full object-cover"
            />
            <AvatarFallback>
              <AvatarImage
                src="/no-avatar-user.png"
                className="border-[3px] border-white rounded-full object-cover"
              />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{`${user?.firstName} ${user?.lastName}`}</DropdownMenuLabel>
          
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link to="/profile/me">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/profile/settings/general-details">Settings</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Authenticated;
