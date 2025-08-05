import { FC } from "react";
import DashboardHeader from "../components/DashboardHeader";
import RecentPosts from "../components/RecentPosts";
import Loader from "@/components/Loader/Loader";
import { useDashboard } from "../hooks/useDashboard";

const UserDashboard: FC = () => {
  const { user, isPending } = useDashboard();

  return (
    <>
      {isPending ? (
        <Loader size={10} />
      ) : (
        <div className="w-full min-h-screen bg-background">
          {/* Profile Header */}
          <DashboardHeader  user={user}/>

          {/* Main Content */}
          <main className="max-w-4xl p-5 mx-auto">
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
