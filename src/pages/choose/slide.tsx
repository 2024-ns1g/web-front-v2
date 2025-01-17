import CreateSlideModal from "@/components/modal/create-slide-modal";
import { useStateContext } from "@/contexts/state-context";
import { useApis } from "@/hooks/use-api";
import { Slide } from "@/types/object/slide";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/tooltip";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChooseSlide = () => {
  const api = useApis();
  const state = useStateContext();
  const navigate = useNavigate();

  const [slides, setSlides] = useState<Slide[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const updateSlides = () => {
    api.slide.getLinkedSlideList(null).then((res) => {
      setSlides(res!.slides);
    });
  }

  const selectHandler = (slide: Slide) => {
    state.setActiveSlideId(slide.slideId);
    
    navigate("/");
  }

  const onClose = () => {
    setIsOpen(false);
  }

  const slideCreateCompleted = () => {
    toast.success("スライドを作成しました");
    updateSlides();
  }

  // When the component is mounted
  useEffect(() => {
    updateSlides();
  }, []);

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white shadow z-50 sticky top-0 h-16">
        <h1 className="text-2xl">スライドを選択</h1>
        <Button color="primary" variant="shadow" onPress={() => setIsOpen(true)}>
          新規作成
        </Button>
      </header>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div
          className={`flex flex-wrap gap-6 justify-center items-center ${slides.length < 3 ? "h-full" : ""}`}
        >
          {slides.map((slide) => (
            <Card
              key={slide.slideId}
              className="max-w-sm w-full transform transition duration-300 hover:scale-105 hover:shadow-lg border border-gray-300"
              isPressable
              onPress={() => selectHandler(slide)}
            >
              <CardHeader>
                <div className="flex flex-col items-start">
                  <Tooltip content={slide.displayName} placement="top">
                    <h3 className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-full" title={slide.displayName}>
                      {slide.displayName}
                    </h3>
                  </Tooltip>
                  <br />
                  {/* TODO: Impl here */}
                  {/* <p className="text-sm text-gray-500 mt-1"> */}
                  {/*   所有者: {slide.owner.displayName} */}
                  {/* </p> */}
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-gray-700">
                  {slide.isPublic ? "公開" : "非公開"}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <CreateSlideModal isOpen={isOpen} onClose={onClose} completedCallback={slideCreateCompleted} />
    </>
  );
}

export default ChooseSlide;
