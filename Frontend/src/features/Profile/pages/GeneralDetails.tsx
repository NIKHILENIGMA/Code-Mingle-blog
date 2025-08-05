import { FC } from 'react'
import { CircleCheckBig } from 'lucide-react'
import { BsTrash2 } from 'react-icons/bs'

const GeneralDetails: FC = () => {
  return (
    <div className="flex flex-col w-full h-full md:flex-row">
      {/* Main Content */}
      <main className="flex-1 p-12 mx-12 bg-yellow-200">
        <h2 className="text-2xl font-semibold text-gray-700">
          Personal Details
        </h2>
        <p className="text-sm text-gray-500">
          Update your photo and personal details here.
        </p>

        <div className="flex items-center mt-4">
          <img
            src="https://avatars.githubusercontent.com/u/12345678?v=4"
            alt="Profile"
            className="w-24 h-24 border-2 border-gray-300 rounded-full"
          />
          <button className="flex items-center justify-center px-4 py-2 ml-4 text-sm rounded-lg">
            <BsTrash2 className="inline" size={16} color='red' />
          </button>
          <button className="px-4 py-2 ml-4 text-sm transition-colors rounded-lg bg-primary text-secondary hover:bg-accent ">
            Change Photo
          </button>
        </div>

        <form className="mt-4 space-y-4 ">
          {/* Name Fields */}
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              placeholder="Enter first name"
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Enter last name"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Email & Username */}
          <div>
            <label className="block text-sm text-gray-600">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value="barlyvallendito@gmail.com"
                className="w-full p-3 pr-10 border rounded-lg"
                readOnly
              />
              <CircleCheckBig
                stroke="green"
                className="absolute text-green-500 right-3 top-4"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Username</label>
            <div className="relative">
              <input
                type="text"
                value="barlyvallendito"
                className="w-full p-3 pr-10 border rounded-lg"
                readOnly
              />
              <CircleCheckBig
                stroke="green"
                className="absolute text-green-500 right-3 top-4"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm text-gray-600">Bio</label>
            <textarea
              rows={3}
              className="w-full p-3 border rounded-lg"
              defaultValue="Hello Planet 👋. I'm a Product Designer based in Indonesia. I'm a professional UI/UX Designer with more than 7+ years of experience focused on web and mobile application design, wireframing, and prototyping with delivering high-quality designs."
            ></textarea>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm text-gray-600">Timezone</label>
            <select className="w-full p-3 border rounded-lg">
              <option>Pacific Standard Time (PST) UTC-08:00</option>
              <option>Eastern Standard Time (EST) UTC-05:00</option>
              <option>Central European Time (CET) UTC+01:00</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button className="px-6 py-2 text-gray-700 bg-gray-300 rounded-lg">
              Cancel
            </button>
            <button className="px-6 py-2 text-white bg-blue-600 rounded-lg">
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default GeneralDetails
