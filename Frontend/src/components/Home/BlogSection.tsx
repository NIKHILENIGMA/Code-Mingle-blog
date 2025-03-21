import { FC } from "react";

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "How to use Engine Optimization to drive sales to further levels",
    date: "Mar 14, 2025",
    category: "Coding",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    image:
      "https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJsb2d8ZW58MHx8MHx8fDA%3D",
    author: {
      name: "Sam Doe",
      role: "Founder / CEO of Blogspace",
      avatar:
        "https://images.unsplash.com/photo-1514315384763-ba401779410f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJhdyUyMHBvcnRyYWl0fGVufDB8fDB8fHww",
    },
  },
  {
    id: 2,
    title: "Boost Your Conversion Rate",
    date: "Mar 14, 2025",
    category: "Coding",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise in various...",
    image:
      "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJsb2d8ZW58MHx8MHx8fDA%3D",
    author: {
      name: "Joie Doe",
      role: "Software Engineer",
      avatar:
        "https://images.unsplash.com/photo-1552663651-2e4250e6c7c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmF3JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    },
  },
  {
    id: 3,
    title: "Improve your customer Experience",
    date: "Mar 14, 2025",
    category: "Coding",
    description:
      "A platform designed for developers to express ideas, share insights and collaborate. Connect with a global community that values your expertise.",
    image:
      "https://plus.unsplash.com/premium_photo-1670963023642-d6a4a1287f33?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGJsb2d8ZW58MHx8MHx8fDA%3D",
    author: {
      name: "Sara Doe",
      role: "Marketing Manager",
      avatar:
        "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmF3JTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    },
  },
];

const BlogSection: FC = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-purple-600 uppercase tracking-wider mb-2">
            Blog Section
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Discover the latest stories and news
          </h2>
          <p className="dark:text-gray-400 max-w-2xl mx-auto">
            Welcome to our blog section where you can read, learn or even write
            the best stories or new inventions, creative ideas and much more,
            with just one click.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-lg border bg-card text-card-foreground overflow-hidden hover:shadow-md flex flex-col"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center text-sm space-x-4 mb-2">
                  <span>{post.date}</span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  {post.description}
                </p>
                <div className="flex items-center space-x-3 mt-auto">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium ">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {post.author.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Read More Button */}
        <div className="mt-12 text-center">
          <button className="px-6 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300">
            Read More
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
