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
          className={`${
            index < fields.length - 1 &&
            "pb-md border-b-2 border-b-neutral-200 border-dashed"
          }`}
        >
          <div
            key={field.id}
            className={`border border-neutral-200 pb-sm ${
              inputData.cartData!.isGrey === false
                ? "bg-neutral-0"
                : "bg-neutral-50"
            } px-xs rounded-md`}
            style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)" }}
          >
            <div
              className={`!flex-row items-center ${
                inputData.label || inputData.cartData!.labels
                  ? "justify-between"
                  : "justify-end"
              } ${
                inputData.label || inputData.cartData!.labels
                  ? "py-md"
                  : "py-[8px]"
              }`}
            >
              {inputData.label || inputData.cartData!.labels ? (
                <h1 className="text-neutral-900">
                  {inputData.cartData!.labels
                    ? inputData.cartData!.labels[index]
                    : `${inputData.label} ${index + 1}`}
                </h1>
              ) : null}

              {inputData.cartData!.withAdd !== false && (
                <button
                  type="button"
                  className="size-lg rounded-lg bg-neutral-0 hover:bg-primary-200 transition-colors duration-300 border border-neutral-200 hover:border-primary-400 text-neutral-900 hover:text-primary-400"
                  onClick={() => remove(index)}
                >
                  <BiTrash size={16} />
                </button>
              )}
            </div>

            <div className="gap-md">
              <div className="!flex-row gap-md">
                {inputData.cartData!.inputs.map((input) => {
                  if (input.length > 1)
                    return (
                      <Form
                        listData={input.map((input2) => ({
                          ...input2,
                          name: `${inputData.name}.${index}.${input2.name}`,
                        }))}
                        control={control}
                      />
                    );
                })}
              </div>

              {inputData.cartData!.inputs.map((input) => {
                if (input.length === 1)
                  return (
                    <Form
                      listData={input.map((input2) => ({
                        ...input2,
                        name: `${inputData.name}.${index}.${input2.name}`,
                      }))}
                      control={control}
                    />
                  );
              })}
            </div>
          </div>
        </div>
      ))}

      {inputData.cartData!.withAdd !== false && (
        <div className="items-center py-[12px] border-t border-t-neutral-200">
          <Button
            buttonData={{
              label: `Add ${inputData.placeholder}`,
              color: "bg-neutral-0",
              hover: "hover:bg-primary-200",
            }}
            icon={IoIosAddCircleOutline}
            onClick={() => append(inputData.cartData!.template)}
          />
        </div>
      )}
    </div>
  );
};

export default CartInput;
