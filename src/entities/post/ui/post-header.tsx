import { Avatar, AvatarImage } from "@/shared/ui/avatar";
import { format } from "date-fns";
import Link from "next/link";
import { FC } from "react";
import { UserHoverCard } from "@/features/user-hover-card";
import { Post } from "../model";

interface Props {
  author: Post["author"];
  createdAt: Date;
}

export const PostHeader: FC<Props> = ({ author, createdAt }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <Link href={`/profile/${author.username}`}>
        <Avatar className="size-10">
          <AvatarImage src={author.image ?? "/avatar.png"} />
        </Avatar>
      </Link>
      <div>
        <UserHoverCard user={author} />
        <p className="text-sm text-muted-foreground">
          {format(createdAt, "MMMM d, yyyy")}
        </p>
      </div>
    </div>
  );
};
