import { FC } from "react";

const ProfileSecurity: FC = () => {
  return (
    <div className="w-1/2">
      <main className="flex-1 bg-white p-6 rounded-lg shadow-md mx-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Security Settings
        </h2>
        <p className="text-gray-500 text-sm">
          Manage your password and account security.
        </p>

        <form className="mt-4 space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-gray-600 text-sm">Current Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full border rounded-lg p-3 pr-10"
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-gray-600 text-sm">New Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full border rounded-lg p-3 pr-10"
              />
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-gray-600 text-sm">Confirm New Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full border rounded-lg p-3 pr-10"
              />
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div>
            <label className="block text-gray-600 text-sm">Two-Factor Authentication</label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="twoFactorAuth"
                className="mr-2"
              />
              <label htmlFor="twoFactorAuth">Enable two-factor authentication</label>
            </div>
          </div>

          {/* Session Management */}
          <div>
            <label className="block text-gray-600 text-sm">Session Management</label>
            <button className="mt-2 text-red-600 text-sm underline">
              Sign out from all other devices
            </button>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg">
              Cancel
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
              Update Security
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProfileSecurity;
