// ページのスクリプトを表示するブロック

import { Card, CardBody } from "@nextui-org/react";
import { FC } from "react";
import Markdown from "react-markdown";

type PresenterBlockPageScriptProps = {
  script: string;
};

export const PresenterBlockPageScript: FC<PresenterBlockPageScriptProps> = ({
  script
}) => {
  return (
    <Card className="w-full">
      <Markdown className="markdown">{script}</Markdown>
    </Card>
  );
}
