import { FC } from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa6";

const Footer: FC = () => {
  return (
    <footer className="bg-[#0C0B16] text-gray-300 z-40">
      {/* Upper Footer Section */}
      <div className="grid grid-cols-1 gap-8 px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 md:grid-cols-5">
        {/* Logo & Newsletter */}
        <div className="md:col-span-2">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-6 h-6 bg-yellow-500 rounded-full">
              <span className="text-lg font-bold text-black">O</span>
            </div>
            <span className="ml-2 text-xl font-semibold text-yellow-500">
              NODEDRAFTS
            </span>
          </div>
          <p className="mb-4">
            Receive the latest news and updates to our blog the first.
          </p>
          <form className="flex w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-gray-200 placeholder-gray-400 bg-transparent border border-gray-500 rounded-l-md focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="px-4 py-2 font-medium text-black transition bg-white rounded-r-md hover:bg-gray-200"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="transition hover:text-yellow-500">
                Shop by Category
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-yellow-500">
                Sell Machinery
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-yellow-500">
                Buy Machinery
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-yellow-500">
                Apply for Loan
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-yellow-500">
                Apply for Insurance
              </a>
            </li>
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="mb-4 font-semibold text-white">Help & Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="transition hover:text-yellow-500">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-yellow-500">
                Security
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-yellow-500">
                Order & Status Recovery
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-yellow-500">
                Warranty & Returns
              </a>
            </li>
            <li>
              <a href="#" className="transition hover:text-yellow-500">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social Links */}
        <div>
          <h3 className="mb-4 font-semibold text-white">Contact Us</h3>
          <div className="flex items-center mb-6">
            <FaEnvelope className="mr-2 text-xl text-yellow-500" />
            <span>Nodedrafts@blogs.com</span>
          </div>

          <h3 className="mb-4 font-semibold text-white">Social Links</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 transition bg-yellow-500 rounded hover:bg-yellow-400"
            >
              <FaFacebookF className="text-black" />
            </a>
            <a
              href="#"
              className="p-2 transition bg-yellow-500 rounded hover:bg-yellow-400"
            >
              <FaXTwitter className="text-black" />
            </a>
            <a
              href="#"
              className="p-2 transition bg-yellow-500 rounded hover:bg-yellow-400"
            >
              <FaInstagram className="text-black" />
            </a>
            <a
              href="#"
              className="p-2 transition bg-yellow-500 rounded hover:bg-yellow-400"
            >
              <FaYoutube className="text-black" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="flex flex-col items-center justify-between px-4 py-4 text-sm text-center text-gray-400 bg-gray-900 md:flex-row sm:px-6 lg:px-8">
        <p>© 2025 NODEDRAFTS. All rights reserved.</p>
        <div className="mt-2 space-x-4 md:mt-0">
          <a href="#" className="transition hover:text-yellow-500">
            Terms of Service
          </a>
          <a href="#" className="transition hover:text-yellow-500">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
