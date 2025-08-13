import { AddHeader, Form } from "@components/shared";
import useDefectController from "@controllers/defectController";
import usePlanController from "@controllers/planController";
import useReportController from "@controllers/reportController";
import type { FormType } from "@interfaces/formInterface";
import type { DefectInput } from "@models/defectModel";
import { useDefectSlider } from "@stores/pageStore";
import { useAnimate } from "motion/react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

type Props = {
  defectData: { form: FormType<DefectInput>; data: { title: string }[] };
  buildingId: number;
};

const AddDefectContent = ({ defectData, buildingId }: Props) => {
  const defectSlider = useDefectSlider();

  const [scope, animate] = useAnimate();

  const { control, handleSubmit } = useForm({
    defaultValues: defectData.form.defaultValues,
  });

  const { addDefectService } = useDefectController();
  const { addReportService } = useReportController();
  const { addPlanService } = usePlanController();

  useEffect(() => {
    animate(
      scope.current,
      { x: 120 * defectSlider.page },
      { ease: "easeInOut" }
    );
  }, [defectSlider.page]);

  const { fields } = useFieldArray({
    name: "defects",
    control,
  });

  return (
    <>
      <AddHeader
        title="Add Defect"
        onSubmit={handleSubmit((body) => {
          if (defectSlider.page === 0) {
            addReportService({
              ...body.report,
              building_id: buildingId,
            });
          } else if (defectSlider.page === 1) {
            addPlanService({
              ...body.plan,
              building_id: buildingId,
              report_id: defectSlider.reportId!,
            });
          } else {
            addDefectService(
              body.defects.map((defect, index) => ({
                building_id: buildingId,
                location: defectData.data[index].title,
                name: defect.name,
                observation: defect.observation,
                couse: defect.couse,
                recommendation: defect.recommendation,
                timeframe: defect.timeframe,
                remedial: defect.remedial,
                image_elevation: defect.image_elevation,
                image_detail: defect.image_detail,
                defect_type_id: defect.defect_type_id,
                defect_levels: defect.defect_levels.map((level) => ({
                  ...level,
                  building_id: buildingId,
                  report_id: defectSlider.reportId!,
                  level_id: level.level_id,
                })),
              }))
            );
          }
        })}
      />

      <div className="grow basis-0 overflow-y-auto items-center gap-[16px]">
        <div className="relative !flex-row items-center">
          {defectData.form.inputs[0][0].tabData!.map((tab, index) => (
            <div
              key={index.toString()}
              className="w-[120px] py-[16px] items-center justify-center"
            >
              <p
                className={`text-body-sm font-medium ${
                  defectSlider.page === index
                    ? "text-primary-400"
                    : "text-neutral-400"
                }`}
              >
                {tab.title}
              </p>
            </div>
          ))}

          <div
            ref={scope}
            className="absolute w-[120px] h-[2px] bg-primary-400 rounded-full bottom-0"
          />
        </div>

        {defectSlider.page < 2 ? (
          <div
            className="w-full max-w-[712px] bg-neutral-0 p-md border border-neutral-200 rounded-lg"
            style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)" }}
          >
            <Form
              listData={defectData.form.inputs[0][0].tabData![
                defectSlider.page
              ].inputs.map((item) => ({
                ...item,
                name: `${defectSlider.page === 0 ? "report" : "plan"}.${
                  item.name
                }`,
              }))}
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
              <h1 className="text-neutral-900">
                {defectData.data[index].title}
              </h1>

              <Form
                key={field.id}
                listData={defectData.form.inputs[0][0].tabData![2].inputs.map(
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
    </>
  );
};

export default AddDefectContent;
