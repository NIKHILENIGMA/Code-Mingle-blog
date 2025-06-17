import { SETTINGS_SIDEBAR_OPTIONS } from "@/constants";
import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";

const ProfileSettings: FC = () => {
  return (
    <div className="flex flex-col min-h-screen p-6 mt-16 bg-gray-100 md:flex-row dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-full p-6 bg-white rounded-lg shadow-md md:w-1/5">
        <h2 className="text-lg font-semibold text-gray-700">
          General Settings
        </h2>
        <ul className="mt-4 space-y-3 text-gray-600">
          {SETTINGS_SIDEBAR_OPTIONS.map((option, index) => (
            <li key={`${index}-${option}`}>
              <NavLink
                to={option.path}
                className={({ isActive }: { isActive: boolean }): string =>
                  `${isActive ? "text-sky-400 underline" : "text-slate-500"}`
                }
              >
                {option.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      <Outlet />
    </div>
  );
};

export default ProfileSettings;
