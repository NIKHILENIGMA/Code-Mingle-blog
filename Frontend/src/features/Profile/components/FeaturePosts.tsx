import { FC } from "react";

const FeaturePosts: FC = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Featured Posts</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {[
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
          "https://images.unsplash.com/photo-1542435503-956c469947f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D",
        ].map((post) => (
          <div
            key={post}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <img
              src={`${post}`}
              alt="Post"
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">Mastering CSS Grid</h3>
            <p className="text-gray-600 text-sm">
              Exploring the power of CSS Grid for better layouts.
            </p>
            <div className="flex justify-between text-gray-500 text-xs mt-2">
              <span>👍 120 Likes</span>
              <span>💬 45 Comments</span>
              <span>📅 Jan 5, 2025</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturePosts;
