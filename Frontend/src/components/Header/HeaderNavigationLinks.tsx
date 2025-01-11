import { createElement, FC } from "react";
import { NavLink } from "react-router-dom";
import { NavItems } from "@/constants/constants";

const HeaderNavigationLinks: FC = () => {
  return (
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
          <span>{createElement(navOpt.icon, { size: "18" })}</span>{" "}
          <span className="text-sm">{navOpt.name} </span>
        </NavLink>
      ))}
    </div>
  );
};

export default HeaderNavigationLinks;
