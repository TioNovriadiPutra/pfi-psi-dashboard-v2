import {
  CartInput,
  DropdownInput,
  ImageInput,
  MapInput,
  TabInput,
  TextAreaInput,
  TextInput,
} from "@components/custom";
import type { InputType } from "@interfaces/formInterface";
import type { Control } from "react-hook-form";

type Props = {
  listData: InputType[];
  control: Control<any, any>;
};

const Form = ({ listData, control }: Props) => {
  return (
    <div className="gap-md">
      {listData.map((item, index) => {
        if (item.type === "textarea")
          return (
            <TextAreaInput
              key={index.toString()}
              inputData={item}
              control={control}
            />
          );

        if (item.type === "dropdown")
          return (
            <DropdownInput
              key={index.toString()}
              inputData={item}
              control={control}
            />
          );

        if (item.type === "map")
          return (
            <MapInput
              key={index.toString()}
              inputData={item}
              control={control}
            />
          );

        if (item.type === "tab")
          return (
            <TabInput
              key={index.toString()}
              inputData={item}
              control={control}
            />
          );

        if (item.type === "cart")
          return (
            <CartInput
              key={index.toString()}
              inputData={item}
              control={control}
            />
          );

        if (item.type === "image")
          return (
            <ImageInput
              key={index.toString()}
              inputData={item}
              control={control}
            />
          );

        return (
          <TextInput
            key={index.toString()}
            inputData={item}
            control={control}
          />
        );
      })}
    </div>
  );
};

export default Form;
