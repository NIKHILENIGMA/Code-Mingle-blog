import Authenticated from "@/components/Header/Authenticated";
import { ModeToggle } from "@/components/mode-toggle";
import { NavItems } from "@/constants/constants";
import { Pencil } from "lucide-react";
import { createElement, FC } from "react";
import ReactHtmlParser from "react-html-parser";
import SearchBar from "../Drafts/SearchBar";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

interface Draft {
  id: string;
  title: string;
  slug: string | null;
  content: string;
  image: string;
  readTime: null;
  category: null;
  author: {
    id: string;
    username: string;
    avatarImg: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface RenderDraftPreviewProps {
  styles: string;
  draft: Draft;
}

const RenderDraftPreview: FC<RenderDraftPreviewProps> = ({ styles, draft }) => {
  return (
    <div className={`${styles} absolute overflow-x-hidden flex flex-col`}>
      <header className="w-full bg-background text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-muted-foreground">
              NODEDRAFTS
            </div>
            <nav className="hidden md:flex space-x-4">
              {NavItems.map((navOpt, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 font-serif font-medium text-gray-700 hover:text-gray-900"
                >
                  <span>{createElement(navOpt.icon, { size: "18" })}</span>
                  <span className="text-sm">{navOpt.name}</span>
                </li>
              ))}
              <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <Pencil size={18} />
                <span>Write</span>
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <ModeToggle />
              <div className="flex items-center space-x-4">
                <SearchBar size={18} />
                <div className="hidden lg:flex">
                  <Authenticated />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        {/* Post Image */}
        <img
          src={draft?.image}
          alt={draft?.title}
          className="w-full h-auto rounded-lg mb-6 object-cover"
        />

        {/* Post Category */}
        <span className="bg-yellow-400 text-xs font-semibold text-gray-800 px-2 py-1 rounded-full">
          {draft?.category || "Uncategorized"}
        </span>

        {/* Post Title */}
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4 leading-snug text-gray-900">
          {draft?.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center gap-4 border-b pb-4 mb-6">
          <img
            src={draft?.author?.avatarImg}
            alt={draft?.author?.username}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900">
              {draft?.author?.username}
            </p>
            <p className="text-gray-500 text-sm">
              {new Date(draft?.createdAt).toLocaleDateString()} · 4 min read
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {ReactHtmlParser(draft?.content) ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
            </p>
          </section>
        </div>
      </main>
    <footer className="bg-background text-muted-foreground mt-8">
      {/* Upper Footer Section */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo & Newsletter */}
        <div className="md:col-span-2">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-lg">O</span>
          </div>
          <span className="ml-2 text-yellow-400 text-xl font-semibold">
            NODEDRAFTS
          </span>
        </div>
        <p className="mb-4 text-gray-400">
          Receive the latest news and updates to our blog first.
        </p>
        <form className="flex w-full max-w-md">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-l-md bg-gray-700 border border-gray-600 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-black font-medium rounded-r-md hover:bg-yellow-400 transition"
          >
            SUBSCRIBE
          </button>
        </form>
        </div>

        {/* Quick Links */}
        <div>
        <h3 className="text-yellow-400 font-semibold mb-4">Quick Links</h3>
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
        <h3 className="text-yellow-400 font-semibold mb-4">Help & Support</h3>
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
        <h3 className="text-yellow-400 font-semibold mb-4">Contact Us</h3>
        <div className="flex items-center mb-6">
          <FaEnvelope className="text-yellow-500 text-xl mr-2" />
          <span>Nodedrafts@blogs.com</span>
        </div>

        <h3 className="text-yellow-400 font-semibold mb-4">Social Links</h3>
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
      <div className="bg-background/70 py-4 text-center text-sm text-muted-foreground/50 flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8">
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
    </div>
  );
};

export default RenderDraftPreview;
