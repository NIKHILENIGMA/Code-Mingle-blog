import { FC } from "react";
import { CircleCheckBig } from "lucide-react";


const GeneralDetails: FC = () => {
  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Main Content */}
      <main className="flex-1 bg-white p-6 rounded-lg shadow-md mx-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          General Details
        </h2>
        <p className="text-gray-500 text-sm">
          Update your photo and personal details here.
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

          {/* Email & Username */}
          <div>
            <label className="block text-gray-600 text-sm">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value="barlyvallendito@gmail.com"
                className="w-full border rounded-lg p-3 pr-10"
                readOnly
              />
              <CircleCheckBig
                stroke="green"
                className="absolute right-3 top-4 text-green-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 text-sm">Username</label>
            <div className="relative">
              <input
                type="text"
                value="barlyvallendito"
                className="w-full border rounded-lg p-3 pr-10"
                readOnly
              />
              <CircleCheckBig
                stroke="green"
                className="absolute right-3 top-4 text-green-500"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-600 text-sm">Bio</label>
            <textarea
              rows={3}
              className="w-full border rounded-lg p-3"
              defaultValue="Hello Planet 👋. I'm a Product Designer based in Indonesia. I'm a professional UI/UX Designer with more than 7+ years of experience focused on web and mobile application design, wireframing, and prototyping with delivering high-quality designs."
            ></textarea>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-gray-600 text-sm">Timezone</label>
            <select className="w-full border rounded-lg p-3">
              <option>Pacific Standard Time (PST) UTC-08:00</option>
              <option>Eastern Standard Time (EST) UTC-05:00</option>
              <option>Central European Time (CET) UTC+01:00</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg">
              Cancel
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
              Save
            </button>
          </div>
        </form>
      </main>

      {/* Profile Section */}
      <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Your Photo</h2>
        <div className="mt-4 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-300"></div>
          <button className="text-blue-600 mt-2">Update</button>
          <button className="text-red-500 mt-1">Delete</button>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Click to upload or drag and drop (SVG, PNG, JPG, GIF) max 800x400px.
        </p>

        {/* Google Section */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-700">Google</p>
          <p className="text-sm text-green-600">Connected</p>
          <a href="#" className="text-blue-600 text-sm">
            Click here to learn more.
          </a>
        </div>
      </aside>
    </div>
  );
};

export default GeneralDetails;
