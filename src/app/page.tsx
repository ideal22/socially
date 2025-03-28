import { CreatePost } from "@/features/create-post/ui";
import { PostFeed } from "@/widgets/post-feed/ui";
import { RecommendedUsersToFollow } from "@/widgets/recommended-users-to-follow/ui";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-8">
      <div className="lg:col-span-6">
        {user && <CreatePost />}

        <PostFeed />
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <RecommendedUsersToFollow />
      </div>
    </div>
  );
}
