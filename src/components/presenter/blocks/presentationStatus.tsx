// プレゼンの進行状態を表示するコンポーネント

import { Button, Card, CardBody } from "@nextui-org/react";
import { FC } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

type PresenterBlockSessionStatusProps = {
  slideTitle: string;
  totalPageNumber: number;
  currentPageIndexNumber: number;
  currentPageTotalStepNumber: number;
  currentPageCurrentStepNumber: number;
  currentPageTitle: string;
};

export const PresenterBlockSessionStatus: FC<PresenterBlockSessionStatusProps> = ({
  slideTitle,
  totalPageNumber,
  currentPageIndexNumber,
  currentPageTotalStepNumber,
  currentPageCurrentStepNumber,
  currentPageTitle
}) => {
  return (
    <Card className="w-full">
      <CardBody>
        <div className="flex justify-between">
          <div>
            <p>{slideTitle}</p>
            <p>{currentPageIndexNumber} / {totalPageNumber}</p>
          </div>
          <p>{currentPageTitle}</p>
        </div>
      </CardBody>
    </Card>
  );
};
