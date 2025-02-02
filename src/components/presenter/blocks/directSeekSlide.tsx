// ボタンでスライドを移動するためのコンポーネント

import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import { FC } from "react";
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

type PresenterBlockDirectSeekSlideProps = {
  canSeekPrevStep: boolean;
  canSeekNextStep: boolean;
  canSeekPrevPage: boolean;
  canSeekNextPage: boolean;
  onSeekPrevStep: () => void;
  onSeekNextStep: () => void;
  onSeekPrevPage: () => void;
  onSeekNextPage: () => void;
};

export const PresenterBlockDirectSeekSlide: FC<PresenterBlockDirectSeekSlideProps> = ({
  canSeekPrevStep,
  canSeekNextStep,
  canSeekPrevPage,
  canSeekNextPage,
  onSeekPrevStep,
  onSeekNextStep,
  onSeekPrevPage,
  onSeekNextPage,
}) => {
  return (
    <Card className="w-full">
      <CardBody>
        <div className="flex justify-between">
          <div className="flex gap-4 flex-grow justify-center">
            <Button isIconOnly disabled={!canSeekPrevPage} onPress={onSeekPrevPage} size="lg">
              <FaAnglesLeft />
            </Button>
            <Button isIconOnly disabled={!canSeekPrevStep} onPress={onSeekPrevStep} size="lg">
              <FaAngleLeft />
            </Button>
          </div>
          <div className="flex items-center h-full shrink">
            <Divider className="h-4/5" orientation="vertical"/>
          </div>
          <div className="flex gap-4 flex-grow justify-center">
            <Button isIconOnly disabled={!canSeekNextStep} onPress={onSeekNextStep} size="lg">
              <FaAngleRight />
            </Button>
            <Button isIconOnly disabled={!canSeekNextPage} onPress={onSeekNextPage} size="lg">
              <FaAnglesRight />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
