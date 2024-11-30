import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen space-y-3 bg-slate-500">
      <h2 className="text-4xl font-medium">404 Not Found</h2>
      <p>
        Go to{" "}
        <Link to="/" className="text-blue-400 underline">
          Home{" "}
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
