import { FC } from "react";
import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { dummyPosts } from "@/constants/constants";
// import { usePreview } from "@/features/drafts/hooks/usePreview";
// import { PreviewDraft } from "@/features/drafts/types";

const ReadPost: FC = () => {
  const { id } = useParams<{ id: string }>();
  // const { draftPreview } = usePreview(id!);

  // const post: PreviewDraft | undefined = draftPreview?.preview;

  // if (!post) {
  //   return <div>Post not found</div>;
  // }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-background my-10">
      {/* Post Image */}
      {dummyPosts
        ?.filter((post) => post?.id === Number(id))
        .map((post) => (
          <div>
            <img
              src={post?.image}
              alt={post?.title}
              className="w-full h-auto rounded-lg mb-6"
            />

            {/* Post Category */}
            <span className="bg-yellow-400 text-xs font-semibold text-gray-800 px-2 py-1 rounded-full">
              {post?.category}
            </span>

            {/* Post Title */}
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2 leading-snug">
              {post?.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 border-b pb-4 mb-6">
              <img
                src={post?.image}
                alt={post?.author}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">{post?.author}</p>
              </div>
            </div>

            {/* Content Sections */}
            <div
              className="prose prose-lg prose-blue mx-auto"
              dangerouslySetInnerHTML={{ __html: post?.description || "" }}
            />

            {/* Social Sharing */}
            <div className="flex justify-center mt-6">
              <div className="flex gap-4 rounded-2xl border p-1 w-[40%] justify-center">
                {["👍", "💬", "🔗", "📩"].map((icon, index) => (
                  <div className="flex items-center" key={index}>
                    <button className="p-2 transition">{icon}</button>
                    <Separator orientation="vertical" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ReadPost;
