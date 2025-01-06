import React from "react";
import { Reply } from "@/constants/dummyData";
import { Heart } from "@/Utils/Icons";

interface ReplyCommentProps {
  reply: Reply;
}

const ReplyComment: React.FC<ReplyCommentProps> = ({ reply }) => {
  return (
    <div className="w-full min-h-[60%] p-2" key={reply.username + reply.replyDate}>
      {/* Reply User info */}
      <div className="flex items-center w-full h-[6%] p-2 pl-5">
        <img
          src={reply.userImage}
          alt={reply.username}
          className="object-cover w-10 h-10 rounded-full"
        />
        <div className="px-5">
          <div className="text-lg font-semibold text-black/90">
            {reply.username}
          </div>
          <div className="text-sm font-normal text-black/50">
            {reply.replyDate}
          </div>
        </div>
      </div>

      {/* Reply Actions */}
      <div className="w-full min-h-[94%] p-2 flex flex-col justify-center items-center space-y-1">
        <div className="items-center w-full px-2 py-1 pl-5 text-lg font-normal leading-5 text-wrap text-black/80">
          {reply.replyText}
        </div>
        <div className="flex items-center w-full p-2 pl-5 space-x-2">
          <span className="items-center justify-start space-x-4 w-[22%] flex">
            <Heart size={18} /> {reply.replyLikes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReplyComment;
