import type { SlideStateType } from "@interfaces/stateInterface";
import { useAnimate } from "motion/react";
import { useEffect } from "react";

type Props = {
  sliderData: string[];
  pageData: SlideStateType;
};

const PageSlider = ({ sliderData, pageData }: Props) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(scope.current, { x: 120 * pageData.page }, { ease: "easeInOut" });
  }, [pageData.page]);

  return (
    <div className="mb-xs px-md self-start">
      <div className="relative !flex-row p-[5px] bg-neutral-100 rounded-md">
        <div
          ref={scope}
          className="absolute w-[120px] top-[5px] bottom-[5px] bg-neutral-0 rounded-[4px] z-10"
        />

        {sliderData.map((item, index) => (
          <button
            key={index.toString()}
            type="button"
            className="z-20 px-[12px] py-[6px] w-[120px]"
            onClick={() => pageData.changePage(index)}
          >
            <p
              className={`text-body-sm font-medium ${
                pageData.page === index
                  ? "text-neutral-900"
                  : "text-neutral-500"
              }`}
            >
              {item}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PageSlider;
