import { FC } from "react";
import { HeaderProgressBar } from "./progress";
import { HeaderBreadcrumb } from "./breadcrumb";
import { HeaderActions } from "./actions";

interface HeaderProps {
  totalSlides: number;
  currentSlideIndex: number;
  sessionName: string;
  currentSlideName: string;
  activeVoteCount: number;
  isWsConnected: boolean;
  wsClickedHandler: () => void;
  voteClickedHandler: () => void;
};

export const Header: FC<HeaderProps> = ({
  totalSlides,
  currentSlideIndex,
  sessionName,
  currentSlideName,
  activeVoteCount,
  isWsConnected,
  wsClickedHandler,
  voteClickedHandler
}) => {
  return (
    <>
      <div className="flex flex-row gap-4 w-full justify-center px-4 py-4">
        <div className="container flex flex-row">
          <div className="flex flex-col flex-grow pr-6">
            <HeaderBreadcrumb sessionName={sessionName} currentSlideName={currentSlideName} />
            <HeaderProgressBar totalSlides={totalSlides} currentSlideIndex={currentSlideIndex} />
          </div>
          <HeaderActions isWsConnected={isWsConnected} voteCount={activeVoteCount} wsClickedHandler={wsClickedHandler} voteClickedHandler={voteClickedHandler} />
        </div>
      </div>
    </>
  );
};
