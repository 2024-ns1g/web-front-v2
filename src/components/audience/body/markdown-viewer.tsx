import { Card } from "@nextui-org/react";
import { FC } from "react";
import Markdown from "react-markdown";

interface BodyMarkdownViewerProps {
  content: string;
};

export const BodyMarkdownViewer: FC<BodyMarkdownViewerProps> = ({
  content
}) => {
  return (
    <Card className="p-4">
      <Markdown className="markdown">{content}</Markdown>
    </Card>
  );
};
