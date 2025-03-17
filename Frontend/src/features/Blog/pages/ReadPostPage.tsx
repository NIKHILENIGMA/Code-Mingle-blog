import { FC } from "react";
import { Separator } from "@/components/ui/separator";

const ReadPost: FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white my-10">
      {/* Post Image */}
      <img
        src="https://images.unsplash.com/photo-1557682224-5b8590cd9ec5"
        alt="Post Banner"
        className="w-full h-auto rounded-lg mb-6"
      />

      {/* Post Category */}
      <span className="bg-yellow-400 text-xs font-semibold text-gray-800 px-2 py-1 rounded-full">
        Technology
      </span>

      {/* Post Title */}
      <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2 leading-snug">
        How to use Engine Optimization to drive sales to further levels
      </h1>

      {/* Author Info */}
      <div className="flex items-center gap-4 border-b pb-4 mb-6">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Author"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold">Nielkingson</p>
          <p className="text-gray-500 text-sm">Mar 14, 2025 · 4 min read</p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        {/* Introduction Section */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            SEO is a powerful digital marketing strategy that helps businesses
            increase their online visibility and attract potential customers. By
            optimizing websites for search engines, companies can improve their
            rankings, drive more targeted traffic, and ultimately boost sales.
            Implementing effective SEO techniques ensures that customers find
            your products or services when searching online.
          </p>
        </section>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-8">
        {["Coding", "Online", "Product", "Results", "Process", "Product"].map(
          (tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200 transition"
            >
              #{tag}
            </span>
          )
        )}
      </div>

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
    </div>
  );
};

export default ReadPost;
