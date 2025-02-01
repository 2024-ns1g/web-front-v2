// ボタンでスライドを移動するためのコンポーネント

import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import { FC } from "react";
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

type PresenterBlockDirectSeekSlideProps = {
  canSeekPrev: boolean;
  canSeekNext: boolean;
  onSeekPrev: () => void;
  onSeekNext: () => void;
};

export const PresenterBlockDirectSeekSlide: FC<PresenterBlockDirectSeekSlideProps> = ({
  canSeekPrev,
  canSeekNext,
  onSeekPrev,
  onSeekNext
}) => {
  return (
    <Card className="w-full">
      <CardBody>
        <div className="flex justify-between">
          <div className="flex gap-4 flex-grow justify-start">
            <Button isIconOnly disabled={!canSeekPrev} onPress={onSeekPrev} size="lg">
              <FaAnglesLeft />
            </Button>
            <Button isIconOnly disabled={!canSeekPrev} onPress={onSeekPrev} size="lg">
              <FaAngleLeft />
            </Button>
          </div>
          <div className="flex items-center h-full shrink">
            <Divider className="h-4/5" orientation="vertical"/>
          </div>
          <div className="flex gap-4 flex-grow justify-end">
            <Button isIconOnly disabled={!canSeekNext} onPress={onSeekNext} size="lg">
              <FaAngleRight />
            </Button>
            <Button isIconOnly disabled={!canSeekPrev} onPress={onSeekPrev} size="lg">
              <FaAnglesRight />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
