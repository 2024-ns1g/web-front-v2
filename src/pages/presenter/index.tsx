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
            slideTitle="スライドタイトル"
            totalPageNumber={10}
            currentPageIndexNumber={1}
            currentPageTotalStepNumber={4}
            currentPageCurrentStepNumber={2}
            currentPageTitle="あああ"
          ></PresenterBlockSessionStatus>
          <PresenterBlockPageScript
            script="
# あいう 
## えお">
          </PresenterBlockPageScript>
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
}
