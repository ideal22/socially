import { FC } from "react";
import { LikeButton } from "./like-button";
import { CommentButton } from "./comment-button";

interface Props {
  postId: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  showCommentButton?: boolean;
  onCommentClick?: () => void;
  showComments?: boolean;
}

export const PostActions: FC<Props> = ({
  postId,
  likesCount,
  commentsCount,
  isLiked,
  showCommentButton = false,
  onCommentClick,
  showComments = false,
}) => {
  return (
    <div className="flex items-center gap-4 border-t pt-4">
      <LikeButton isLiked={isLiked} likesCount={likesCount} postId={postId} />
      {showCommentButton && (
        <CommentButton
          onClick={onCommentClick || (() => {})}
          showComments={showComments}
          commentsCount={commentsCount}
        />
      )}
    </div>
  );
};
