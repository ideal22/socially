"use client";
import { createComment } from "@/entities/actions/post.action";
import { Avatar, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Textarea } from "@/shared/ui/textarea";
import { SendIcon } from "lucide-react";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  postId: string;
  userImage?: string;
}

export const PostCommentsForm: FC<Props> = ({ postId, userImage }) => {
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const handleAddComment = async () => {
    if (!newComment.trim() || isCommenting) return;
    try {
      setIsCommenting(true);
      const result = await createComment(postId, newComment);
      if (result?.success) {
        toast.success("Comment posted successfully");
        setNewComment("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add comment");
    } finally {
      setIsCommenting(false);
    }
  };
  return (
    <div className="flex space-x-3">
      <Avatar className="size-8 flex-shrink-0">
        <AvatarImage src={userImage || "/avatar.png"} />
      </Avatar>
      <div className="flex-1">
        <Textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[80px] resize-none"
        />
        <div className="flex justify-end mt-2">
          <Button
            size="sm"
            onClick={handleAddComment}
            className="flex items-center gap-2"
            disabled={!newComment.trim() || isCommenting}
          >
            {isCommenting ? (
              "Posting..."
            ) : (
              <>
                <SendIcon className="size-4" />
                Comment
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
