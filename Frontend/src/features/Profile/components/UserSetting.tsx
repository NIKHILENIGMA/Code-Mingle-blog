import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components";
import { Settings } from "@/Utils/Icons";
import { DialogTitle } from "@/components/ui/dialog";
import { Outlet, NavLink } from "react-router";

const settingList = [
  {
    name: "Profile",
    to: "/profile/me",
  },
  {
    name: "Account",
    to: "/profile/me",
  },
  {
    name: "Security",
    to: "/profile/me",
  },
  {
    name: "Notification",
    to: "/profile/me",
  },
  {
    name: "Help",
    to: "/profile/me",
  },
  {
    name: "Logout",
    to: "/profile/me",
  },
];

const UserSetting: FC = () => {
  return (
    <div className="absolute bg-opacity-50 cursor-pointer bottom-5 right-8 hover:text-red-500">
      <Dialog>
        <DialogTrigger>
          {/* Settings Icon */}
          <Settings />
        </DialogTrigger>

        <DialogContent className="max-w-[50vw] min-h-[70vh]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <div className="flex items-start justify-center w-full h-full p-4 ">
              <div className="flex w-full h-full gap-6">
                <div className="w-1/4 h-full p-4 border rounded-lg border-slate-300">
                  <ul className="space-x-2 space-y-8 font-medium text-md">
                    {settingList.map((setting) => (
                      <NavLink
                        key={setting.name}
                        to={setting.to}
                        className={`${({
                          isActive,
                        }: {
                          isActive: boolean;
                        }): string =>
                          isActive
                            ? "bg-violet-400 px-2 py-1 rounded-lg text-white"
                            : "text-black"} flex flex-col items-start`}
                      >
                        {setting.name}
                      </NavLink>
                    ))}
                  </ul>
                </div>
                <div className="w-3/4 h-full p-4 border rounded-lg border-slate-300">
                  <p className="text-base leading-relaxed">
                    <Outlet />
                  </p>
                </div>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserSetting;
