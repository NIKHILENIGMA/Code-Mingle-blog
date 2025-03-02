import { FC } from "react";
import { User } from "@/Types/user";
import DashboardAvatarChange from "./DashboardAvatarChange";

interface ProfileAvatarProps {
  user: User | null;
}

const DashboardAvatar: FC<ProfileAvatarProps> = ({ user }) => {
  return (
    <div className="relative -top-14">
      {user?.avatarImg === null || user?.avatarImg === "" ? (
        <img
          src={"https://www.gravatar.com/avatar/"}
          alt="User Avatar"
          className="w-28 h-28 rounded-full border-4 border-white mx-auto object-cover"
        />
      ) : (
        <img
          src={user?.avatarImg}
          alt="User Avatar"
          className="w-28 h-28 rounded-full border-4 border-white mx-auto object-cover"
        />
      )}

      <DashboardAvatarChange avatar={user?.avatarImg ?? ""} alt={user?.firstName ?? "User"} />
      <h1 className="text-2xl font-bold mt-2">{`${user?.firstName} ${user?.lastName}`}</h1>
      <p className="text-gray-300">
        Web Developer | UI/UX Enthusiast | Blogger
      </p>
      <p className="text-gray-300">📍 San Francisco, USA</p>

      {/* User Stats */}
      <div className="flex justify-center gap-8 mt-3">
        <div>
          <strong>120</strong> Posts
        </div>
        <div>
          <strong>4.5K</strong> Followers
        </div>
        <div>
          <strong>320</strong> Following
        </div>
      </div>

      {/* Social Media Links  */}
      <div className="flex justify-center gap-4 mt-5">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          className="text-sky-500"
        >
          Facebook
        </a>
        <a href="https://x.com/" target="_blank" className="text-sky-500">
          Twitter
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          className="text-sky-500"
        >
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          className="text-sky-500"
        >
          LinkedIn
        </a>
        <a
          href="https://www.reddit.com/"
          target="_blank"
          className="text-sky-500"
        >
          Reddit
        </a>
        <a
          href="https://nikhilharmalkar.me/"
          target="_blank"
          className="text-sky-500"
        >
          Portfolio
        </a>
      </div>
    </div>
  );
};

export default DashboardAvatar;
