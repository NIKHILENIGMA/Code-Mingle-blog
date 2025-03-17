import { FC } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="flex flex-col items-center space-y-6 text-center">
        {/* Error Code */}
        <h1 className="text-7xl font-bold text-black">404</h1>

        {/* Error Message */}
        <h2 className="text-2xl font-semibold text-black">PAGE NOT FOUND</h2>

        {/* Additional Info */}
        <p className="text-gray-500">
          Your search has ventured beyond the known universe
        </p>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-md shadow hover:bg-purple-700 transition"
        >
          Back to Home
        </button>
      </div>

      {/* Left Illustration */}
      <img
        src="/not-found-standing-girl.svg"
        alt="Left Illustration"
        className="hidden md:block w-44 h-auto absolute left-[27%] bottom-220"
      />

      {/* Right Illustration */}
      <img
        src="/not-found-sitting-boy.svg"
        alt="Right Illustration"
        className="hidden md:block w-44 h-auto absolute right-[20%] bottom-[30%]"
      />
    </div>
  );
};

export default NotFoundPage;
