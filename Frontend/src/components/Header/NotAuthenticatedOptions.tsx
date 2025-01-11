import { FC } from "react";
import { Link } from "react-router-dom";

const options = [
  {
    name: "Login",
    to: "/login",
  },
  {
    name: "Register",
    to: "/signup",
  },
];

const NotAuthenticatedOptions: FC = () => {
  return (
    <div className="flex flex-col items-center justify-around space-y-8 text-3xl">
      {options.map((option, index) => (
        <Link key={index} to={option.to}>
          {option.name}
        </Link>
      ))}
    </div>
  );
};

export default NotAuthenticatedOptions;
