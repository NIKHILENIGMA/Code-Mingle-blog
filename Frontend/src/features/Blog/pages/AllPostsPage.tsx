import { FC } from "react";
import FilterSidebar from "../components/BlogImages/FilterSidebar";
const posts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    author: "Nickenigma",
    role: "Founder / CEO",
    category: "Technology",
  },
];

const AllPostsPage: FC = () => {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto my-16">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Discover the latest stories and news
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search blogs, stories and more..."
          className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <FilterSidebar />

        {/* Posts List */}
        <div className="w-full md:w-3/4 space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col md:flex-row bg-white rounded-lg p-4 md:p-6 space-y-4 md:space-y-0 md:space-x-6 transition hover:shadow-md"
            >
              {/* Post Image */}
              <div className="w-full md:w-1/3">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>

              {/* Post Content */}
              <div className="flex flex-col justify-between w-full">
                {/* Post Header */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 hover:underline cursor-pointer">
                    {post.title}
                  </h2>

                  <div className="flex items-center text-sm text-gray-500 mt-2 space-x-3">
                    <span>{post.date}</span>
                    <span className="bg-yellow-400 text-gray-800 px-2 py-1 rounded-md text-xs font-medium">
                      {post.category}
                    </span>
                  </div>

                  <p className="text-gray-600 mt-3 text-sm md:text-base">
                    {post.description}
                  </p>
                </div>

                {/* Author Section */}
                <div className="flex items-center mt-4 space-x-3">
                  <img
                    src="https://randomuser.me/api/portraits"
                    alt="Author"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">
                      {post.author}
                    </h4>
                    <p className="text-xs text-gray-500">{post.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            <button className="text-purple-600 hover:underline">
              Previous
            </button>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`px-3 py-1 rounded-full ${
                  num === 1
                    ? "bg-purple-600 text-white"
                    : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}
            <button className="text-gray-600 px-3 py-1 border rounded-full">
              ...
            </button>
            <button className="text-gray-600 px-3 py-1 border rounded-full">
              100
            </button>
            <button className="text-purple-600 hover:underline">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPostsPage;
