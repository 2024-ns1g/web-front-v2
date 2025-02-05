import { Progress } from "@nextui-org/react";
import { FC } from "react";

interface HeaderProgressBarProps {
  totalSlides: number;
  currentSlideIndex: number;
};

export const HeaderProgressBar: FC<HeaderProgressBarProps> = ({
  totalSlides,
  currentSlideIndex,
}) => {
  return (
    <Progress value={(currentSlideIndex + 1 / totalSlides) * 100} />
  );
};
