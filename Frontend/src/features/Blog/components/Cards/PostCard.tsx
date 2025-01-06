import React from "react";

interface PostCardProps {
  image: string;
  username: string;
  title: string;
  content: string;
  coverImage?: string;
  date: string;
  category: string;
  time: number;
  tags: string[];
}

const PostCard: React.FC<PostCardProps> = ({
  image,
  username,
  title,
  content,
  date,
  category,
  coverImage,
  time,
  tags,
}) => {
  return (
    <div className="w-full min-h-[18vw] p-2 space-y-1 border-[1px] border-gray-300 rounded-2xl shadow-md cursor-pointer hover:shadow-lg">
      {/* User Details */}
      <div className="w-full flex items-center  space-x-5 h-[10%] py-1 pl-4">
        <img
          src={image}
          alt={username}
          className="object-cover w-12 h-12 rounded-full"
        />
        <p className="font-medium text-black text-md">@{username}</p>
      </div>
      {/* Post Details */}
      <div className="w-full h-[80%]  pl-4 flex justify-evenly items-center space-x-2 ">
        <div className="w-[60%] h-full space-y-2">
          <h2 className="text-lg font-semibold">
            {title.toString().substring(0, 110)} ...
          </h2>
          <p className="text-md text-black/50">
            {content.toString().substring(0, 140)} ...
          </p>
        </div>
        <div className="w-[35%] h-full">
          {coverImage && (
            <img
              src={coverImage}
              alt={title}
              className="object-cover w-full h-32 rounded-xl"
            />
          )}
        </div>
      </div>
      {/* Post time date category */}
      <div className="w-full h-[10%] p-1 flex justify-start items-center space-x-3 px-32 ">
        <span className="text-sm font-medium text-black/60">{date}</span>{" "}
        <span className="text-sm font-medium text-black/60"> {category}</span>
        <span className="text-sm font-medium text-black/60">
          {time} min read
        </span>
      </div>
      {/* Post tags */}
      <div className="w-full h-[10%] p-1  pl-4 flex items-center justify-between space-x-5">
        <p className="w-full px-4 py-2 space-x-3 font-medium text-left text-nowrap rounded-xl ">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 rounded-md">
              {tag}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
