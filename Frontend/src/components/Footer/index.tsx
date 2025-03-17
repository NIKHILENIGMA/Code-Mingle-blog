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
    <footer className="bg-[#0C0B16] text-gray-300">
      {/* Upper Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo & Newsletter */}
        <div className="md:col-span-2">
          <div className="flex items-center mb-4">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">O</span>
            </div>
            <span className="ml-2 text-yellow-500 text-xl font-semibold">
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
              className="w-full px-4 py-2 rounded-l-md bg-transparent border border-gray-500 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-white text-black font-medium rounded-r-md hover:bg-gray-200 transition"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-yellow-500 transition">
                Shop by Category
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500 transition">
                Sell Machinery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500 transition">
                Buy Machinery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500 transition">
                Apply for Loan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500 transition">
                Apply for Insurance
              </a>
            </li>
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Help & Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-yellow-500 transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500 transition">
                Security
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500 transition">
                Order & Status Recovery
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500 transition">
                Warranty & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-500 transition">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <div className="flex items-center mb-6">
            <FaEnvelope className="text-yellow-500 text-xl mr-2" />
            <span>Nodedrafts@blogs.com</span>
          </div>

          <h3 className="text-white font-semibold mb-4">Social Links</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-yellow-500 p-2 rounded hover:bg-yellow-400 transition"
            >
              <FaFacebookF className="text-black" />
            </a>
            <a
              href="#"
              className="bg-yellow-500 p-2 rounded hover:bg-yellow-400 transition"
            >
              <FaXTwitter className="text-black" />
            </a>
            <a
              href="#"
              className="bg-yellow-500 p-2 rounded hover:bg-yellow-400 transition"
            >
              <FaInstagram className="text-black" />
            </a>
            <a
              href="#"
              className="bg-yellow-500 p-2 rounded hover:bg-yellow-400 transition"
            >
              <FaYoutube className="text-black" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-gray-900 py-4 text-center text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8">
        <p>© 2025 NODEDRAFTS. All rights reserved.</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-yellow-500 transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-yellow-500 transition">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
