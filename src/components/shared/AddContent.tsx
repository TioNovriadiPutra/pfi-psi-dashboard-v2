import type { InputType } from "@interfaces/formInterface";
import type { Control } from "react-hook-form";
import Form from "./Form";

type Props = {
  contentData: InputType[][];
  control: Control<any, any>;
};

const AddContent = ({ contentData, control }: Props) => {
  return (
    <div className="grow basis-0 overflow-y-auto items-center gap-[16px]">
      {contentData.map((item, index) => (
        <div
          key={index.toString()}
          className="w-full max-w-[712px] bg-neutral-0 p-md border border-neutral-200 rounded-lg"
          style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)" }}
        >
          <Form listData={item} control={control} />
        </div>
      ))}
    </div>
  );
};

export default AddContent;
