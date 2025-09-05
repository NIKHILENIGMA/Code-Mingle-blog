import { SETTINGS_SIDEBAR_OPTIONS } from '@/constants'
import { FC } from 'react'
import { NavLink, Outlet } from 'react-router'

const ProfileSettings: FC = () => {
  return (
    <div className="flex flex-col min-h-screen p-6 mt-10 md:flex-row">
      {/* Sidebar */}
      <aside className="w-full p-6 bg-primary text-secondary md:w-1/5 md:sticky md:h-screen md:top-16">
        <h2 className="text-lg font-semibold ">Settings</h2>
        <ul className="w-full mt-4 space-y-3 overflow-y-auto ">
          {SETTINGS_SIDEBAR_OPTIONS.map((option, index) => (
            <li key={`${index}-${option}`} className='w-full p-2 rounded-lg hover:bg-white/10'>
              <NavLink
                to={option.path}
                className={({ isActive }: { isActive: boolean }): string =>
                  `${isActive ? 'text-secondary underline' : 'text-secondary'} w-full transition-colors`
                }
              >
                {option.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
      <div className="w-full md:w-4/5 md:ml-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default ProfileSettings
