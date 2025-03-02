import { FC } from "react";

const PersonalSettings: FC = () => {
  return (
    <div className="w-full h-full">
      <main className="flex-1 bg-white p-6 rounded-lg shadow-md mx-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Personal Settings
        </h2>
        <p className="text-gray-500 text-sm">
          Update your personal details here.
        </p>

        <form className="mt-4 space-y-4">
          {/* Name Fields */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter first name"
              className="w-full border rounded-lg p-3"
            />
            <input
              type="text"
              placeholder="Enter last name"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 text-sm">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value="barlyvallendito@gmail.com"
                className="w-full border rounded-lg p-3 pr-10"
                readOnly
              />
            </div>
          </div>

          {/* Password Change */}
          <div>
            <label className="block text-gray-600 text-sm">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full border rounded-lg p-3"
            />
          </div>
          
          <div>
            <label className="block text-gray-600 text-sm">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border rounded-lg p-3"
            />
          </div>
          
          <div>
            <label className="block text-gray-600 text-sm">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Two-Factor Authentication */}
          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-gray-700">Enable Two-Factor Authentication</span>
            </label>
            <p className="text-xs text-gray-500 mt-1 ml-6">
              Add an extra layer of security to your account
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg">
              Cancel
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
              Save Changes
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PersonalSettings;
