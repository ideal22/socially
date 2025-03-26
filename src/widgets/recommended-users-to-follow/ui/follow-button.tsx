"use client";
import { toggleFollow } from "@/entities/actions/user.actions";
import { Button } from "@/shared/ui/button";
import { Loader2Icon } from "lucide-react";
import { FC, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  userId: string;
}

export const FollowButton: FC<Props> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      await toggleFollow(userId);

      toast.success("Followed successfully");
    } catch (e) {
      toast.error("Error while following user");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      className="w-20"
      onClick={handleFollow}
      size="sm"
      variant="secondary"
    >
      {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : "Follow"}
    </Button>
  );
};
