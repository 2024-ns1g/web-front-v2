import { Button } from "@nextui-org/react";
import { FC, useState } from "react";

interface BodyPageSelectorProps {
  defaultPageIndex: number; // インデックスでデフォルトページを指定
  onSelectedPageChanged: (pageId: string) => void;
  pages: {
    pageId: string;
    title: string;
    scripts: any[]; // これは使わないので
  }[];
}

export const BodyPageSelector: FC<BodyPageSelectorProps> = ({
  defaultPageIndex,
  onSelectedPageChanged,
  pages,
}) => {
  // デフォルトページのIDをインデックスから取得
  const [currentPageId, setCurrentPageId] = useState(
    pages[defaultPageIndex]?.pageId
  );

  const currentPageIndex = pages.findIndex(
    (page) => page.pageId === currentPageId
  );
  const currentPage = pages[currentPageIndex];

  const nextPageHandler = () => {
    if (currentPageIndex < pages.length - 1) {
      const nextPageId = pages[currentPageIndex + 1].pageId;
      setCurrentPageId(nextPageId);
      onSelectedPageChanged(nextPageId); // 親コンポーネントに通知
    }
  };

  const prevPageHandler = () => {
    if (currentPageIndex > 0) {
      const prevPageId = pages[currentPageIndex - 1].pageId;
      setCurrentPageId(prevPageId);
      onSelectedPageChanged(prevPageId); // 親コンポーネントに通知
    }
  };

  return (
    <div className="flex justify-center items-center gap-4">
      <Button onPress={prevPageHandler} isDisabled={currentPageIndex === 0}>
        ←
      </Button>
      <p className="text-lg font-bold">{currentPage?.title || "No Title"}</p>
      <Button
        onPress={nextPageHandler}
        isDisabled={currentPageIndex === pages.length - 1}
      >
        →
      </Button>
    </div>
  );
};
