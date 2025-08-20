import type { InputType } from "@interfaces/formInterface";
import type { Control } from "react-hook-form";
import Form from "./Form";
import { useEffect } from "react";
import { useFormSlider } from "@stores/pageStore";

type Props = {
  contentData: InputType[][][];
  control: Control<any, any>;
  size?: "normal" | "large";
};

const AddContent = ({ contentData, control, size = "normal" }: Props) => {
  const resetFormSlider = useFormSlider((state) => state.resetPage);

  useEffect(() => {
    resetFormSlider();
  }, []);

  return (
    <div className="grow basis-0 overflow-y-auto items-center gap-[16px]">
      {contentData.map((item, index) => (
        <div
          key={index.toString()}
          className={`w-full ${
            size === "normal" && "max-w-[712px]"
          } bg-neutral-0 p-md border border-neutral-200 rounded-lg`}
          style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)" }}
        >
          {item.map((item2, index2) => (
            <div key={index2.toString()} className="!flex-row">
              <Form listData={item2} control={control} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AddContent;
