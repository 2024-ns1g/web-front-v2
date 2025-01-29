import { SessionInfo } from "@/types/session/session-info";
import { SessionState } from "@/types/session/session-state";
import { toast } from "react-toastify";
import { useLogger } from "./use-logger";
import { presenterWsMoveToFirstSlideMessage, presenterWsMoveToFirstSlideMessageSchema } from "@/types/session/ws-message/presenter/move-to-first-slide-message";
import { presenterWsMoveToLastSlideMessage, presenterWsMoveToLastSlideMessageSchema } from "@/types/session/ws-message/presenter/move-to-last-slide-message";
import { presenterWsChangeCurrentPageMessage, presenterWsChangeCurrentPageMessageSchema } from "@/types/session/ws-message/presenter/change-current-page-message";
import { presenterWsTriggerNextEventMessage, presenterWsTriggerNextEventMessageSchema } from "@/types/session/ws-message/presenter/trigger-next-event-message";
import { presenterWsTriggerPrevEventMessage, presenterWsTriggerPrevEventMessageSchema } from "@/types/session/ws-message/presenter/trigger-prev-event-message";

export const usePresenterOperation = (
  wsSender: (message: any) => void,
  sessionInfo: SessionInfo | null,
  state: SessionState | null,
) => {

  const log = useLogger("presenter-operation");

  /**
  * 次のスライドに移動
  */
  const changeToNextSlide = () => {
    const currentSlideIndex = getCurrentSlideIndex(state);
    const nextSlideIndex = currentSlideIndex + 1;
    jumpToSlide(nextSlideIndex);
  };

  /**
  * 前のスライドに移動
  */
  const changeToPreviousSlide = () => {
    const currentSlideIndex = getCurrentSlideIndex(state);
    const prevSlideIndex = currentSlideIndex - 1;
    jumpToSlide(prevSlideIndex);
  };

  /**
  * 次のイベントをトリガー
  */
  const triggerNextEvent = () => {
    const message = {
      requestType: "TRIGGER_NEXT_EVENT",
      data: {}
    } as presenterWsTriggerNextEventMessage;

    try {
      presenterWsTriggerNextEventMessageSchema.parse(message);
      wsSender(message);
    } catch (e) {
      log.error(`Failed to send message: ${e}`);
      toast.error("イベントのトリガーに失敗しました");
    }
  };

  /**
  * 前のイベントをトリガー
  */
  const triggerPrevEvent = () => {
    const message = {
      requestType: "TRIGGER_PREV_EVENT",
      data: {}
    } as presenterWsTriggerPrevEventMessage;

    try {
      presenterWsTriggerPrevEventMessageSchema.parse(message);
      wsSender(message);
    } catch (e) {
      log.error(`Failed to send message: ${e}`);
      toast.error("イベントのトリガーに失敗しました");
    }
  };

  /**
  * 指定したスライドにジャンプ
  *
  * @param slideIndex スライドのインデックス
  */
  const jumpToSlide = (slideIndex: number) => {
    if (!validateSlideIndex(sessionInfo, slideIndex)) {
      log.error(`Invalid slide index: ${slideIndex}`);
      toast.error("指定されたスライドが存在しません");
      return;
    }

    if (getCurrentSlideIndex(state) === slideIndex) {
      log.info(`Already at slide ${slideIndex}`);
      return;
    }

    log.info(`Jump to slide ${slideIndex}`);
    const message = {
      requestType: "CHANGE_CURRENT_PAGE",
      data: {
        newPageIndex: slideIndex
      }
    } as presenterWsChangeCurrentPageMessage;

    try {
      presenterWsChangeCurrentPageMessageSchema.parse(message);
      wsSender(message);
    } catch (e) {
      log.error(`Failed to send message: ${e}`);
      toast.error("スライドの移動に失敗しました");
    }
  };

  /**
  * 最初のスライドにジャンプ
  */
  const jumpToFistSlide = () => {
    const message = {
      requestType: "MOVE_TO_FIRST_SLIDE",
      data: {}
    } as presenterWsMoveToFirstSlideMessage;

    try {
      presenterWsMoveToFirstSlideMessageSchema.parse(message);
      wsSender(message);
    } catch (e) {
      log.error(`Failed to send message: ${e}`);
      toast.error("スライドの移動に失敗しました");
    }
  };

  /**
  * 最後のスライドにジャンプ
  */
  const jumpToLastSlide = () => {
    const message = {
      requestType: "MOVE_TO_LAST_SLIDE",
      data: {}
    } as presenterWsMoveToLastSlideMessage;

    try {
      presenterWsMoveToLastSlideMessageSchema.parse(message);
      wsSender(message);
    } catch (e) {
      log.error(`Failed to send message: ${e}`);
      toast.error("スライドの移動に失敗しました");
    }
  };

  return {
    changeToNextSlide,
    changeToPreviousSlide,
    triggerNextEvent,
    triggerPrevEvent,
    jumpToSlide,
    jumpToFistSlide,
    jumpToLastSlide
  };
};


const getCurrentSlideIndex = (state: SessionState | null) => {
  if (!state) {
    throw new Error("state is not initialized");
  } else {
    return state.currentPage;
  }
}

const validateSlideIndex = (sessionInfo: SessionInfo | null, slideIndex: number) => {
  if (!sessionInfo) {
    throw new Error("sessionInfo is not initialized");
  } else if (slideIndex < 0 || slideIndex >= sessionInfo.pages.length) {
    return false;
  } else {
    return true;
  }
}
