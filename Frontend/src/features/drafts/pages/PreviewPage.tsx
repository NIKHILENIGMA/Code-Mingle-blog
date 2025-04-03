import { FC } from "react";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import { usePreview } from "@/features/drafts/hooks/usePreview";
import { PreviewDraft } from "@/features/drafts/types";
import { House, Pencil, Rss, Notebook } from "@/Utils/Icons";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa6";
import { Search, Sun } from "lucide-react";

const PreviewPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("postId: ", id);

  const { draftPreview } = usePreview(id!);

  const post: PreviewDraft | undefined = draftPreview?.preview;

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-background my-10">
      <header className="flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <h1 className="text-xl font-bold text-secondary-foreground">NODEDRAFTS</h1>

        {/* Center: Navigation */}
        <nav className="hidden sm:flex items-center bg-background text-muted-foreground text-sm space-x-6">
          <a
            href="#"
            className="flex items-center space-x-1 text-muted-foreground font-medium"
          >
            <House className="w-3 h-3" />
            <span>Home</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-1 "
          >
            <Rss className="w-3 h-3" />
            <span>Stories</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-1 "
          >
            <Notebook className="w-3 h-3" />
            <span>Editor</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-1 "
          >
            <Pencil className="w-3 h-3" />
            <span>Write</span>
          </a>
        </nav>

        {/* Right: Actions */}
        <div className="hidden sm:flex items-center space-x-4">
          <button className="p-2 rounded-full ">
            <span className="sr-only">Toggle Theme</span>
            <Sun />
          </button>
          <button className="p-2 rounded-full ">
            <Search />
          </button>
          <img
            src={post?.author.avatarImg}
            alt="User"
            className="w-8 h-8 rounded-full border-2 border-purple-500 object-cover"
          />
        </div>
      </header>
      <main>
        {/* Post Image */}
        <img
          src={post?.image}
          alt={post?.title}
          className="w-full h-auto rounded-lg mb-6"
        />

        {/* Post Category */}
        <span className="bg-yellow-400 text-xs font-semibold text-gray-800 px-2 py-1 rounded-full">
          {post?.category}
        </span>

        {/* Post Title */}
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2 leading-snug">
          {post?.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center gap-4 border-b pb-4 mb-6">
          <img
            src={post?.author.avatarImg}
            alt={post?.author.username}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold">{post?.author?.username}</p>
            <p className="text-gray-500 text-sm">
              {post?.createdAt
                ? new Date(post?.createdAt).toLocaleDateString()
                : new Date().toLocaleDateString()}{" "}
              · {post?.readTime} min read
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div
          className="prose prose-lg prose-blue mx-auto"
          dangerouslySetInnerHTML={{ __html: post?.content || "" }}
        />

        {/* Social Sharing */}
        <div className="flex justify-center mt-6">
          <div className="flex gap-4 rounded-2xl border p-1 w-[40%] justify-center">
            {["👍", "💬", "🔗", "📩"].map((icon, index) => (
              <div className="flex items-center" key={index}>
                <button className="p-2 transition">{icon}</button>
                <Separator orientation="vertical" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-background text-muted-foreground mt-10">
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
    </div>
  );
};

export default PreviewPage;
