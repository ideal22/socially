import { getPosts } from "@/entities/actions/post.action";
import { getDbUserId } from "@/entities/actions/user.actions";
import PostCard from "./post-card";

export const PostFeed = async () => {
  const posts = await getPosts();
  const dbUserId = await getDbUserId();
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} dbUserId={dbUserId!} />
      ))}
    </div>
  );
};
