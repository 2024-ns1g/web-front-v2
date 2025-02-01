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
        <div>
          <Progress value={(currentPageIndexNumber / totalPageNumber) * 100} />
        </div>

        <div className="flex flex-row items-center justify-between pt-3">
          <div className="flex flex-col items-left pt-3">
            <div className="flex flex-row items-center">
              <p className="text-sm text-gray-600">{slideTitle}</p>
              <FaAngleRight size={12} className="text-gray-600 ml-2" />
            </div>
            <p className="text-lg ml-8 text-gray-900">{currentPageTitle}</p>
          </div>

          <div className="flex flex-col items-center justify-between pt-3">
            <div>
              <p className="text-sm text-gray-600">{currentPageIndexNumber} / {totalPageNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">{currentPageCurrentStepNumber} / {currentPageTotalStepNumber}</p>
            </div>
          </div>
        </div>

      </CardBody>
    </Card>
  );
};
