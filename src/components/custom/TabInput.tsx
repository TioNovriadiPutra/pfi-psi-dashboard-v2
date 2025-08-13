import type { InputType } from "@interfaces/formInterface";
import { useAnimate } from "motion/react";
import { useEffect, useState } from "react";
import { type Control } from "react-hook-form";
import { Form } from "@components/shared";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const TabInput = ({ inputData, control }: Props) => {
  const [currPage, setCurrPage] = useState(0);

  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(scope.current, { x: 120 * currPage }, { ease: "easeInOut" });
  }, [currPage]);

  return (
    <div className="gap-[16px]">
      <div className="relative !flex-row items-center">
        {inputData.tabData!.map((tab, index) => (
          <button
            key={index.toString()}
            type="button"
            className="w-[120px] py-[16px]"
            onClick={() => setCurrPage(index)}
          >
            <p
              key={index.toString()}
              className={`text-body-sm font-medium ${
                currPage === index ? "text-primary-400" : "text-neutral-400"
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
          className={`${index !== currPage && "!hidden"}`}
        >
          <Form
            key={index.toString()}
            listData={tab.inputs}
            control={control}
          />
        </div>
      ))}
    </div>
  );
};

export default TabInput;
