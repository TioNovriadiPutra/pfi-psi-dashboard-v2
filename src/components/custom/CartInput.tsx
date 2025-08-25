import { Button, Form } from "@components/shared";
import type { InputType } from "@interfaces/formInterface";
import { AnimatePresence, motion } from "motion/react";
import { useFieldArray, type Control, type FieldErrors } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
  errors: FieldErrors<any>;
};

const CartInput = ({ inputData, control, errors }: Props) => {
  const { fields, append, remove } = useFieldArray({
    name: inputData.name,
    control,
    rules: {
      ...inputData.rules,
    },
  });

  return (
    <div className="gap-md">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className={`${
            index < fields.length - 1 &&
            "pb-md border-b-2 border-b-neutral-200 border-dashed"
          }`}
        >
          <div
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
                {inputData.cartData!.inputs.map((input, index) => {
                  if (input.length > 1)
                    return (
                      <Form
                        key={index.toString()}
                        listData={input.map((input2) => ({
                          ...input2,
                          name: `${inputData.name}.${index}.${input2.name}`,
                        }))}
                        control={control}
                        errors={errors}
                      />
                    );
                })}
              </div>

              {inputData.cartData!.inputs.map((input, index) => {
                if (input.length === 1)
                  return (
                    <Form
                      key={index.toString()}
                      listData={input.map((input2) => ({
                        ...input2,
                        name: `${inputData.name}.${index}.${input2.name}`,
                      }))}
                      control={control}
                      errors={errors}
                    />
                  );
              })}
            </div>
          </div>
        </div>
      ))}

      {inputData.cartData!.withAdd !== false && (
        <div
          className={`relative items-center py-[12px] border-t ${
            errors[inputData.name] && errors[inputData.name]?.root
              ? "border-t-red-600"
              : "border-t-neutral-200"
          }`}
        >
          <Button
            buttonData={{
              label: `Add ${inputData.placeholder}`,
              color: "bg-neutral-0",
              hover: "hover:bg-primary-200",
            }}
            icon={IoIosAddCircleOutline}
            onClick={() => append(inputData.cartData!.template)}
          />

          <AnimatePresence>
            {errors[inputData.name] && errors[inputData.name]?.root && (
              <motion.p
                className="absolute top-[-8.5px] text-body-sm font-normal text-red-600 bg-neutral-0 px-[2px]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                {errors[inputData.name]?.root?.message as string}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default CartInput;
