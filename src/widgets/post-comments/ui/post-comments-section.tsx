import { FC } from "react";
import { CommentsList } from "@/entities/post";
import { PostCommentsForm } from "@/features/post-comments-form";
import { Comments } from "@/entities/post/model";

interface Props {
  comments: Comments;
  commentsCount: number;
  postId: string;
  userImage?: string;
  dbUserId: string | null;
}

export const PostCommentsSection: FC<Props> = ({
  comments,
  commentsCount,
  postId,
  userImage,
  dbUserId,
}) => {
  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-xl font-semibold">Comments ({commentsCount})</h2>
      <CommentsList comments={comments} />
      {dbUserId && (
        <PostCommentsForm
          postId={postId}
          userImage={userImage || "/avatar.png"}
        />
      )}
    </div>
  );
};
