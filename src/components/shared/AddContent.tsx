import type { InputType } from "@interfaces/formInterface";
import type { Control, FieldErrors } from "react-hook-form";
import Form from "./Form";
import { useEffect } from "react";
import { useFormSlider } from "@stores/pageStore";

type Props = {
  contentData: InputType[][];
  control: Control<any, any>;
  size?: "normal" | "large";
  errors: FieldErrors<any>;
};

const AddContent = ({
  contentData,
  control,
  size = "normal",
  errors,
}: Props) => {
  const resetFormSlider = useFormSlider((state) => state.resetPage);

  useEffect(() => {
    resetFormSlider();
  }, []);

  return (
    <div className="grow basis-0 overflow-y-auto items-center gap-[16px]">
      <div
        className={`w-full ${
          size === "large" ? "max-w-[1424px]" : "max-w-[712px]"
        } bg-neutral-0 p-md border border-neutral-200 rounded-lg gap-md`}
        style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)" }}
      >
        <div className="!flex-row gap-md">
          {contentData.map((input, index2) => {
            if (input[0].type !== "cart" && input[0].type !== "annotation")
              return (
                <Form
                  key={index2.toString()}
                  listData={input}
                  control={control}
                  errors={errors}
                />
              );
          })}
        </div>

        {contentData.map((input, index2) => {
          if (input[0].type === "annotation")
            return (
              <Form
                key={index2.toString()}
                listData={input}
                control={control}
                errors={errors}
              />
            );
        })}
      </div>
    </div>
  );
};

export default AddContent;
