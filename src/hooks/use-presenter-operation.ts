import { SessionState } from "http2";

export const usePresenterOperation = (
  wsSender: (message: any) => void,
  state: SessionState | null,
  updateState: (state: Partial<SessionState>) => void,
) => {

  const changeToNextSlide = () => {
  };

  const changeToPreviousSlide = () => {
  };

  const jumpToSlide = (slideIndex: number, smart: boolean = true) => {
  };

  const jumpToFistSlide = () => {
  };

  const jumpToLastSlide = () => {
  };

  return {
    changeToNextSlide,
    changeToPreviousSlide,
    jumpToSlide,
    jumpToFistSlide,
    jumpToLastSlide
  };
};
