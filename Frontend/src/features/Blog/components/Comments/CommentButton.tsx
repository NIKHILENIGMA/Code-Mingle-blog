// import React from "react";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Heart, MessageCircle } from "@/Utils/Icons";
// import { Comment, PostCardProps } from "@/constants/dummyData";
// import { Button } from "@/components";
// import ReplyComment from "./ReplyComment";

// interface CommentButtonProps {
//   id: string;
// }

// const CommentButton: React.FC<CommentButtonProps> = ({ id }) => {
//   const postCard: PostCardProps | undefined = postCardData.find(
//     (post: PostCardProps) => post.id === id
//   );
//   console.log(postCard);

//   return (
//     <Sheet>
//       <SheetTrigger>
//         <MessageCircle className="cursor-pointer" />
//       </SheetTrigger>
//       <SheetContent>
//         <SheetHeader>
//           <SheetTitle>Comments</SheetTitle>
//           <div className="w-full h-screen p-2 mx-auto overflow-y-auto scrollbar-thin">
//             {/* Comments */}
//             {/* Post COMMENT */}
//             <div className="w-full min-h-[90%] py-4 mb-20 space-y-4 ">
//               <div className="flex items-start space-x-3x">
//                 {postCard?.username && (
//                   <div className="flex items-center justify-between">
//                     <img
//                       src={postCard.image}
//                       alt="avatar"
//                       className="object-cover w-10 h-10 rounded-full "
//                     />
//                     <span className="px-3">{postCard.username}</span>
//                   </div>
//                 )}
//               </div>
//               <div className="w-full p-2 py-4 border-t border-b">
//                 <textarea
//                   className="w-full p-2 border rounded resize-none"
//                   cols={5}
//                   rows={7}
//                   placeholder="Add a comment..."
//                 />
//                 <Button variant={"default"}>Comment</Button>
//               </div>
//               {
//                 postCard?.comments && postCard?.comments?.length > 0  ? postCard?.comments?.map((comment: Comment, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start w-full h-full space-x-3"
//                   >
//                     <div className="w-full h-full p-3">
//                       {/* Comment User info */}
//                       <div className="flex items-center w-full h-[6%] p-2">
//                         <img
//                           src={comment.userImage}
//                           alt={comment.username}
//                           className="object-cover w-10 h-10 rounded-full"
//                         />
//                         <div className="px-5">
//                           <div className="text-lg font-semibold text-black/90">
//                             {comment.username}
//                           </div>
//                           <div className="text-sm font-normal text-black/50">
//                             {comment.commentDate}
//                           </div>
//                         </div>
//                       </div>
  
//                       {/* Comment Actions */}
//                       <div className="w-full min-h-[94%] p-2 flex flex-col justify-center items-center space-y-1">
//                         <div className="items-center w-full px-2 py-1 text-lg font-normal leading-5 text-wrap text-black/80">
//                           {comment.text}
//                         </div>
//                         <div className="flex items-center justify-start w-full p-2 space-x-4">
//                           <span className="items-center justify-center space-x-4 w-[20%] flex">
//                             <Heart size={18} /> {comment.commentLikes}
//                           </span>{" "}
//                           <button>Reply</button>
//                         </div>
//                       </div>
  
//                       {/* Reply to comment */}
//                       {
//                         comment.reply?.map((reply) => (
//                           <ReplyComment reply={reply} />
//                         ))
//                       }
//                     </div>
//                   </div>
//                 )) : (
//                   <div className="w-full h-full p-2 text-center text-black/50">
//                     No comments
//                   </div>
//                 )
//               }
//             </div>
//           </div>
//         </SheetHeader>
//       </SheetContent>
//     </Sheet>
//   );
// };

// export default CommentButton;
