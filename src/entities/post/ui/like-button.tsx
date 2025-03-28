"use client";
import { toggleLike } from "@/entities/actions/post.action";
import { Button } from "@/shared/ui/button";
import { HeartIcon } from "lucide-react";
import React, { FC, useState } from "react";

interface Props {
  likesCount: number;
  isLiked: boolean;
  postId: string;
}

export const LikeButton: FC<Props> = ({ isLiked, likesCount, postId }) => {
  const [optimisticLikes, setOptmisticLikes] = useState(likesCount);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(isLiked);

  const handleLike = async () => {
    if (isLiking) return;
    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setOptmisticLikes((prev) => prev + (hasLiked ? -1 : 1));
      await toggleLike(postId);
    } catch (error) {
      console.error(error);
      setOptmisticLikes(likesCount);
      setHasLiked(isLiked);
    } finally {
      setIsLiking(false);
    }
  };
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`text-muted-foreground gap-2 ${
        hasLiked ? "text-red-500 hover:text-red-600" : "hover:text-red-500"
      }`}
      onClick={handleLike}
    >
      {hasLiked ? (
        <HeartIcon className="size-5 fill-current" />
      ) : (
        <HeartIcon className="size-5" />
      )}
      <span>{optimisticLikes}</span>
    </Button>
  );
};
