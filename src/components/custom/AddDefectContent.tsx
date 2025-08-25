import { AddContent, AddHeader } from "@components/shared";
import useDefectController from "@controllers/defectController";
import type { FormType } from "@interfaces/formInterface";
import type { DefectInput } from "@models/defectModel";
import { useFormSlider } from "@stores/pageStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

type Props = {
  defectData: FormType<DefectInput>;
  buildingId: number;
};

const AddDefectContent = ({ defectData, buildingId }: Props) => {
  const formSlider = useFormSlider();

  const nav = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defectData.defaultValues,
  });

  const { addDefectService } = useDefectController();

  useEffect(() => {
    formSlider.resetPage();
  }, []);

  useEffect(() => {
    const errorKeys = Object.keys(errors);

    if (errorKeys.length > 0) {
      if (
        errorKeys.filter((key) => key !== "plans" && key !== "defects").length >
        0
      ) {
        formSlider.changePage(0);
      } else {
        if (errorKeys.filter((key) => key === "plans").length > 0) {
          formSlider.changePage(1);
        } else if (errorKeys.filter((key) => key === "defects").length > 0) {
          formSlider.changePage(2);
        }
      }
    }
  }, [isSubmitting]);

  return (
    <>
      <AddHeader
        title="Add Defect"
        onSubmit={handleSubmit((body) => {
          if (formSlider.page === 2) {
            console.log(body);

            addDefectService({
              report: {
                report_no: body.report_no,
                report_date: body.report_date,
                time_inspection: body.time_inspection,
                date_inspection: body.date_inspection,
                duration_inspection: body.duration_inspection,
                location_inspection: body.location_inspection,
                methodology_inspection: body.methodology_inspection,
                name_providers: body.name_providers,
                facade_inspector: body.facade_inspector,
                description: body.description,
                highlight: body.highlight,
                building_id: buildingId,
              },
              plans: body.plans.map((plan) => ({
                ...plan,
                building_id: buildingId,
              })),
              defects: body.defects.map((defect) => ({
                building_id: buildingId,
                location: "",
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
                  level_id: level.level_id,
                })),
              })),
            });
          } else {
            formSlider.changePage(formSlider.page + 1);
          }
        })}
        onBack={() => {
          if (formSlider.page === 0) {
            nav(-1);
          } else {
            formSlider.changePage(formSlider.page - 1);
          }
        }}
      />

      <AddContent
        contentData={defectData.inputs}
        control={control}
        size="large"
        errors={errors}
      />
    </>
  );
};

export default AddDefectContent;

{
  /* <div className="grow basis-0 overflow-y-auto items-center gap-[16px]">
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
                name:
                  defectSlider.page === 0 ? `report.${item.name}` : item.name,
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
      </div> */
}
