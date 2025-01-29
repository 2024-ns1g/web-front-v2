// ボタンでスライドを移動するためのコンポーネント

import { FC } from "react";

type PresenterBlockDirectSeekSlideProps = {
  canSeekPrev: boolean;
  canSeekNext: boolean;
  onSeekPrev: () => void;
  onSeekNext: () => void;
};

export const PresenterBlockDirectSeekSlide: FC<PresenterBlockDirectSeekSlideProps> = ({
}) => {
  return (
    <>
      <p>Placeholder</p>
    </>
  );
}
