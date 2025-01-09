import React, { useEffect, createElement } from "react";
import ProfileCoverImage from "@/features/Profile/components/ProfileCoverImage";
import { Button, Img } from "@/components";
import { MapPin } from "@/Utils/Icons";
// import { Link } from "react-router-dom";
import {
  CircleUser,
  ClipboardList,
  Rss,
  UserCheck,
  Users,
} from "@/Utils/Icons";
import { NavLink, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const profileDetails = [
  {
    title: "Posts",
    count: 28,
    icon: Rss,
  },
  {
    title: "Following",
    count: 3487,
    icon: UserCheck,
  },
  {
    title: "Followers",
    count: 1593,
    icon: Users,
  },
];

const profileLinks = [
  {
    name: "Posts",
    link: "/profile/@username/posts",
    icon: CircleUser,
  },
  {
    name: "Activity",
    link: "/profile/@username/personal-information",
    icon: ClipboardList,
  },
];

const socialLinks = [
  {
    image: "/linkedin.svg",
    to: "https://linkedin.com",
    alt: "linkedin",
  },
  {
    image: "/twitter.svg",
    to: "https://twitter.com",
    alt: "twitter",
  },
  {
    image: "/github.svg",
    to: "https://github.com",
    alt: "github",
  },
];

const ProfilePage: React.FC = () => {
  const [follow, setFollow] = React.useState<boolean>(false);
  const [imageURL, setImageURL] = React.useState<string>("");

  const getInitials = (name: string): string => {
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  };

  useEffect(() => {
    fetch("https://api.unsplash.com/photos/random?client_id=YOUR_ACCESS_KEY")
      .then((response) => response.json())
      .then((data) => setImageURL(data.urls.regular));
  }, [])

  return (
    <div className="relative w-full min-h-screen mt-16 overflow-x-hidden ">
      <div className="min-h-screen mx-auto max-w-7xl">
        {/* Cover and Profile Section */}
        <div className="relative shadow-md w-full h-[40vw] md:h-[20vw] ">
          <ProfileCoverImage />
          <div className="absolute top-[76%] left-12">
            { !imageURL ? (
              <div className="flex items-center justify-center w-24 h-24 text-4xl text-white bg-blue-500 border-4 border-white rounded-full md:w-32 md:h-32">
                {getInitials("Johnathan Clein")}
              </div>
            ) : (
              <Img
                src="https://images.unsplash.com/photo-1686994676784-9629223f4e0e?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile"
                cn="object-cover object-center w-24 h-24 border-4 border-white rounded-full md:w-32 md:h-32"
              />
            )}
          </div>
        </div>

        <div className="flex items-end top-24 md:top-[80%] left-4 md:left-8 py-10">
          {/* User details */}
          <div className="w-[60%] ml-4 text-white h-full p-6 pl-10 text-shadow-lg">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
              Johnathan Clein
            </h1>
            <p className="flex justify-start text-sm text-gray-600 md:text-base space-x-9">
              <span>Commercial photographer </span>·
              <span className="flex gap-3">
                {" "}
                <MapPin />
                California, USA
              </span>
            </p>

            <div className="flex justify-start items-center space-x-5 w-[60%] py-2 socials">
              {socialLinks.map((social, index) => (
                <Link
                  to={social.to}
                  target="_blank"
                  key={index}
                  className="p-2 rounded-full border-slate-500 border-[1px]"
                >
                  <img
                    src={social.image}
                    alt={social.alt}
                    className="object-cover w-7 h-7"
                  />
                </Link>
              ))}
              <div className="flex space-x-1">
                <Button
                  variant={follow ? "default" : "secondary"}
                  onClick={() => setFollow((prev) => !prev)}
                  className={`px-4 py-2 rounded ${
                    follow ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
                  }`}
                >
                  {follow ? "Following" : "Follow"}
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex w-[40%]  h-full justify-around p-4 mt-12 md:p-6 md:mt-16">
            {profileDetails.map((detail, index) => (
              <div key={index} className="text-center border-x-[1px]">
                <h4 className="flex justify-between gap-4 px-5 text-xl font-bold">
                  <span>{createElement(detail.icon, { size: 26 })}</span>
                  <span>{detail.count}</span>
                </h4>
                <p className="text-gray-500">{detail.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="p-4 mt-4">
          <div className="flex items-center justify-between border-b">
            <div className="flex gap-4 py-2">
              {profileLinks.map((link, index) => (
                <NavLink
                  to={link.link}
                  key={index}
                  className={({ isActive }: { isActive: boolean }): string =>
                    `${
                      isActive
                        ? "text-sky-900 bg-sky-200 flex rounded-xl border-r-2 border-sky-700"
                        : ""
                    }flex items-center gap-2 px-4 py-2 hover:bg-sky-100 rounded-xl text-gray-900 p-2`
                  }
                >
                  {link.name} {React.createElement(link.icon, { size: "18" })}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-full px-4 py-2 mx-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
