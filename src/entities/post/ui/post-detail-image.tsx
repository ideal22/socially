import Image from "next/image";
import { FC } from "react";

interface Props {
  image: string;
  title: string;
}

export const PostDetailImage: FC<Props> = ({ image, title }) => {
  return (
    <div className="mb-6 relative w-full aspect-video max-h-[400px] overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover rounded-lg"
      />
    </div>
  );
};
