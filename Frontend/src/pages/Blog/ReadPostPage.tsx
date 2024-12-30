import React from "react";
import { postCardData, PostCardProps } from "@/constants/dummyData";
import { useNavigate, useParams } from "react-router-dom";
import { Bookmark, Heart } from "@/Utils/Icons";
import CommentButton from "@/features/Blog/components/CommentButton";
import SharePostLink from "@/features/Blog/components/SharePostLink";

// import { RootState } from "@/app/store/store";
// import { useSelector } from "react-redux";
// import ReactHtmlParser from "react-html-parser";

const ReadPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [liked, setLiked] = React.useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = React.useState<boolean>(false);
  const postCard: PostCardProps | undefined = postCardData.find(
    (post: PostCardProps) => post.id === postId
  );

  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen p-5 mx-auto mt-20 bg-[#ffffff7b] scroll-bar-wdith">
      <div className="flex w-full h-full mx-auto space-x-4 ">
        <div className="w-full lg:w-[70%] h-[100%] px-12 py-5  rounded-3xl border-[1px] border-gray-200 bg-white shadow-sm space-y-3 ">
          {/* Cover Image */}
          <div className="w-full h-[80%] px-6 py-5">
            <img
              src={postCard?.coverImage}
              alt={postCard?.title}
              className="object-cover w-full h-full overflow-hidden rounded-3xl"
            />
          </div>

          {/* User Details */}
          <div className="w-full h-[80%] px-6 py-2 mb-2">
            <div className="flex items-center justify-evenly" onClick={() => navigate('/profile/@username')}>
              <div className="flex items-center justify-center p-4">
                <img
                  src={postCard?.image}
                  alt={postCard?.username}
                  className="object-cover rounded-full w-28 h-28"
                />
                <div className="flex flex-col items-center justify-center p-5 rounded-3xl">
                  <p className="px-8 text-4xl font-medium text-left text-black ">
                    @{postCard?.username}
                  </p>
                  <p className="text-lg text-black/50">
                    {postCard?.date} -{" "}
                    <span className="font-medium">{postCard?.time}</span> min
                    read
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Title and Content */}
          <div className="w-full h-[40%] px-2 ">
            <h2 className="text-3xl font-semibold text-black post-title">
              {postCard?.title}
            </h2>
          </div>
          <div className="w-full min-h-[60%] px-2">
            {postCard && postCard.content}
          </div>

          {/* Post Actions */}
          <div className=" w-[40%] mx-auto h-[40%] px-2 py-3 rounded-2xl border-[1px] border-gray-200 flex justify-center sticky bottom-8 space-x-10 bg-white">
            <span
              className="flex items-center gap-2"
              onClick={() => setLiked((prev) => !prev)}
            >
              {liked ? (
                <Heart
                  fill="#FF0000"
                  stroke="#FF0000"
                  className="cursor-pointer "
                />
              ) : (
                <Heart className="cursor-pointer" />
              )}
            </span>
            <span className="flex items-center gap-2">
              {postId && <CommentButton id={postId} />}
            </span>
            <span className="flex items-center gap-2">
              <SharePostLink />
            </span>
            <span
              className="flex items-center gap-2"
              onClick={() => setIsBookmarked((prev) => !prev)}
            >
              {isBookmarked ? (
                <Bookmark
                  fill="#000000"
                  stroke="#000000"
                  className="cursor-pointer"
                />
              ) : (
                <Bookmark className="cursor-pointer" />
              )}
            </span>
          </div>

          {/* Tags */}
          <div className="w-full h-[40%] px-2 py-3 flex justify-center space-x-10 ">
            {postCard?.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Post Card */}
        <div className="hidden lg:block w-[30%] h-[40%] sticky top-[13%] right-3 px-8 py-4 shadow-sm border-[1px] border-gray-200 rounded-3xl">
          <div className="w-full h-[60%] px-2">
            {postCard && (
              <div>
                <h2 className="font-semibold text-md">{postCard.title}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadPostPage;
