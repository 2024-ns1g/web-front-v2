import { PresenterBlockDirectSeekSlide } from "@/components/presenter/blocks/directSeekSlide";
import { PresenterBlockPageScript } from "@/components/presenter/blocks/pageScript";
import { PresenterBlockSessionStatus } from "@/components/presenter/blocks/presentationStatus";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function PresenterIndexPage() {

  return (
    <>
      <h1 className="text-4xl">Presenter</h1>
      <ResponsiveMasonry
        className="flex justify-center px-4">
        <Masonry
          className="container"
        >
          <PresenterBlockDirectSeekSlide
            canSeekPrev={false}
            canSeekNext={true}
            onSeekPrev={() => { }}
            onSeekNext={() => { }}
          ></PresenterBlockDirectSeekSlide>
          <PresenterBlockSessionStatus
            slideTitle="スライドタイトル"
            totalPageNumber={10}
            currentPageIndexNumber={1}
            currentPageTitle="あああ"
          ></PresenterBlockSessionStatus>
          <PresenterBlockPageScript
            script="console.log('Hello, world!')">
          </PresenterBlockPageScript>
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
}
