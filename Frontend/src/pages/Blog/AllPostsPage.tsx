import PostCard from "@/features/Blog/components/Cards/PostCard";
import React from "react";
import { postCardData } from "@/constants/dummyData";
import { Button, Input, Label } from "@/components";
import { useNavigate } from "react-router-dom";
const AllPostsPage: React.FC = () => {

  const navigate = useNavigate()
  return (
    <div className="flex justify-start w-full min-h-screen p-5 pl-20 mx-auto my-14">
      <div className="w-[70%] h-full px-10 py-5 border-[1px] border-gray-200 rounded-3xl space-y-4 bg-transparent">
        <div className="w-full h-[40%] px-2">
          <h2 className="text-3xl text-black">All Posts</h2>
        </div>
        <div className="w-full h-[60%] px-2">
          <Button variant="ghost">All</Button>
          <Button variant="ghost">Following</Button>
          <Button variant="ghost">Followers</Button>
        </div>
        <div className="w-full h-[60%] px-2">
          <Label>Search</Label>
          <Input
            type="text"
            placeholder="Search for posts"
            className="w-full px-4 py-2 rounded-md focus:outline-1 focus:ring focus:outline-dashed focus:outline-orange-500"
          />
        </div>
        {/* Cards */}
        {
          postCardData.map((post, index) => (
            <div key={post.id + index} onClick={() => navigate(`/posts/${post.id}`)}>
              <PostCard
                title={post.title}
                content={post.content}
                image={post.image}
                username={post.username}
                date={post.date}
                coverImage={post.coverImage}
                category={post.category}
                time={post.time}
                tags={post.tags}
              />
            </div>
        ))}
      </div>
    </div>
  );
};

export default AllPostsPage;
