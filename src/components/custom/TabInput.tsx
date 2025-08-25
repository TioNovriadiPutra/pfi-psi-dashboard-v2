import type { InputType } from "@interfaces/formInterface";
import { useAnimate } from "motion/react";
import { useEffect } from "react";
import { type Control, type FieldErrors } from "react-hook-form";
import { Form } from "@components/shared";
import { useFormSlider } from "@stores/pageStore";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
  errors: FieldErrors<any>;
};

const TabInput = ({ inputData, control, errors }: Props) => {
  const formSlider = useFormSlider();

  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(scope.current, { x: 120 * formSlider.page }, { ease: "easeInOut" });
  }, [formSlider.page]);

  return (
    <div className="gap-[16px]">
      <div className="relative !flex-row items-center">
        {inputData.tabData!.map((tab, index) => (
          <button
            key={index.toString()}
            type="button"
            className="w-[120px] py-[16px]"
            onClick={() => formSlider.changePage(index)}
          >
            <p
              key={index.toString()}
              className={`text-body-sm font-medium ${
                formSlider.page === index
                  ? "text-primary-400"
                  : "text-neutral-400"
              }`}
            >
              {tab.title}
            </p>
          </button>
        ))}

        <div
          ref={scope}
          className="absolute w-[120px] h-[2px] bg-primary-400 rounded-full bottom-0"
        />
      </div>

      {inputData.tabData!.map((tab, index) => (
        <div
          key={index.toString()}
          className={`${
            index !== formSlider.page && "!hidden"
          } !flex-row gap-md`}
        >
          {tab.inputs.map((input, index2) => (
            <Form
              key={index2.toString()}
              listData={input}
              control={control}
              errors={errors}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TabInput;
