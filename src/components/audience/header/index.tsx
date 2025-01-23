import { FC } from "react";
import { HeaderProgressBar } from "./progress";
import { HeaderBreadcrumb } from "./breadcrumb";

interface HeaderProps {
  totalSlides: number;
  currentSlideIndex: number;
  sessionName: string;
  currentSlideName: string;
};

export const Header: FC<HeaderProps> = ({
  totalSlides,
  currentSlideIndex,
  sessionName,
  currentSlideName
}) => {
  return (
    <>
      <HeaderBreadcrumb sessionName={sessionName} currentSlideName={currentSlideName} />
      <HeaderProgressBar totalSlides={totalSlides} currentSlideIndex={currentSlideIndex} />
    </>
  );
};
