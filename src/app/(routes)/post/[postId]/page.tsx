import { getDbUserId } from "@/entities/actions/user.actions";
import { getPostById } from "@/entities/actions/post.action";
import { Card, CardContent } from "@/shared/ui/card";
import { FC, Suspense } from "react";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  PostHeader,
  PostDetailImage,
  PostContent,
  PostActions,
} from "@/entities/post";
import { PostCommentsSection } from "@/widgets/post-comments";

interface Props {
  params: Promise<{ postId: string }>;
}
export const generateMetadata = async ({ params }: Props) => {
  const { postId } = await params;
  const post = await getPostById(postId);

  return {
    title: post?.title || "Post",
    description: post?.content,
  };
};

const PostPage: FC<Props> = async ({ params }) => {
  const { postId } = await params;
  const post = await getPostById(postId);
  const dbUserId = await getDbUserId();

  if (!post) {
    return <div className="container py-10">Post not found</div>;
  }

  return (
    <div className="container max-w-4xl py-10">
      <Card>
        <CardContent className="p-6">
          <Suspense fallback={<Skeleton className="h-16 w-full" />}>
            <PostHeader
              author={post.author}
              createdAt={new Date(post.createdAt)}
            />
          </Suspense>

          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          {post.image && (
            <Suspense
              fallback={<Skeleton className="h-[400px] w-full rounded-lg" />}
            >
              <PostDetailImage image={post.image} title={post.title} />
            </Suspense>
          )}

          <PostContent content={post.content!} />

          <PostActions
            postId={post.id}
            isLiked={post.likes.some((like) => like.userId === dbUserId)}
            likesCount={post._count.likes}
            commentsCount={post._count.comments}
            showCommentButton={false}
          />

          <Suspense fallback={<Skeleton className="h-40 w-full" />}>
            <PostCommentsSection
              comments={post.comments}
              commentsCount={post._count.comments}
              postId={post.id}
              userImage={post.author.image!}
              dbUserId={dbUserId!}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostPage;
