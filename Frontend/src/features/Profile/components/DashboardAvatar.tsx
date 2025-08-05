import { FC } from "react";
import { User } from "@/Types/user";
import DashboardAvatarChange from "./DashboardAvatarChange";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSquareXTwitter,
  FaReddit,
} from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { Link } from "react-router-dom";

interface ProfileAvatarProps {
  user: User | null;
}

const socialLinks = [
  {
    link: "https://www.facebook.com/",
    icon: FaFacebook,
  },
  {
    link: "https://www.twitter.com/",
    icon: FaSquareXTwitter,
  },
  {
    link: "https://www.instagram.com/",
    icon: FaInstagram,
  },
  {
    link: "https://www.linkedin.com/",
    icon: FaLinkedin,
  },
  {
    link: "https://www.reddit.com/",
    icon: FaReddit,
  },
  {
    link: "https://nikhilharmalkar.me/",
    icon: TbWorld,
  },
];

const DashboardAvatar: FC<ProfileAvatarProps> = ({ user }) => {
  return (
    <div className="relative -top-14">
      {user?.avatarImg === null || user?.avatarImg === "" ? (
        <img
          src={"https://www.gravatar.com/avatar/"}
          alt="User Avatar"
          className="object-cover mx-auto border-4 border-white rounded-full w-28 h-28"
        />
      ) : (
        <img
          src={user?.avatarImg}
          alt="User Avatar"
          className="object-cover mx-auto border-4 border-white rounded-full w-28 h-28"
        />
      )}

      <DashboardAvatarChange
        avatar={user?.avatarImg ?? ""}
        alt={user?.firstName ?? "User"}
      />
      <h1 className="mt-2 text-2xl font-bold">{`${user?.firstName} ${user?.lastName}`}</h1>
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
        {socialLinks.map((link, index) => (
          <Link to={link?.link} target="_blank" key={link.link + index}>
            <link.icon size={20} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardAvatar;
