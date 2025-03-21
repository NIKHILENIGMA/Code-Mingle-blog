import { FC } from "react";
import DashboardHeader from "../components/DashboardHeader";
// import FeaturePosts from "../components/FeaturePosts";
import RecentPosts from "../components/RecentPosts";
import Loader from "@/components/Loader/Loader";
import { useDashboard } from "../hooks/useDashboard";

const UserDashboard: FC = () => {
  const { user, isPending } = useDashboard();

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <div className="bg-background min-h-screen w-full">
          {/* Profile Header */}
          <DashboardHeader  user={user}/>

          {/* Main Content */}
          <main className="max-w-4xl mx-auto p-5">
            {/* Featured Posts */}
            {/* {user?.featurePosts && <FeaturePosts />} */}

            {/* Recent Posts */}
            <RecentPosts posts={user?.posts} />
          </main>
        </div>
      )}
    </>
  );
};

export default UserDashboard;
