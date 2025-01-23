import { FC } from "react";
import { HeaderProgressBar } from "./progress";
import { HeaderBreadcrumb } from "./breadcrumb";
import { HeaderActions } from "./actions";

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
      <div className="flex flex-row gap-4 w-full justify-center px-4">
        <div className="container flex flex-row">
          <div className="flex flex-col flex-grow">
            <HeaderBreadcrumb sessionName={sessionName} currentSlideName={currentSlideName} />
            <HeaderProgressBar totalSlides={totalSlides} currentSlideIndex={currentSlideIndex} />
          </div>
          <HeaderActions isWsConnected={true} voteCount={0} wsClickedHandler={() => { }} voteClickedHandler={() => { }} />
        </div>
      </div>
    </>
  );
};
