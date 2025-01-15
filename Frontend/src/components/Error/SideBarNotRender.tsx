import { FC } from "react";

const SideBarNotRender: FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full p-4 text-red-500 bg-red-100 rounded-md">
      <p className="flex items-center justify-center w-full h-[40%]">
        Failed to load drafts
      </p>
    </div>
  );
};

export default SideBarNotRender;
