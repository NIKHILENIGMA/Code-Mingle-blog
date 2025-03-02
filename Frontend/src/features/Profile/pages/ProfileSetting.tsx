import { settingsSidebarOptions } from "@/constants/ProfileContants";
import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";

const ProfileSettings: FC = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 min-h-screen p-6 mt-16">
      {/* Sidebar */}
      <aside className="w-full md:w-1/5 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">
          General Settings
        </h2>
        <ul className="mt-4 space-y-3 text-gray-600">
          {settingsSidebarOptions.map((option, index) => (
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
