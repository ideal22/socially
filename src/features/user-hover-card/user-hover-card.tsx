import { Avatar, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/ui/hover-card";
import { FC } from "react";

import { Post } from "@/entities/post";

interface Props {
  user: Post["author"];
}

export const UserHoverCard: FC<Props> = ({ user }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button variant="link" className="text-sm cursor-pointer p-0">
          {user.name}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="p-4 w-72 bg-white shadow-lg rounded-lg border border-gray-200 space-y-2">
        <Avatar className="w-12 h-12 cursor-pointer relative">
          <AvatarImage src={user.image || "/avatar.png"} />
        </Avatar>
        <div className="flex items-center space-x-2">
          <span className="text-md font-semibold">{user.name}</span>

          <span className="text-sm text-gray-500">he/him</span>
        </div>
        <div className="text-sm text-gray-500">
          {user._count?.followers} Followers
        </div>
        {user.bio && <p className="text-sm text-gray-700 mt-4">{user.bio}</p>}
        <Button className="mt-3 w-full text-sm font-semibold">Follow</Button>
      </HoverCardContent>
    </HoverCard>
  );
};
