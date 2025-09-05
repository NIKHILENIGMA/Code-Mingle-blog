import { FC } from "react";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router";
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
    <div className="max-w-4xl p-4 mx-auto my-10 md:p-8 bg-background">
      <header className="flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <h1 className="text-xl font-bold text-secondary-foreground">NODEDRAFTS</h1>

        {/* Center: Navigation */}
        <nav className="items-center hidden space-x-6 text-sm sm:flex bg-background text-muted-foreground">
          <a
            href="#"
            className="flex items-center space-x-1 font-medium text-muted-foreground"
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
        <div className="items-center hidden space-x-4 sm:flex">
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
            className="object-cover w-8 h-8 border-2 border-purple-500 rounded-full"
          />
        </div>
      </header>
      <main>
        {/* Post Image */}
        <img
          src={post?.image}
          alt={post?.title}
          className="w-full h-auto mb-6 rounded-lg"
        />

        {/* Post Category */}
        <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-yellow-400 rounded-full">
          {post?.category}
        </span>

        {/* Post Title */}
        <h1 className="mt-4 mb-2 text-3xl font-bold leading-snug md:text-4xl">
          {post?.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center gap-4 pb-4 mb-6 border-b">
          <img
            src={post?.author.avatarImg}
            alt={post?.author.username}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold">{post?.author?.username}</p>
            <p className="text-sm text-gray-500">
              {post?.createdAt
                ? new Date(post?.createdAt).toLocaleDateString()
                : new Date().toLocaleDateString()}{" "}
              · {post?.readTime} min read
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div
          className="mx-auto prose prose-lg prose-blue"
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
      <footer className="mt-10 bg-background text-muted-foreground">
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
                className="w-full px-4 py-2 text-gray-200 placeholder-gray-400 bg-transparent border border-gray-500 rounded-l-md focus:outline-hidden focus:ring-1 focus:ring-yellow-500"
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
    </div>
  );
};

export default PreviewPage;
