import React from "react";
import PostCard from "@/features/Blog/components/Cards/PostCard";
import { cards } from "@/constants/cardsContent";


const AllPostsPage: React.FC = () => {
  // const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-start w-full min-h-screen p-5 pl-20 mx-auto my-14">
      <h1 className="p-4 my-4 text-5xl font-semibold text-center uppercase">
        Community Posts
      </h1>
      <div className="flex items-center mb-6 justify-evenly">
        {/* Search bar */}
        <div className="flex flex-1 max-w-md space-x-4">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2  bg-blue-500 rounded-md focus:outline-none">
            Search
          </button>
        </div>
        {/* Filters */}
        <div className="flex space-x-4">
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Types</option>
            <option value="Article">Article</option>
            <option value="Video">Video</option>
            <option value="Case Study">Case Study</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="readTime">Read Time</option>
          </select>
        </div>
      </div>
      {/* Posts */}
      <div className="container px-4 py-8 mx-auto">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <PostCard key={index} {...card} name={card.author.name} />
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="flex items-center justify-center mt-10">
        <button className="px-4 py-2  bg-blue-500 rounded-md focus:outline-none">
          Load More
        </button>
      </div>
    </div>
  );
};

export default AllPostsPage;
