import { Avatar, AvatarImage } from "@/shared/ui/avatar";

import { formatDistanceToNow } from "date-fns";
import { FC } from "react";
import { Comments } from "../model";

interface Props {
  comments: Comments;
}
export const CommentsList: FC<Props> = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex space-x-3">
          <Avatar className="size-8 flex-shrink-0">
            <AvatarImage src={comment.author.image ?? "/avatar.png"} />
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-medium text-sm">{comment.author.name}</span>
              <span className="text-sm text-muted-foreground">
                @{comment.author.username}
              </span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt))} ago
              </span>
            </div>
            <p className="text-sm break-words">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
