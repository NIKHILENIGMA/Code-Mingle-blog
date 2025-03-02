import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components";
import { Settings } from "@/Utils/Icons";
import { DialogTitle } from "@/components/ui/dialog";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

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
    <div className="absolute bottom-5 right-8 bg-opacity-50 hover:text-red-500 cursor-pointer">
      <Dialog>
        <DialogTrigger>
          {/* Settings Icon */}
          <Settings />
        </DialogTrigger>

        <DialogContent className="max-w-[50vw] min-h-[70vh]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <div className="w-full h-full flex justify-center items-start p-4 ">
              <div className="flex gap-6 w-full h-full">
                <div className="w-1/4 h-full p-4 rounded-lg border-[1px] border-slate-300">
                  <ul className="space-y-8 text-md font-medium space-x-2">
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
                <div className="w-3/4 h-full  p-4 rounded-lg border-[1px] border-slate-300">
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
