// ページのスクリプトを表示するブロック

import { Card, CardBody } from "@nextui-org/react";
import { FC } from "react";

type PresenterBlockPageScriptProps = {
  script: string;
};

export const PresenterBlockPageScript: FC<PresenterBlockPageScriptProps> = ({
  script
}) => {
  return (
    <Card className="w-full">
      <CardBody>
        {script}
      </CardBody>
    </Card>
  );
}
