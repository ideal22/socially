import { getPostById } from "@/entities/actions/post.action";
import { FC } from "react";

interface Props {
  params: Promise<{ postId: string }>;
}
export const generateMetadata = async ({ params }: Props) => {
  const { postId } = await params;
  const post = await getPostById(postId);

  return {
    title: "Post - " + post?.content,
    description: post?.content,
  };
};

const PostPage: FC<Props> = async ({ params }) => {
  const { postId } = await params;
  const post = await getPostById(postId);

  console.log(post);
  return <div>PostPAge</div>;
};

export default PostPage;
