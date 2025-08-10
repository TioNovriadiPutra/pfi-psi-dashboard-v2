import type { DropdownType, InputType } from "@interfaces/formInterface";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useController, type Control } from "react-hook-form";
import { IoIosArrowDropdown } from "react-icons/io";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const DropdownInput = ({ inputData, control }: Props) => {
  const [showDrop, setShowDrop] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({
    name: inputData.name,
    control,
    rules: inputData.rules,
  });

  const onHandlePick = (value: DropdownType) => {
    field.onChange(value);
    setShowDrop(false);
  };

  return (
    <div className="gap-[8px]">
      {inputData.label && (
        <p className="text-body-sm font-medium text-neutral-900">
          {inputData.label}

          {inputData.required && <span className="text-red-600"> *</span>}
        </p>
      )}

      <button
        type="button"
        className={`relative !flex-row !justify-start px-[12px] py-[8px] border ${
          error ? "border-red-600" : "border-neutral-200"
        } rounded-md`}
        onClick={() => setShowDrop(!showDrop)}
      >
        <p
          className={`flex-1 text-body-sm font-normal ${
            field.value ? "text-neutral-900" : "text-neutral-400"
          } text-left`}
        >
          {field.value ? field.value.label : inputData.placeholder}
        </p>

        <IoIosArrowDropdown size={18} className="text-neutral-500" />

        <AnimatePresence>
          {showDrop && (
            <motion.div
              className="absolute z-[999] left-0 right-0 top-[110%] max-w-[256px] bg-neutral-0 border border-neutral-200 rounded-md p-[5px] origin-top"
              style={{ boxShadow: "0px 2px 4px -2px rgba(0, 0, 0, 0.1)" }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              {inputData.items!.map((item, index) => (
                <button
                  key={index.toString()}
                  type="button"
                  className="px-xs py-[8px] !justify-start bg-neutral-0 hover:bg-primary-200 transition-colors duration-300 rounded-md"
                  onClick={() => onHandlePick(item)}
                >
                  <p className="text-body-sm font-normal text-neutral-900">
                    {item.label}
                  </p>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default DropdownInput;
