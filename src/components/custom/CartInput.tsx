import { Button, Form } from "@components/shared";
import type { InputType } from "@interfaces/formInterface";
import { useFieldArray, type Control } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const CartInput = ({ inputData, control }: Props) => {
  const { fields, append, remove } = useFieldArray({
    name: inputData.name,
    control,
    rules: inputData.rules,
  });

  return (
    <div className="gap-md">
      {fields.map((field, index) => (
        <div
          className={`border border-neutral-200 pb-sm bg-neutral-50 px-xs rounded-md`}
          style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)" }}
        >
          <div className="!flex-row items-center justify-between py-md">
            <h1 className="text-neutral-900">
              {inputData.label} {index + 1}
            </h1>

            <button
              type="button"
              className="size-lg rounded-lg bg-neutral-0 hover:bg-primary-200 transition-colors duration-300 border border-neutral-200 hover:border-primary-400 text-neutral-900 hover:text-primary-400"
              onClick={() => remove(index)}
            >
              <BiTrash size={16} />
            </button>
          </div>

          <Form
            key={field.id}
            listData={inputData.cartData!.inputs.map((input) => ({
              ...input,
              name: `${inputData.name}.${index}.${input.name}`,
            }))}
            control={control}
          />
        </div>
      ))}

      <div className="items-center py-[12px] border-t border-t-neutral-200">
        <Button
          buttonData={{
            label: `Add ${inputData.label}`,
            color: "bg-neutral-0",
            hover: "hover:bg-primary-200",
          }}
          icon={IoIosAddCircleOutline}
          onClick={() => append(inputData.cartData!.template)}
        />
      </div>
    </div>
  );
};

export default CartInput;
