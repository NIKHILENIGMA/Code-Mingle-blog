import React from "react";
import { Link } from "react-router-dom";



const Header: React.FC = () => {
  // Todo : Add authentication status from redux store
  const authStatus = false;

  const NavItems = [
    { name: "Home", path: "/", active: authStatus },
    { name: "About", path: "/about", active: authStatus },
    { name: "Contact", path: "/contact", active: authStatus },
    { name: "write", path: "/write", active: !authStatus },
]

  return (
    <header className="fixed top-0 z-20 w-full h-12 p-2 text-black bg-white shadow-md">
      <nav className="flex items-center justify-around w-full h-full">
        {/* Logo */}
        <div>
          <Link to="/">Logo</Link>
        </div>
        {/* Navigation Links */}
        <div className="flex items-center justify-around w-1/2">
          {
            NavItems.map((navOpt, index) => (
                <Link key={index} to={navOpt.path} className="font-serif font-normal">
                    {navOpt.name}
                </Link>
            ))
          }
        </div>
        <div>
          {
            // User Auth
            authStatus ? (
            <div>
              <Link to="/profile">Profile</Link>
              <Link to="/logout">Logout</Link>
            </div>
            ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
            )
          }
        </div>
      </nav>
    </header>
  );
};

export default Header;
