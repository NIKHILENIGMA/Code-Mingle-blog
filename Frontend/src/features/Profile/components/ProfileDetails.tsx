import React, { createElement } from "react";
import {
  CircleUser,
  ClipboardList,
  Settings2,
  Fingerprint,
} from "@/Utils/Icons";
import { NavLink } from "react-router-dom";

const profileLinks = [
  {
    name: "Profile Overview",
    link: "/profile/personal-overview",
    icon: CircleUser,
  },
  {
    name: "Personal Information",
    link: "/profile/personal-information",
    icon: ClipboardList,
  },
  {
    name: "Account Information",
    link: "/profile/account-information",
    icon: Settings2,
  },
  {
    name: "Change Password",
    link: "/profile/change-password",
    icon: Fingerprint,
  },
];

const ProfileDetails: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center sm:text-left sm:w-1/3">
      <img
        src="https://via.placeholder.com/100"
        alt="User Avatar"
        className="w-24 h-24 mx-auto rounded-full sm:mx-0"
      />
      <h2 className="mt-2 text-xl font-semibold">Stebin Ben</h2>
      <p className="text-gray-500">Full Stack Developer</p>

      {/* Social links */}
      <div className="flex justify-center gap-2 mt-4 sm:justify-start">
        <a href="#" className="text-red-500">
          <i className="fab fa-google"></i> G
        </a>
        <a href="#" className="text-blue-500">
          <i className="fab fa-facebook"></i> F
        </a>
        <a href="#" className="text-blue-700">
          <i className="fab fa-twitter"></i> T
        </a>
      </div>

      {/* Profile details */}
      <div className="flex justify-between mt-6">
        <div>
          <h4 className="text-lg font-semibold">85</h4>
          <p className="text-gray-400">Posts</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold">40</h4>
          <p className="text-gray-400">Projects</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold">4.5K</h4>
          <p className="text-gray-400">Members</p>
        </div>
      </div>

      <div className="flex flex-col justify-between mt-6 space-y-5">
        <ul>
          {profileLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.link}
              className={({ isActive }: { isActive: boolean }): string =>
                `${
                  isActive
                    ? "bg-sky-300 text-cyan-800 border-r-2 border-sky-700"
                    : "bg-white text-black"
                } flex items-center justify-center gap-2 p-2 text-gray-500 hover:text-gray-700`
              }
            >
              <div
                className={`flex items-center justify-center gap-2 p-2 text-gray-500 hover:text-gray-700`}
              >
                {createElement("span", link.icon)} {link.name}
              </div>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileDetails;
