import { FC } from 'react'
import { useParams } from 'react-router'
import { Separator } from '@/components/ui/separator'
import { DUMMY_POSTS } from '@/constants'
// import { usePreview } from "@/features/drafts/hooks/usePreview";
// import { PreviewDraft } from "@/features/drafts/types";

const ReadPost: FC = () => {
  const { id } = useParams<{ id: string }>()
  // const { draftPreview } = usePreview(id!);

  // const post: PreviewDraft | undefined = draftPreview?.preview;

  // if (!post) {
  //   return <div>Post not found</div>;
  // }

  return (
    <div className="max-w-4xl p-4 mx-auto my-10 md:p-8 bg-background">
      
      {/* Post Image */}
      {DUMMY_POSTS?.filter((post) => post?.id === Number(id)).map((post) => (
        <div>
          <img
            src={post?.image}
            alt={post?.title}
            className="w-full h-auto mb-6 rounded-lg"
          />

          {/* Post Category */}
          <span className="px-2 py-1 text-xs font-semibold text-gray-800 bg-yellow-400 rounded-full">
            {post?.category}
          </span>

          {/* Post Title */}
          <h1 className="mt-4 mb-2 text-3xl font-bold leading-snug md:text-4xl">
            {post?.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 pb-4 mb-6 border-b">
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
            className="mx-auto prose prose-lg prose-blue"
            dangerouslySetInnerHTML={{ __html: post?.description || '' }}
          />

          {/* Social Sharing */}
          <div className="flex justify-center mt-6">
            <div className="flex gap-4 rounded-2xl border p-1 w-[40%] justify-center">
              {['👍', '💬', '🔗', '📩'].map((icon, index) => (
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
  )
}

export default ReadPost
