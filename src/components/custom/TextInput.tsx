import type { InputType } from "@interfaces/formInterface";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ChangeEvent } from "react";
import { useController, useWatch, type Control } from "react-hook-form";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const TextInput = ({ inputData, control }: Props) => {
  const [showPass, setShowPass] = useState(false);

  const password = useWatch({
    name: "password",
    control,
  });

  const {
    field,
    fieldState: { error },
  } = useController({
    name: inputData.name,
    control,
    rules: {
      ...inputData.rules,
      validate:
        inputData.type === "confirm"
          ? (val) => val === password || "Password confirmation failed!"
          : undefined,
    },
  });

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (inputData.type === "number") {
      const regex = /^(\d+)?(\.\d{0,2})?$/;

      if (value === "" || regex.test(value)) field.onChange(value);
    } else {
      field.onChange(value);
    }
  };

  return (
    <div className="gap-[8px]">
      {inputData.label && (
        <p className="text-body-sm font-medium text-neutral-900">
          {inputData.label}

          {inputData.required && <span className="text-red-600"> *</span>}
        </p>
      )}

      <div
        className={`relative !flex-row px-[12px] py-[8px] border ${
          error ? "border-red-600" : "border-neutral-200"
        } rounded-md ${inputData.disabled ? "bg-neutral-100" : "bg-neutral-0"}`}
      >
        <input
          {...field}
          placeholder={inputData.placeholder}
          type={
            inputData.type === "password" || inputData.type === "confirm"
              ? showPass
                ? "text"
                : "password"
              : inputData.type === "date"
              ? "date"
              : inputData.type === "time"
              ? "time"
              : "text"
          }
          inputMode={inputData.type === "number" ? "numeric" : "text"}
          onChange={onHandleChange}
          className={`${inputData.disabled && "!text-neutral-400"}`}
          disabled={inputData.disabled}
        />

        {(inputData.type === "password" || inputData.type === "confirm") &&
        !/Edg/.test(navigator.userAgent) ? (
          <button type="button" onClick={() => setShowPass(!showPass)}>
            <img
              src={showPass ? "/unsee.svg" : "/see.svg"}
              alt="Password Icon"
              className="size-sm"
            />
          </button>
        ) : null}

        <AnimatePresence>
          {error && (
            <motion.p
              className="absolute bottom-[-10px] text-body-sm font-normal text-red-600 bg-neutral-0 px-[2px]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              {error.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TextInput;
