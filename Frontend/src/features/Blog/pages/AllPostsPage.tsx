import { FC } from 'react'
import { useNavigate } from 'react-router'
import { DUMMY_POSTS } from '@/constants'
import Container from '@/container/Container'
import { Button, Input } from '@/components'
// import { getAllPostsService } from "@/services/api/postApiServices";
// import { useQuery } from "@tanstack/react-query";

interface PostInterface {
  id: number
  image: string
  title: string
  date: string
  description: string
  author: string
  role: string
  category: string
}

const AllPostsPage: FC = () => {
  const navigate = useNavigate()
  // const {
  //   data: posts,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: getAllPostsService,
  //   refetchOnWindowFocus: false,
  //   gcTime: 1000 * 60 * 60 * 24, // 24 hours
  //   staleTime: 1000 * 60 * 60 * 24, // 24 hours
  // });

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  const handleReadPost = (id: string) => {
    navigate(`/posts/${id}`)
  }

  return (
    <Container>
      <div className="relative z-10 w-full p-4 my-16 bg-background md:p-8">
        <div className="absolute bottom-0 left-0 right-0 top-0 -z-1 bg-[radial-gradient(circle_300px_at_100%_200px,#d5c5ff,transparent)] sm:bg-[radial-gradient(circle_400px_at_50%_300px,#d5c5ff,transparent)] dark:bg-[radial-gradient(circle_400px_at_50%_300px,#4f388c,transparent)]"></div>
        {/* Header */}
        <h1 className="mb-6 text-3xl font-bold text-center md:text-4xl">
          Explore Community Stories
        </h1>

        {/* Search Bar */}
        <div className="relative flex justify-center mb-8">
          <Input
            type="text"
            placeholder="Search blogs, stories and more..."
            className="md:w-[30%] w-full bg-background text-muted-foreground"
          />
          {/* <div className="absolute flex items-center justify-center w-8 h-8 text-white rounded-full cursor-pointer bottom-2 right-2 bg-primary hover:bg-primary/80"></div> */}
        </div>

        <div className="flex items-center justify-center w-full mb-6 space-x-4">
          <Button variant={'outline'} className="w-full rounded-full md:w-auto">
            Followings
          </Button>
          <Button variant={'outline'} className="w-full rounded-full md:w-auto">
            Popular
          </Button>
          <Button variant={'outline'} className="w-full rounded-full md:w-auto">
            Latest
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-6">
          {/* Sidebar Filters */}
          {/* <FilterSidebar /> */}
          <div className="w-full "></div>

          {/* Posts List */}
          <div className="z-10 flex">
            <div className="w-full space-y-6 md:w-[80%] px-10">
              {DUMMY_POSTS.map((post: PostInterface) => (
                <div
                  key={post.id}
                  className="w-full p-4 space-y-4 transition border rounded-lg cursor-pointer bg-card sm:flex md:flex-row text-muted-foreground md:p-6 md:space-y-0 md:space-x-6 hover:shadow-md border-secondary/85 "
                  onClick={() => handleReadPost(post.id.toString())}
                >
                  {/* Post Image */}
                  <div className="w-full md:w-1/2">
                    <img
                      src={post.image}
                      alt="Post"
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>

                  {/* Post Content */}
                  <div className="flex flex-col justify-between w-full">
                    {/* Post Header */}
                    <div>
                      <h2 className="text-xl cursor-pointer font-sexmibold hover:underline">
                        {post.title}
                      </h2>

                      <div className="flex items-center mt-2 space-x-3 text-sm text-muted-foreground/70">
                        <span>{post.date}</span>
                        <span className="px-2 py-1 text-xs font-medium rounded-md bg-primary text-muted-foreground">
                          {post.category}
                        </span>
                      </div>

                      <p className="mt-3 text-sm text-muted-foreground/50 md:text-base">
                        {post.description}
                      </p>
                    </div>

                    {/* Author Section */}
                    <div className="flex items-center mt-4 space-x-3">
                      <img
                        src="https://randomuser.me/api/portraits"
                        alt="Author"
                        className="object-cover w-10 h-10 rounded-full"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground">
                          {post.author}
                        </h4>
                        <p className="text-xs text-muted-foreground/60">
                          {post.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-6">
                <button className="text-purple-600 hover:underline">
                  Previous
                </button>
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    className={`px-3 py-1 rounded-full ${
                      num === 1
                        ? 'bg-purple-600 text-white'
                        : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button className="px-3 py-1 text-gray-600 border rounded-full">
                  ...
                </button>
                <button className="px-3 py-1 text-gray-600 border rounded-full">
                  100
                </button>
                <button className="text-purple-600 hover:underline">
                  Next
                </button>
              </div>
            </div>
            <div className="hidden md:w-[20%] md:block md:h-[80%] border-secondary/85 border shadow-xs pl-4 rounded-lg">
              <div className="h-full p-4 space-y-6 ">
                <h3 className="font-medium text-wrap ">Top Writer ✨</h3>
                <div className="flex items-center space-x-3 cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1503104834685-7205e8607eb9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Top Writer"
                    className="object-cover w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      John Doe
                    </h4>
                    <p className="text-xs text-muted-foreground/60">
                      1000+ Followers
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1503104834685-7205e8607eb9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Top Writer"
                    className="object-cover w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      John Doe
                    </h4>
                    <p className="text-xs text-muted-foreground/60">
                      1000+ Followers
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1503104834685-7205e8607eb9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Top Writer"
                    className="object-cover w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground">
                      John Doe
                    </h4>
                    <p className="text-xs text-muted-foreground/60">
                      1000+ Followers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AllPostsPage
