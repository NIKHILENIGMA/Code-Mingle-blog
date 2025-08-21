import React from "react";
import { useNavigate } from "react-router";
import ReactHtmlParser from "react-html-parser";

interface PostCardProps {
  id: string;
  image: string;
  date: string;
  title: string;
  description: string;
  name: string;
  readTime: string;
  type: string;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  image,
  title,
  date,
  description,
  name,
  readTime,
  type,
}) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    navigate(`/posts/${id}`);
  };
  const descriptionContent = ReactHtmlParser(description);
  return (
    <div className="overflow-hidden rounded-lg shadow-md" key={id}>
      <img src={image} alt={title} className="object-cover w-full h-40" />
      <div className="p-4 cursor-pointer" onClick={handlePostClick}>
        <span className="text-sm font-semibold text-indigo-600">{type}</span>
        <h3 className="mt-2 text-xl font-bold">{title}</h3>
        <p className="mt-2 text-sm ">
          {descriptionContent.slice(0, 1)}...
        </p>
        <div className="flex items-center mt-4">
          <img src={image} alt={name} className="w-10 h-10 rounded-full" />
          <div className="ml-3">
            <p className="text-sm font-semibold ">{name}</p>
            <p className="text-xs ">
              {date} · {readTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
