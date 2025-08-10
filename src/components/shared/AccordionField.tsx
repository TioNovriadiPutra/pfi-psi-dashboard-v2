import type { DetailAccordionStateType } from "@interfaces/stateInterface";
import { IoIosArrowDropdown } from "react-icons/io";
import AccordionMenuField from "./AccordionMenuField";
import { useState } from "react";

type Props = {
  label: string;
  value: DetailAccordionStateType[];
};

const AccordionField = ({ label, value }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const onHandleMenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="w-full gap-[8px]">
      <p className="text-body-sm font-medium text-neutral-900">{label}</p>

      <div className="border border-neutral-200 rounded-md">
        {value.map((item, index) => (
          <div key={index.toString()}>
            <button
              type="button"
              className="!justify-start px-xs py-[12px]"
              onClick={() => onHandleMenu(index)}
            >
              <p className="flex-1 text-body-sm font-semibold text-neutral-900 text-left">
                {item.title}
              </p>

              <IoIosArrowDropdown size={18} className="text-neutral-900" />
            </button>

            <AccordionMenuField
              menuContent={item.data}
              isOpen={index === openIndex}
              isLast={index === value.length - 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccordionField;
