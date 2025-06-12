import { FC } from 'react'

const RolesAndPermissions: FC = () => {
  return (
    <div className="w-full h-full p-10 text-secondary-foreground bg-background">
      <div className="flex flex-col items-start justify-between mb-4">
        <h1 className="mb-4 text-2xl font-bold">Roles and Permissions</h1>
        <p className="text-sm text-muted-foreground text-md">
          Manage user roles and permissions to control access to various
          features and functionalities within the application.
        </p>
      </div>
      <div className="flex flex-col items-start justify-between mb-4">
        <h2 className="mb-2 text-xl font-semibold">Role List</h2>
        <p className="text-sm text-muted-foreground">
          Define roles to categorize users based on their responsibilities and
          access levels.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Example Role Card */}

        <div className="p-4 shadow bg-card text-foreground rounded-xl">
          <h3 className="text-lg font-semibold">Admin</h3>
          <p className="text-sm text-muted-foreground">
            Full access to all features and settings.
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-background text-secondary-foreground">
          <h3 className="text-lg font-semibold">Moderator</h3>
          <p className="text-sm text-muted-foreground">
            Can manage content and moderate user interactions, but has limited
            access to settings.
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-background text-secondary-foreground">
          <h3 className="text-lg font-semibold">User</h3>
          <p className="text-sm text-muted-foreground">
            Standard user access with permissions to view and interact with
            content, but no administrative privileges.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">Permissions</h2>
        <p className="text-sm text-muted-foreground">
          Assign specific permissions to roles to control access to features and
          functionalities.
        </p>
        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Example Permission Card */}
          <div className="p-4 border rounded-lg bg-card text-secondary-foreground">
            <h3 className="text-lg font-semibold">Create Content</h3>
            <p className="text-sm text-muted-foreground">
              Allows users to create new content within the application.
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-card text-secondary-foreground">
            <h3 className="text-lg font-semibold">Edit Content</h3>
            <p className="text-sm text-muted-foreground">
              Grants permission to edit existing content.
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-card text-secondary-foreground">
            <h3 className="text-lg font-semibold">Delete Content</h3>
            <p className="text-sm text-muted-foreground">
              Allows users to delete content they have created or manage.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RolesAndPermissions
