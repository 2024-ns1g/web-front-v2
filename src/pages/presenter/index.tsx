import { PresenterBlockDirectSeekSlide } from "@/components/presenter/blocks/directSeekSlide";
import { PresenterBlockPageScript } from "@/components/presenter/blocks/pageScript";
import { PresenterBlockSessionStatus } from "@/components/presenter/blocks/presentationStatus";
import { usePresenterContext } from "@/contexts/presenter-context";
import { usePresenterOperation } from "@/hooks/use-presenter-operation";
import { SessionInfo } from "@/types/session/session-info";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function PresenterIndexPage() {
  const presenterContext = usePresenterContext();
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const wsSender = presenterContext.sendWsMessage;
  const sessionState = presenterContext.state;

  useEffect(() => {
    let isMounted = true;
    const initialize = async () => {
      try {
        const data = await presenterContext.sessionInfo;
        if (isMounted) {
          setSessionInfo(data);
          setLoading(false);
        }
      } catch (err) {
      }
    };
    initialize();
    return () => { isMounted = false; };
  }, []);

  presenterContext.connectWs(); // もし複数回実行されてもただ無視されるだけ

  const presenterOperation = usePresenterOperation(
    wsSender,
    sessionInfo,
    sessionState
  );

  const wsMessageHandler = (message: any) => {
    switch (message.requestType) {
      
    }
  };

  presenterContext.setWsMessageHandler(wsMessageHandler);

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
