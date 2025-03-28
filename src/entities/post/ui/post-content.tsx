import { FC } from "react";

interface Props {
  content: string;
}

export const PostContent: FC<Props> = ({ content }) => {
  return (
    <div className="prose prose-lg dark:prose-invert mb-8 max-w-none">
      <p className="whitespace-pre-wrap break-words">{content}</p>
    </div>
  );
};
