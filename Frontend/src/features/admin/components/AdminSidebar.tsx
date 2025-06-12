import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { ModeToggle } from '../../../components/DarkMode/mode-toggle'
import { ADMIN_SIDEBAR_LINKS } from '@/constants'

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen border-primary/10 border-[2px] bg-card text-secondary-foreground">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 p-3 rounded-md top-4 left-4 md:left-44"
      >
        <FiMenu size={16} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 p-5 transform transition-transform duration-300 ease-in-out 
        ${
          isOpen ? 'translate-x-0' : '-translate-x-64'
        } md:translate-x-0 md:static md:flex-shrink-0 h-full`}
      >
        <h2 className="mb-6 text-xl font-bold text-black dark:text-white">Nodedrafts</h2>
        <ul>
          {ADMIN_SIDEBAR_LINKS.map((link, index) => (
            <li className="mb-4" key={`link.to-${index}`}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground'
                  } block p-3 rounded-md hover:bg-primary/20 hover:text-primary transform transition-colors duration-200 ease-in-out font-medium `
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
  )
}

export default AdminSidebar
