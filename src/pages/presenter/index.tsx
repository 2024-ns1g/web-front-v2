import { PresenterBlockDirectSeekSlide } from "@/components/presenter/blocks/directSeekSlide";
import { PresenterBlockPageScript } from "@/components/presenter/blocks/pageScript";
import { PresenterBlockSessionStatus } from "@/components/presenter/blocks/presentationStatus";
import { usePresenterContext } from "@/contexts/presenter-context";
import { usePresenterOperation } from "@/hooks/use-presenter-operation";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useState, useEffect } from "react";
import { SessionInfo } from "@/types/session/session-info";

export default function PresenterIndexPage() {
  // コンテキストやWS送信用関数を呼び出し
  const presenterContext = usePresenterContext();
  const wsSender = presenterContext.sendWsMessage;

  // sessionInfo は Promise の可能性があるので、Stateに落とし込む
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);

  // state も後ほど参照するので取得
  const sessionState = presenterContext.state;

  // 初期マウント時に sessionInfo を async で取得して setState
  useEffect(() => {
    (async () => {
      const info = await presenterContext.sessionInfo;
      setSessionInfo(info);
    })();
  }, [presenterContext]);

  // sessionInfo や sessionState がまだ準備できていない場合はガード
  if (!sessionInfo || !sessionState) {
    return <div>Loading...</div>;
  }

  // 準備ができたらPresenter機能を呼び出す
  const presenterOperation = usePresenterOperation(wsSender, sessionInfo, sessionState);

  return (
    <>
      <h1 className="text-4xl">Presenter</h1>
      <ResponsiveMasonry className="flex justify-center px-4">
        <Masonry className="container">
          <PresenterBlockDirectSeekSlide
            canSeekNextPage={presenterOperation.canChangeToNextPage()}
            canSeekPrevPage={presenterOperation.canChangeToPrevPage()}
            canSeekNextStep={presenterOperation.canChangeToNextStep()}
            canSeekPrevStep={presenterOperation.canChangeToPrevStep()}
            onSeekNextPage={presenterOperation.changeToNextPage}
            onSeekPrevPage={presenterOperation.changeToPrevPage}
            onSeekNextStep={presenterOperation.seekToNextStep}
            onSeekPrevStep={presenterOperation.seekToPrevStep}
          />

          <PresenterBlockSessionStatus
            slideTitle={sessionInfo.title}
            totalPageNumber={sessionInfo.pages.length}
            currentPageIndexNumber={sessionState?.currentPage ?? 0}
            currentPageTotalStepNumber={sessionInfo.pages[sessionState?.currentPage ?? 0]?.step ?? 0}
            currentPageCurrentStepNumber={sessionState?.currentStep ?? 0}
            currentPageTitle={sessionInfo.pages[sessionState?.currentPage ?? 0]?.title ?? ""}
          />

          <PresenterBlockPageScript
            script={sessionInfo.pages[sessionState?.currentPage ?? 0]?.scripts[0].content ?? ""}
          />
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
}
