import type { InputType } from "@interfaces/formInterface";
import { useRef, type ChangeEvent } from "react";
import { useController, type Control } from "react-hook-form";
import { MdUploadFile } from "react-icons/md";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const ImageInput = ({ inputData, control }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { field } = useController({
    name: inputData.name,
    control,
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
        className="!flex-col w-full h-[200px] border-2 border-neutral-200 border-dashed rounded-md gap-xs bg-neutral-0"
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
