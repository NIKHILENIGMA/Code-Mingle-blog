import { FC } from 'react'

type Post = {
  id: string
  post_img: string
  post_title: string
  post_description: string
  post_likes: number
  post_comments: number
  post_date: string
}

const FEATURE_POSTS: Post[] = [
  {
    id: 'clrh8k3xj0000abc123def456',
    post_img:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D',
    post_title: 'Understanding React Hooks',
    post_description:
      'A deep dive into the world of React Hooks and their benefits.',
    post_likes: 150,
    post_comments: 30,
    post_date: '2025-01-01',
  },
  {
    id: 'clrh8k3xj0001xyz789ghi012',
    post_img:
      'https://images.unsplash.com/photo-1542435503-956c469947f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxvZ3xlbnwwfHwwfHx8MA%3D%3D',
    post_title: 'Mastering CSS Grid',
    post_description: 'Exploring the power of CSS Grid for better layouts.',
    post_likes: 120,
    post_comments: 45,
    post_date: '2025-01-05',
  },
]

const FeaturePosts: FC = () => {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Featured Posts</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {FEATURE_POSTS.map((post: Post) => (
          <div
            key={post.id}
            className="p-4 transition bg-white rounded-lg shadow-lg hover:shadow-xl"
          >
            <img
              src={`${post.post_img}`}
              alt={post.post_title}
              className="object-cover w-full h-40 rounded-lg"
            />
            <h3 className="mt-2 text-lg font-semibold">{post.post_title}</h3>
            <p className="text-sm text-gray-600">{post.post_description}</p>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>👍 {post.post_likes} Likes</span>
              <span>💬 {post.post_comments} Comments</span>
              <span>📅 {post.post_date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturePosts
