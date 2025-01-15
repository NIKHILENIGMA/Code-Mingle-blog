import { FC } from "react";
import { LoaderCircle } from "@/Utils/Icons";

const SpinLoader: FC<{ classNameProps?: string }> = ({ classNameProps }) => {
  return (
    <span className={`${classNameProps} animate-spin`}>
      <LoaderCircle />
    </span>
  );
};

export default SpinLoader;
