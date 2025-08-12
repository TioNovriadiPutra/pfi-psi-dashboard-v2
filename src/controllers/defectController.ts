import useHelper from "@hooks/useHelper";
import type { FormType } from "@interfaces/formInterface";
import useDefectModel, { type DefectInput } from "@models/defectModel";
import { defectForm } from "@utils/constant/formConst";

const useDefectController = () => {
  const { useGetDefectForm, useAddDefect } = useDefectModel();

  const { onError } = useHelper();

  const addDefectMutation = useAddDefect();

  const useGetDefectFormService = (id: number) => {
    const responses = useGetDefectForm(id);

    const isLoading = responses.some((res) => res.isLoading);
    const isError = responses.some((res) => res.isError);
    const error = responses.find((res) => res.error !== undefined);

    let finalData: { form: FormType<DefectInput>; data: { title: string }[] } =
      {
        form: {
          ...defectForm,
        },
        data: [],
      };

    if (!isLoading) {
      if (isError) {
        onError(error!.error!);
      } else {
        finalData = {
          form: {
            ...defectForm,
            inputs: defectForm.inputs.map((input) =>
              input.map((input2) => ({
                ...input2,
                tabData: input2.tabData!.map((input3) => {
                  if (input3.title === "Defect") {
                    return {
                      ...input3,
                      inputs: input3.inputs.map((input4) => {
                        if (input4.name === "defect_type_id") {
                          return {
                            ...input4,
                            items: responses[1].data!.data.data.map((res) => ({
                              label: res.name,
                              value: res.id,
                            })),
                          };
                        }

                        return input4;
                      }),
                    };
                  }

                  return input3;
                }),
              }))
            ),
            defaultValues: {
              defects: responses[0].data!.data.elevations.map(() => ({
                name: "",
                image_elevation: "",
                image_detail: "",
                observation: "",
                couse: "",
                recommendation: "",
                timeframe: "",
                remedial: "",
                defect_type_id: null,
              })),
              report: {
                report_no: "",
                report_date: "",
                time_inspection: "",
                date_inspection: "",
                duration_inspection: "",
                location_inspection: "",
                methodology_inspection: "",
                name_providers: "",
                facade_inspector: "",
                description: "",
                highlight: "",
              },
            },
          },
          data: responses[0].data!.data.elevations.map((elevation) => ({
            title: elevation.name,
          })),
        };
      }
    }

    return {
      finalData,
      isLoading,
    };
  };

  return {
    useGetDefectFormService,
    addDefectService: (body: any) => addDefectMutation.mutate(body),
  };
};

export default useDefectController;
