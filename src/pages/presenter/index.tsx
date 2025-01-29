import { PresenterBlockDirectSeekSlide } from "@/components/presenter/blocks/directSeekSlide";

export default function PresenterIndexPage() {

  return (
    <>
      <h1 className="text-4xl">Presenter</h1>
      <PresenterBlockDirectSeekSlide
        canSeekPrev={false}
        canSeekNext={false}
        onSeekPrev={() => { }}
        onSeekNext={() => { }}
      ></PresenterBlockDirectSeekSlide>
    </>
  );
}
