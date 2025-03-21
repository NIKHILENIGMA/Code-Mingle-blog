import { FC } from "react";
import ReactHtmlParser from "react-html-parser";

interface POST {
  id: string;
  title: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  createdAt: string;
}

interface RecentPostsProps {
  posts: POST[] | null;
}

const RecentPosts: FC<RecentPostsProps> = ({ posts }) => {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
      {posts?.length !== 0 ? (
        <div className="space-y-4" data-testid="recent-posts">
          {posts &&
            posts.map((post) => (
              <div
                key={post.id}
                className="flex gap-4 bg-card p-4 rounded-lg shadow-md hover:shadow-lg transition border-primary-500 border"
              >
                <img
                  src={`${post.image}` || "https://via.placeholder.com/150"}
                  alt="Thumbnail"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold">{post.title}</h3>
                  <p className="text-muted-foreground text-xs">
                    {ReactHtmlParser(
                      post.content?.toString()?.substring(0, 430) + "..."
                    )}
                  </p>
                  <div className="flex justify-between text-muted-foreground text-xs mt-2">
                    <span>👍 {post.likes} Likes</span>
                    <span>💬 {post.comments} Comments</span>
                    <span>📅 {post.createdAt}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">No Posts Yet</h3>
          <p className="text-gray-600 text-sm">
            Start creating posts to see them here.
          </p>
        </div>
      )}
    </section>
  );
};

export default RecentPosts;
