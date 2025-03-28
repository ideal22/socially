"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { useState } from "react";

import { Card, CardContent } from "@/shared/ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/shared/ui/avatar";
import { formatDistanceToNow } from "date-fns";

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
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex space-x-3 sm:space-x-4">
            <Link href={`/profile/${post.author.username}`}>
              <Avatar className="size-8 sm:w-10 sm:h-10">
                <AvatarImage src={post.author.image ?? "/avatar.png"} />
              </Avatar>
            </Link>

            {/* POST HEADER & TEXT CONTENT */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 truncate">
                  <Link
                    href={`/profile/${post.author.username}`}
                    className="font-semibold truncate"
                  >
                    {post.author.name}
                  </Link>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Link href={`/profile/${post.author.username}`}>
                      @{post.author.username}
                    </Link>
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(new Date(post.createdAt))} ago
                    </span>
                  </div>
                </div>

                {dbUserId === post.author.id && (
                  <DeleteAlertDialog postId={post.id} />
                )}
              </div>
              <h1 className="text-lg font-semibold mb-2">{post.title}</h1>
              <p className="mt-2 text-sm text-foreground break-words">
                {post.content}
              </p>
            </div>
          </div>

          {post.image && <PostImage postId={post.id} image={post.image} />}

          <div className="flex items-center pt-2 space-x-4">
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
          </div>

          {/* COMMENTS SECTION */}
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
