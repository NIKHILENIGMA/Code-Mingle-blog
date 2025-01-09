import { FC } from "react";
import { ArrowLeftToLine, Newspaper, Settings } from "@/Utils/Icons";


const buttonOtps = [
  {
    title: "Deleted articles",
    icon: <Newspaper size={18} />,
  },
  {
    title: "Blog dashboard",
    icon: <Settings size={18} />,
  },
  {
    title: "Back to home",
    icon: <ArrowLeftToLine size={18} />,
  },
];

const SideBarSuggested: FC = () => {
  return (
    <div className="border-t-[1px] border-slate-400 w-full space-y-2 flex flex-col items-center justify-center">
      {buttonOtps.map((button, index) => (
        <div
          key={index}
          className="flex items-center w-full px-2 py-1 text-sm rounded-md justify-evenly hover:bg-slate-300"
        >
          {button.icon} {button.title}
        </div>
      ))}
    </div>
  );
};

export default SideBarSuggested;
