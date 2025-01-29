// ボタンでスライドを移動するためのコンポーネント

import { Button, Card, CardBody } from "@nextui-org/react";
import { FC } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

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
    <Card>
      <CardBody>
        <div className="flex justify-between">
          <Button isIconOnly disabled={!canSeekPrev} onPress={onSeekPrev}>
            <FaAngleLeft />
          </Button>
          <Button isIconOnly disabled={!canSeekNext} onPress={onSeekNext}>
            <FaAngleRight />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
