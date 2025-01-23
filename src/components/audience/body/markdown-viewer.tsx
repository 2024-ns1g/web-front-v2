import { FC } from "react";
import Markdown from "react-markdown";

interface BodyMarkdownViewerProps {
  content: string;
};

export const BodyMarkdownViewer: FC<BodyMarkdownViewerProps> = ({
  content
}) => {
  return (
    <Markdown className="markdown">{content}</Markdown>
  );
};
