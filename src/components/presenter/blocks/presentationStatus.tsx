// プレゼンの進行状態を表示するコンポーネント

import { Button, Card, CardBody, Progress } from "@nextui-org/react";
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
        <div className="flex items-center pb-3">
          <p className="text-sm text-gray-600">{slideTitle}</p>
          <FaAngleRight size={12} />
          <p className="text-lg text-gray-900">{currentPageTitle}</p>
        </div>
        <div className="grid grid-cols-[1fr_max-content] items-center">
          <Progress className="" value={(currentPageIndexNumber / totalPageNumber) * 100} />
          <p className="text-sm text-gray-600 ml-3 text-right">{currentPageIndexNumber} / {totalPageNumber}</p>
          <Progress className="" value={(currentPageCurrentStepNumber / currentPageTotalStepNumber) * 100} />
          <p className="text-sm text-gray-600 ml-3 text-right">{currentPageCurrentStepNumber} / {currentPageTotalStepNumber}</p>
        </div>

      </CardBody>
    </Card>
  );
};
