import { Button } from "@components/shared";
import type { InputType } from "@interfaces/formInterface";
import { fileToURL } from "@utils/helper/converter";
import { useRef, type ChangeEvent } from "react";
import { useController, type Control } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";

type Props = {
  inputData: InputType;
  control: Control<any, any>;
};

const GalleryInput = ({ inputData, control }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { field } = useController({
    name: inputData.name,
    control,
  });

  const onHandleFile = () => inputRef.current?.click();

  const onHandlePick = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (!files) return;

    const data = field.value;

    for (const file of files) {
      const dataUrl = await fileToURL(file);

      data.push(dataUrl);
    }

    field.onChange(data);
  };

  const onHandleRemove = (index: number) => {
    const data = field.value;

    const newData = data.filter(
      (_: string, index2: number) => index !== index2
    );

    field.onChange(newData);
  };

  return (
    <div className="gap-[8px]">
      {inputData.label && (
        <p className="text-body-sm font-medium text-neutral-900">
          {inputData.label}

          {inputData.required && <span className="text-red-600"> *</span>}
        </p>
      )}

      <div className="gap-xs bg-neutral-0  border border-neutral-200 rounded-md">
        <div className="!flex-row pb-md border-b border-b-neutral-200 px-md pt-xs gap-[16px]">
          {field.value.map((item: string, index: number) => (
            <div className="relative w-[133px] h-[100px] rounded-md border border-neutral-200 overflow-hidden">
              <img
                key={index.toString()}
                src={item}
                alt="Appendix"
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                className="absolute z-[999] top-[5px] right-[5px] size-sm bg-neutral-0 hover:bg-primary-200 transition-colors duration-300 rounded-full text-neutral-900 hover:text-primary-700"
                style={{ boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.25)" }}
                onClick={() => onHandleRemove(index)}
              >
                <IoClose size={7} />
              </button>
            </div>
          ))}
        </div>

        <div className="items-center pb-xs">
          <Button
            buttonData={{
              label: `Add ${inputData.placeholder}`,
              color: "bg-neutral-0",
              hover: "hover:bg-primary-200",
            }}
            icon={IoIosAddCircleOutline}
            onClick={onHandleFile}
          />

          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={onHandlePick}
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryInput;
