import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { ModeToggle } from "../../../components/DarkMode/mode-toggle";

const links = [
  {
    title: "Dashboard",
    to: "/admin/dashboard",
  },
  {
    title: "Category",
    to: "/admin/categories",
  },
  {
    title: "Posts",
    to: "/admin/posts",
  },
  {
    title: "Reports",
    to: "/admin/reports",
  },
];

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 fixed top-4 left-4  md:left-44 rounded-md z-50"
      >
        <FiMenu size={16} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 p-5 transform transition-transform duration-300 ease-in-out 
        ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 md:static md:flex-shrink-0 h-full`}
      >
        <h2 className="text-xl font-bold mb-6">Nodedrafts</h2>
        <ul>
          {links.map((link, index) => (
            <li className="mb-4" key={`link.to-${index}`}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  } block p-3 rounded-md hover:bg-accent hover:text-accent-foreground`
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <div>
          <ModeToggle />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-opacity-50 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default AdminSidebar;
