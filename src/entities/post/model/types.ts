import { getPosts } from "@/entities/actions/post.action";

export type Posts = Awaited<ReturnType<typeof getPosts>>;
export type Post = Posts[number];
export type Comments = Post["comments"];
