import { PresenterBlockDirectSeekSlide } from "@/components/presenter/blocks/directSeekSlide";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function PresenterIndexPage() {

  return (
    <>
      <ResponsiveMasonry>
        <Masonry>
          <PresenterBlockDirectSeekSlide
            canSeekPrev={false}
            canSeekNext={true}
            onSeekPrev={() => { }}
            onSeekNext={() => { }}
          ></PresenterBlockDirectSeekSlide>
          <PresenterBlockDirectSeekSlide
            canSeekPrev={false}
            canSeekNext={true}
            onSeekPrev={() => { }}
            onSeekNext={() => { }}
          ></PresenterBlockDirectSeekSlide>
          <PresenterBlockDirectSeekSlide
            canSeekPrev={false}
            canSeekNext={true}
            onSeekPrev={() => { }}
            onSeekNext={() => { }}
          ></PresenterBlockDirectSeekSlide>
          <PresenterBlockDirectSeekSlide
            canSeekPrev={false}
            canSeekNext={true}
            onSeekPrev={() => { }}
            onSeekNext={() => { }}
          ></PresenterBlockDirectSeekSlide>
          <PresenterBlockDirectSeekSlide
            canSeekPrev={false}
            canSeekNext={true}
            onSeekPrev={() => { }}
            onSeekNext={() => { }}
          ></PresenterBlockDirectSeekSlide>
          <PresenterBlockDirectSeekSlide
            canSeekPrev={false}
            canSeekNext={true}
            onSeekPrev={() => { }}
            onSeekNext={() => { }}
          ></PresenterBlockDirectSeekSlide>
          <PresenterBlockDirectSeekSlide
            canSeekPrev={false}
            canSeekNext={true}
            onSeekPrev={() => { }}
            onSeekNext={() => { }}
          ></PresenterBlockDirectSeekSlide>
        </Masonry>
      </ResponsiveMasonry>
      <h1 className="text-4xl">Presenter</h1>
    </>
  );
}
