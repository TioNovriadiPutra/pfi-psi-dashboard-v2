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
        } else if (errorKeys.filter((key) => key === "appendixes").length > 0) {
          formSlider.changePage(3);
        }
      }
    }
  }, [isSubmitting]);

  return (
    <>
      <AddHeader
        title="Add Defect"
        onSubmit={handleSubmit((body) => {
          if (formSlider.page === 3) {
            addDefectService({
              report: {
                report_no: body.report_no,
                report_date: body.report_date,
                time_inspection: body.time_inspection,
                date_inspection: body.date_inspection,
                duration_inspection: body.duration_inspection,
                location_inspection: body.location_inspection,
                building_id: buildingId,
              },
              plans: body.plans.map((plan) => ({
                ...plan,
                building_id: buildingId,
              })),
              defects: body.defects.map((defect) => ({
                building_id: buildingId,
                observation: defect.observation,
                recommendation: defect.recommendation,
                image_elevation: defect.image_elevation,
                defect_levels: defect.defect_levels.map((level) => ({
                  ...level,
                  building_id: buildingId,
                })),
              })),
              appendixes: body.appendixes.map((appendix) => ({
                ...appendix,
                building_id: buildingId,
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
