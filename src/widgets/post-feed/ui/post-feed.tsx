import { getPosts } from "@/entities/actions/post.action";
import { getDbUserId } from "@/entities/actions/user.actions";

export const PostFeed = async () => {
  const posts = await getPosts();
  const dbUserId = await getDbUserId();
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id}>{post.content}</div>
      ))}
    </div>
  );
};
