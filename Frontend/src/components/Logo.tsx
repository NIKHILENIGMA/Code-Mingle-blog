import { FC } from "react";
import { Link } from "react-router-dom";
import Img from "./Img";

const Logo: FC = () => {
  return (
    <div className="text-xl font-bold">
      <Link to="/">
        <Img
          src="/Image/light-techscribe-logo-2.png"
          alt="logo"
          cn="w-32 h-32"
        />
      </Link>
    </div>
  );
};

export default Logo;
