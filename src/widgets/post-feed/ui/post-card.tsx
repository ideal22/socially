"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { useState } from "react";

import { Card, CardContent } from "@/shared/ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/shared/ui/avatar";
import { format } from "date-fns";

import { Button } from "@/shared//ui/button";
import { HeartIcon, LogInIcon } from "lucide-react";

import { DeleteAlertDialog } from "./delete-alert-dialog";
import {
  CommentButton,
  CommentsList,
  LikeButton,
  Post,
  PostImage,
} from "@/entities/post";
import { PostCommentsForm } from "@/features/post-comments-form";
import { UserHoverCard } from "@/features/user-hover-card";

export const PostCard = ({
  post,
  dbUserId,
}: {
  post: Post;
  dbUserId: string | null;
}) => {
  const { user } = useUser();

  const [showComments, setShowComments] = useState(false);

  return (
    <Card className="py-0">
      <CardContent className="p-4 sm:p-4">
        <div className="space-y-4">
          <div className="space-y-3 sm:space-y-4">
            <Link
              href={`/profile/${post.author.username}`}
              className="flex gap-3 items-center"
            >
              <Avatar className="size-6 sm:w-5 sm:h-5">
                <AvatarImage src={post.author.image ?? "/avatar.png"} />
              </Avatar>
              <UserHoverCard user={post.author} />
            </Link>

            <div className="flex space-x-4">
              <div>
                <h1 className="text-lg font-semibold mb-1">{post.title}</h1>
                <p className="text-sm line-clamp-3">{post.content}</p>
              </div>
              {post.image && <PostImage postId={post.id} image={post.image} />}
            </div>
          </div>

          <div className="flex items-center pt-2 space-x-1 relative w-full">
            <span className="text-[12px] text-muted-foreground">
              {format(new Date(post.createdAt), "MMM d")}
            </span>
            {user ? (
              <LikeButton
                isLiked={post.likes.some((like) => like.userId === dbUserId)}
                likesCount={post._count.likes}
                postId={post.id}
              />
            ) : (
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground gap-2"
                >
                  <HeartIcon className="size-5" />
                </Button>
              </SignInButton>
            )}

            <CommentButton
              onClick={() => setShowComments((prev) => !prev)}
              showComments={showComments}
              commentsCount={post.comments.length}
            />
            <div className="absolute right-0">
              {dbUserId === post.author.id && (
                <DeleteAlertDialog postId={post.id} />
              )}
            </div>
          </div>

          {showComments && (
            <div className="space-y-4 pt-4 border-t">
              <CommentsList comments={post.comments} />

              {user ? (
                <PostCommentsForm postId={post.id} userImage={user.imageUrl} />
              ) : (
                <div className="flex justify-center p-4 border rounded-lg bg-muted/50">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="gap-2">
                      <LogInIcon className="size-4" />
                      Sign in to comment
                    </Button>
                  </SignInButton>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default PostCard;
