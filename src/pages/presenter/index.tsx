import { PresenterBlockDirectSeekSlide } from "@/components/presenter/blocks/directSeekSlide";
import { PresenterBlockPageScript } from "@/components/presenter/blocks/pageScript";
import { PresenterBlockSessionStatus } from "@/components/presenter/blocks/presentationStatus";
import { usePresenterContext } from "@/contexts/presenter-context";
import { usePresenterOperation } from "@/hooks/use-presenter-operation";
import { SessionInfo } from "@/types/session/session-info";
import { useCallback, useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function PresenterIndexPage() {
  const presenterContext = usePresenterContext();
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const wsSender = presenterContext.sendWsMessage;
  const sessionState = presenterContext.state;
  const presenterOperation = usePresenterOperation(
    wsSender,
    sessionInfo,
    sessionState
  );

  useEffect(() => {
    let isMounted = true;
    const initialize = async () => {
      try {
        await presenterContext.connectWs();
        const data = await presenterContext.updateSessionInfo();
        if (isMounted) {
          setSessionInfo(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Initialization failed:", err);
        setLoading(false);
      }
    };

    initialize();
    return () => { isMounted = false; };
  }, []);

  const wsMessageHandler = useCallback((message: any) => {
    console.log("Received message: ", message);
    switch (message.requestType) {
      case "CHANGE_CURRENT_PAGE": {
        presenterContext.updateState({
          currentPage: message.data.newPageIndex,
          currentStep: 0,
        });
        break;
      }
      case "TRIGGER_NEXT_STEP": {
        if (message.data.isPageChanged) {
          presenterContext.updateState({
            currentPage: message.data.newPageIndex,
          });
        }
        presenterContext.updateState({
          currentStep: message.data.newStepIndex,
        });
        break;
      }
      case "TRIGGER_PREV_STEP": {
        if (message.data.isPageChanged) {
          presenterContext.updateState({
            currentPage: message.data.newPageIndex,
          });
        }
        presenterContext.updateState({
          currentStep: message.data.newStepIndex,
        });
        break;
      }
    }
  }, [presenterContext]);

  useEffect(() => {
    presenterContext.setWsMessageHandler(wsMessageHandler);
  }, [wsMessageHandler, presenterContext]);

  if (loading) return <div>Loading presentation data...</div>;

  return (
    <>
      <h1 className="text-4xl">Presenter</h1>
      <ResponsiveMasonry className="flex justify-center px-4">
        <Masonry className="container">
          <PresenterBlockDirectSeekSlide
            canSeekNextPage={presenterOperation.canChangeToNextPage?.()}
            canSeekPrevPage={presenterOperation.canChangeToPrevPage?.()}
            canSeekNextStep={presenterOperation.canChangeToNextStep?.()}
            canSeekPrevStep={presenterOperation.canChangeToPrevStep?.()}
            onSeekNextPage={presenterOperation.changeToNextPage}
            onSeekPrevPage={presenterOperation.changeToPrevPage}
            onSeekNextStep={presenterOperation.seekToNextStep}
            onSeekPrevStep={presenterOperation.seekToPrevStep}
          />

          <PresenterBlockSessionStatus
            slideTitle={sessionInfo?.title ?? ""}
            totalPageNumber={sessionInfo?.pages?.length ?? 0}
            currentPageIndexNumber={sessionState?.currentPage ?? 0}
            currentPageTotalStepNumber={
              sessionInfo?.pages[sessionState?.currentPage]?.scripts?.length ?? 0
            }
            currentPageCurrentStepNumber={sessionState?.currentStep ?? 0}
            currentPageTitle={
              sessionInfo?.pages[sessionState?.currentPage]?.title ?? ""
            }
          />

          <PresenterBlockPageScript
            script={
              sessionInfo?.pages[sessionState?.currentPage]?.scripts[
                sessionState?.currentStep
              ]?.content ?? ""
            }
          />
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
}
