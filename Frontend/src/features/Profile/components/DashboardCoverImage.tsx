import { FC } from "react";
import { User } from "@/Types/user";

interface DashboardAvatarProps {
  user: User | null;
}

const DashboardCoverImage: FC<DashboardAvatarProps> = ({ user }) => {
  return (
    <>
      {user && user?.coverImg !== null ? (
        <img
          src={user?.coverImg}
          alt="Cover"
          className="w-full h-60 object-cover"
        />
      ) : (
        <div className="w-full h-60 bg-gray-500"></div>
      )}
    </>
  );
};

export default DashboardCoverImage;
