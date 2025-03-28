"use client";
import { Button } from "@/shared/ui/button";
import { MessageCircleIcon } from "lucide-react";
import { FC } from "react";

interface Props {
  onClick: () => void;
  showComments: boolean;
  commentsCount: number;
}
export const CommentButton: FC<Props> = ({
  onClick,
  showComments,
  commentsCount,
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground gap-2 hover:text-blue-500"
      onClick={onClick}
    >
      <MessageCircleIcon
        className={`size-5 ${showComments ? "fill-blue-500 text-blue-500" : ""}`}
      />
      <span>{commentsCount}</span>
    </Button>
  );
};
