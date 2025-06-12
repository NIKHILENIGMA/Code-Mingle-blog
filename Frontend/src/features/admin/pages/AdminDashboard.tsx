import { FC } from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard: FC = () => {
  return (
    <main className="min-h-screen p-6 bg-background text-secondary-foreground">
      <header className="p-4 mb-6 rounded-lg shadow-md bg-card">
        <h1 className="mb-4 text-3xl font-bold">
          Admin Dashboard
        </h1>
        <nav className="dashboard-nav">
          <ul className="flex space-x-6">
            <li>
              <Link
                to="users"
                className="font-medium text-secondary-foreground hover:text-primary"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="analytics"
                className="font-medium text-secondary-foreground hover:text-primary"
              >
                Analytics
              </Link>
            </li>
            <li>
              <Link
                to="settings"
                className="font-medium text-secondary-foreground hover:text-primary"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <section className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
        <div className="p-6 rounded-lg shadow-md bg-background">
          <h3 className="mb-2 text-lg font-semibold ">
            Total Users
          </h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="p-6 rounded-lg shadow-md bg-background">
          <h3 className="mb-2 text-lg font-semibold ">
            Active Users
          </h3>
          <p className="text-3xl font-bold text-green-600">789</p>
        </div>
        <div className="p-6 rounded-lg shadow-md bg-background">
          <h3 className="mb-2 text-lg font-semibold ">Revenue</h3>
          <p className="text-3xl font-bold text-purple-600">$45,678</p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 border-2 lg:grid-cols-3 bg-card">
        <div className="p-6 rounded-lg shadow-md bg-background lg:col-span-2">
          <h2 className="mb-4 text-xl font-bold ">
            Recent Activity
          </h2>
          <table className="min-w-full">
            <thead className="bg-card">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-md">
                  User
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-md">
                  Action
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-md">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y bg-card">
              <tr>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  John Doe
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  Created new post
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  2024-01-20
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  Jane Smith
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  Updated profile
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  2024-01-19
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="p-6 rounded-lg shadow-md bg-card">
          <h2 className="mb-4 text-xl font-bold">
            Notifications
          </h2>
          <ul className="space-y-3">
            <li className="flex items-center p-3 text-sm text-gray-600 rounded-md bg-blue-50 dark:bg-blue-900 dark:text-blue-200">
              New user registration
            </li>
            <li className="flex items-center p-3 text-sm text-gray-600 rounded-md bg-yellow-50 dark:bg-yellow-900 dark:text-yellow-200">
              System update available
            </li>
            <li className="flex items-center p-3 text-sm text-gray-600 rounded-md bg-red-50 dark:bg-red-900 dark:text-red-200">
              3 pending approvals
            </li>
          </ul>
        </aside>
      </section>

      <footer className="mt-8 text-sm text-center text-gray-500">
        <p>&copy; 2024 Admin Dashboard. All rights reserved.</p>
      </footer>
    </main>
  )
}

export default AdminDashboard
