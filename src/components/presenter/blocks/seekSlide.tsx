// ボタンで前後のイベントをトリガーする(=矢印キーの動作)コンポーネント

import { FC } from "react";

type PresenterBlockSeekSlideProps = {
  onSeekPrev: () => void;
  onSeekNext: () => void;
};

export const PresenterBlockSeekSlide: FC<PresenterBlockSeekSlideProps> = ({
}) => {
  return (
    <>
      <p>Placeholder</p>
    </>
  );
}
