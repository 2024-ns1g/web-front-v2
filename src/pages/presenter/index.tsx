import { PresenterBlockDirectSeekSlide } from "@/components/presenter/blocks/directSeekSlide";
import { PresenterBlockPageScript } from "@/components/presenter/blocks/pageScript";
import { PresenterBlockSessionStatus } from "@/components/presenter/blocks/presentationStatus";
import { usePresenterContext } from "@/contexts/presenter-context";
import { usePresenterOperation } from "@/hooks/use-presenter-operation";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default async function PresenterIndexPage() {

  const presenterContext = usePresenterContext();

  const wsSender = presenterContext.sendWsMessage;
  const sessionInfo = await presenterContext.sessionInfo;
  const sessionState = presenterContext.state

  const presenterOperation = usePresenterOperation(wsSender, sessionInfo, sessionState);

  return (
    <>
      <h1 className="text-4xl">Presenter</h1>
      <ResponsiveMasonry
        className="flex justify-center px-4">
        <Masonry
          className="container"
        >
          <PresenterBlockDirectSeekSlide
            canSeekNextPage={presenterOperation.canChangeToNextPage()}
            canSeekPrevPage={presenterOperation.canChangeToPrevPage()}
            canSeekNextStep={presenterOperation.canChangeToNextStep()}
            canSeekPrevStep={presenterOperation.canChangeToPrevStep()}
            onSeekNextPage={presenterOperation.changeToNextPage}
            onSeekPrevPage={presenterOperation.changeToPrevPage}
            onSeekNextStep={presenterOperation.seekToNextStep}
            onSeekPrevStep={presenterOperation.seekToPrevStep}
          ></PresenterBlockDirectSeekSlide>

          <PresenterBlockSessionStatus
            slideTitle={sessionInfo.title}
            totalPageNumber={sessionInfo.pages.length}
            currentPageIndexNumber={sessionState?.currentPage ?? 0}
            currentPageTotalStepNumber={sessionInfo.pages[sessionState?.currentPage ?? 0]?.step ?? 0}
            currentPageCurrentStepNumber={sessionState?.currentStep ?? 0}
            currentPageTitle={sessionInfo.pages[sessionState?.currentPage ?? 0]?.title ?? ""}
          ></PresenterBlockSessionStatus>

          <PresenterBlockPageScript
            script={sessionInfo.pages[sessionState?.currentPage ?? 0]?.scripts[0].content ?? ""}>
          </PresenterBlockPageScript>
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
}
