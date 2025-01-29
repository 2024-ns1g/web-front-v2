import { SessionState } from "@/types/session/session-state";

export const usePresenterOperation = (
  wsSender: (message: any) => void,
  state: SessionState | null,
  updateState: (state: Partial<SessionState>) => void,
) => {

  /**
  * 次のスライドに移動
  */
  const changeToNextSlide = () => {
  };

  /**
  * 前のスライドに移動
  */
  const changeToPreviousSlide = () => {
  };

  /**
  * 指定したスライドにジャンプ
  *
  * @param slideIndex スライドのインデックス
  */
  const jumpToSlide = (slideIndex: number) => {
  };

  /**
  * 最初のスライドにジャンプ
  */
  const jumpToFistSlide = () => {
  };

  /**
  * 最後のスライドにジャンプ
  */
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
