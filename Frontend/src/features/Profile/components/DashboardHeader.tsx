import { FC } from "react";
import UserSetting from "./UserSetting";
import DashboardAvatar from "./DashboardAvatar";
import { User } from "@/Types/user";
import DashboardCoverImage from "./DashboardCoverImage";

interface DashboardHeaderProps {
  user: User | null;
}
const DashboardHeader: FC<DashboardHeaderProps> = ({ user }) => {
  return (
    <header className="relative text-white text-center bg-blue-900">
      <DashboardCoverImage user={user} />
      <DashboardAvatar user={user} />
      <UserSetting />
    </header>
  );
};

export default DashboardHeader;
