import { Img } from "@/components";
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen space-y-3">
      <Img
        src={
          "https://img.freepik.com/free-vector/glitch-error-404-page-background_23-2148090410.jpg?t=st=1736104469~exp=1736108069~hmac=bac858bcd71f0ff712c67a8136ebfa91cd02cdb6cddf43c8dff68b20fd0ac0f1&w=740"
        }
        cn="w-[80%] h-[80%] object-cover"
        alt="404"
      />
      <p className="absolute bottom-10">
        Go to{" "}
        <Link to="/" className="text-blue-400 underline">
          Go back to Home{" "}
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
