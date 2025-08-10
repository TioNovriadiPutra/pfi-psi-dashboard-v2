import { Form } from "@components/shared";
import { defectForm } from "@utils/constant/formConst";
import { useAnimate } from "motion/react";
import { useEffect, useState } from "react";
import { useFieldArray, type Control } from "react-hook-form";

type Props = {
  defectData: { title: string }[];
  control: Control<any, any>;
};

const AddDefectContent = ({ defectData, control }: Props) => {
  const [currPage, setCurrPage] = useState(0);

  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(scope.current, { x: 120 * currPage }, { ease: "easeInOut" });
  }, [currPage]);

  const { fields } = useFieldArray({
    name: "defects",
    control,
  });

  return (
    <div className="grow basis-0 overflow-y-auto items-center gap-[16px]">
      <div className="relative !flex-row items-center">
        {defectForm.inputs[0][0].tabData!.map((tab, index) => (
          <button
            type="button"
            className="w-[120px] py-[16px]"
            onClick={() => setCurrPage(index)}
          >
            <p
              key={index.toString()}
              className={`text-body-sm font-medium ${
                currPage === index ? "text-primary-400" : "text-neutral-400"
              }`}
            >
              {tab.title}
            </p>
          </button>
        ))}

        <div
          ref={scope}
          className="absolute w-[120px] h-[2px] bg-primary-400 rounded-full bottom-0"
        />
      </div>

      {currPage === 0 ? (
        <div
          className="w-full max-w-[712px] bg-neutral-0 p-md border border-neutral-200 rounded-lg"
          style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)" }}
        >
          <Form
            listData={defectForm.inputs[0][0].tabData![0].inputs}
            control={control}
          />
        </div>
      ) : (
        fields.map((field, index) => (
          <div
            key={field.id}
            className="w-full max-w-[712px] bg-neutral-0 p-md border border-neutral-200 rounded-lg gap-md"
            style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)" }}
          >
            <h1 className="text-neutral-900">{defectData[index].title}</h1>

            <Form
              key={field.id}
              listData={defectForm.inputs[0][0].tabData![1].inputs.map(
                (item) => ({
                  ...item,
                  name: `defects.${index}.${item.name}`,
                })
              )}
              control={control}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default AddDefectContent;
