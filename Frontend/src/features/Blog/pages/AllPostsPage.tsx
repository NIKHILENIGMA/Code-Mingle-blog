import { FC } from "react";
import FilterSidebar from "../components/BlogImages/FilterSidebar";
import { useNavigate } from "react-router-dom";
import { dummyPosts } from "@/constants/constants";
// import { getAllPostsService } from "@/services/api/postApiServices";
// import { useQuery } from "@tanstack/react-query";

interface PostInterface {
  id: number;
  image: string;
  title: string;
  date: string;
  description: string;
  author: string;
  role: string;
  category: string;
}

const AllPostsPage: FC = () => {
  const navigate = useNavigate();
  // const {
  //   data: posts,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: getAllPostsService,
  //   refetchOnWindowFocus: false,
  //   gcTime: 1000 * 60 * 60 * 24, // 24 hours
  //   staleTime: 1000 * 60 * 60 * 24, // 24 hours
  // });

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  const handleReadPost = (id: string) => {
    navigate(`/posts/${id}`);
  };

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
          className="w-full md:w-2/3 px-4 py-2 border border-primary/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition duration-200 bg-background"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <FilterSidebar />

        {/* Posts List */}
        <div className="w-full md:w-3/4 space-y-6">
          {dummyPosts?.map((post: PostInterface) => (
            <div
              key={post.id}
              className="flex flex-col md:flex-row bg-background text-muted-foreground rounded-lg p-4 md:p-6 space-y-4 md:space-y-0 md:space-x-6 transition hover:shadow-md cursor-pointer"
              onClick={() => handleReadPost(post.id.toString())}
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
                  <h2 className="text-xl font-sexmibold  hover:underline cursor-pointer">
                    {post.title}
                  </h2>

                  <div className="flex items-center text-sm text-muted-foreground/70 mt-2 space-x-3">
                    <span>{post.date}</span>
                    <span className="bg-primary text-muted-foreground px-2 py-1 rounded-md text-xs font-medium">
                      {post.category}
                    </span>
                  </div>

                  <p className="text-muted-foreground/50 mt-3 text-sm md:text-base">
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
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      {post.author}
                    </h4>
                    <p className="text-xs text-muted-foreground/60">{post.role}</p>
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
