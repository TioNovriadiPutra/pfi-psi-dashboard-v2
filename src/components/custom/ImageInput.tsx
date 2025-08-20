import type { InputType } from "@interfaces/formInterface";
import { AnimatePresence, motion } from "motion/react";
import { useRef, type ChangeEvent } from "react";
import { useController, type Control } from "react-hook-form";
import { MdUploadFile } from "react-icons/md";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const ImageInput = ({ inputData, control }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    field,
    fieldState: { error },
  } = useController({
    name: inputData.name,
    control,
    rules: inputData.rules,
  });

  const toBase64 = (file: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onHandlePick = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const base64 = await toBase64(file);
      field.onChange(base64);
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

      <button
        type="button"
        className={`relative !flex-col w-full h-[200px] border-2 ${
          error ? "border-red-600" : "border-neutral-200"
        } border-dashed rounded-md gap-xs bg-neutral-0`}
        onClick={() => fileInputRef.current?.click()}
      >
        {field.value ? (
          <img
            src={field.value}
            alt="Image"
            className="w-full h-full object-contain"
          />
        ) : (
          <>
            <MdUploadFile size={32} className="text-neutral-400" />

            <p className="text-body-sm font-semibold text-neutral-400">
              Upload Image
            </p>
          </>
        )}

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
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onHandlePick}
      />
    </div>
  );
};

export default ImageInput;
