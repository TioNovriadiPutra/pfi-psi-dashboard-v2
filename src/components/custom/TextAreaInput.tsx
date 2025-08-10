import type { InputType } from "@interfaces/formInterface";
import { AnimatePresence, motion } from "motion/react";
import { useController, type Control } from "react-hook-form";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const TextAreaInput = ({ inputData, control }: Props) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: inputData.name,
    control,
    rules: inputData.rules,
  });

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
        } rounded-md`}
      >
        <textarea
          {...field}
          rows={5}
          placeholder={inputData.placeholder}
        ></textarea>

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

export default TextAreaInput;
