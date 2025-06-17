import React from "react";
import { cards } from "@/constants/cardsContent";
import { useParams } from "react-router-dom";
import { Bookmark, Heart } from "@/Utils/Icons";
// import CommentButton from "@/features/Blog/components/Comments/CommentButton";
import SharePostLink from "@/features/Blog/components/Comments/SharePostLink";
import ReactHtmlParser from "react-html-parser";
import { Button } from "@/components";

// Todo: Replace with your actual post data structure


const ReadPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [liked, setLiked] = React.useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = React.useState<boolean>(false);
  const postCard = cards.find((card) => card.id === postId);
  const postContent = postCard?.description ?? "";
  const parsedContent = ReactHtmlParser(postContent);

  return (
    <div className="w-full min-h-screen p-5 mx-auto mt-20 scroll-bar-wdith">
      <div className="w-full h-full mx-auto space-x-4">
        <div className="w-full h-[100%] px-12 py-5 shadow-sm space-y-3 ">
          {/* Cover Image */}
          <div className="w-[60%] px-6 py-5 flex items-center justify-center mx-auto">
            <img
              src={postCard?.image}
              alt={postCard?.title}
              className="object-cover w-full h-full overflow-hidden rounded-3xl"
            />
          </div>

          {/* User Details */}
          <div className="w-full h-[80%] px-6 py-2 mb-2">
            <div className="flex items-center justify-evenly">
              <div className="flex items-center justify-center p-4">
                <img
                  src={postCard?.author.image}
                  alt={postCard?.author.name}
                  className="object-cover rounded-full w-14 h-14"
                />
                <div className="flex flex-col items-center justify-center p-5 rounded-3xl ">
                  <p className="px-8 text-2xl font-medium text-start ">
                    @{postCard?.author.name}
                  </p>
                  <p className="text-sm text-start">
                    {postCard?.date} -{" "}
                    <span className="font-medium">{postCard?.readTime}</span>{" "}
                    min read
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Title and Content */}
          <div className="w-full h-[40%]  md:px-28 md:mx-auto text-center">
            <h2 className="w-full text-2xl font-semibold text-center lg:text-5xl ">
              {postCard?.title}
            </h2>
          </div>
          <div className="w-full min-h-[60%] md:px-44 md:mx-auto">
            <div className="prose max-w-none">{parsedContent}</div>
          </div>

          {/* Post Actions */}
          <div className=" w-[40%] mx-auto h-[40%] px-2 py-3 rounded-2xl border-[1px] border-gray-200 flex justify-center sticky bottom-8 space-x-10 ">
            <Button
              variant={"outline"}
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
            </Button>
            <span className="flex items-center gap-2">
              {/* {postId && <CommentButton id={postId} />} */}
            </span>
            <span className="flex items-center gap-2">
              <SharePostLink />
            </span>
            <Button
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
            </Button>
          </div>

          {/* Tags */}
          {/* <div className="w-full h-[40%] px-2 py-3 flex justify-center space-x-10 ">
            {postCard?.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl"
              >
                #{tag}
              </span>
            ))}
          </div> */}
        </div>

        {/* Post Card */}
        {/* <div className="hidden lg:block w-[30%] h-[40%] sticky top-[13%] right-3 px-8 py-4 shadow-sm border-[1px] border-gray-200 rounded-3xl">
          <div className="w-full h-[60%] px-2">
            {postCard && (
              <div>
                <h2 className="font-semibold text-md">{postCard.title}</h2>
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ReadPostPage;
