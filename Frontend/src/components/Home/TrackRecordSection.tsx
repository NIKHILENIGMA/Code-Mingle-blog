import { FC } from "react";

const TrackRecordSection: FC = () => {
  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="w-full lg:w-1/2">
          <p className="text-sm text-purple-600 uppercase tracking-wider mb-2">
            Track Record
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Trusted by thousands of writers worldwide
          </h2>
          <p className="dark:text-gray-400 mb-8">
            Our platform is trusted by thousands of aspiring writers around the
            world for better performance and better productivity.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t  pt-6">
            <div>
              <p className="text-2xl font-bold">9,000+</p>
              <p className="dark:text-gray-400">Current creators on the platform</p>
            </div>
            <div>
              <p className="text-2xl font-bold">2%</p>
              <p className="dark:text-gray-400">
                Very Minimal and affordable flat platform fee
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold">99.9%</p>
              <p className="dark:text-gray-400">Uptime Guarantee</p>
            </div>
            <div>
              <p className="text-2xl font-bold">$90M</p>
              <p className="dark:text-gray-400">Paid out to our Creators</p>
            </div>
          </div>

          {/* Read More Button */}
          <div className="mt-8">
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300">
              Read More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvcmtpbmd8ZW58MHx8MHx8fDA%3D"
            alt="Writers collaborating"
            className="rounded-lg shadow-md object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default TrackRecordSection;
