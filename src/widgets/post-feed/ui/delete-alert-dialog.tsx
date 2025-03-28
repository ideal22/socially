"use client";

import { Loader2Icon, Trash2Icon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import { FC, useState } from "react";
import { deletePost } from "@/entities/actions/post.action";
import toast from "react-hot-toast";

interface Props {
  postId: string;
}

export const DeleteAlertDialog: FC<Props> = ({ postId }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePost = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deletePost(postId);
      if (result.success) toast.success("Post deleted successfully");
      else throw new Error(result.error);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-red-500 -mr-2"
        >
          {isDeleting ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <Trash2Icon className="size-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Post</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeletePost}
            className="bg-red-500 hover:bg-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
