import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  postId: string;
  image: string;
}

export const PostImage: FC<Props> = ({ postId, image }) => {
  return (
    <div className="flex-shrink-0">
      <Link href={`/post/${postId}`}>
        <Image
          src={image}
          alt="Post content"
          className="object-cover rounded-lg"
          width={200}
          height={200}
        />
      </Link>
    </div>
  );
};
