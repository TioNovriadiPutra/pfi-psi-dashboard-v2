import useHelper from "@hooks/useHelper";
import type { FormType, InputType } from "@interfaces/formInterface";
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
              input.map(
                (input2) =>
                  ({
                    ...input2,
                    tabData: input2.tabData!.map((input3) => {
                      if (input3.title === "Defect") {
                        return {
                          ...input3,
                          inputs: input3.inputs.map((input4) => {
                            if (input4.name === "defect_type_id") {
                              return {
                                ...input4,
                                items: responses[1].data!.data.data.map(
                                  (res) => ({
                                    label: res.name,
                                    value: res.id,
                                  })
                                ),
                              };
                            } else if (input4.name === "defect_levels") {
                              return {
                                ...input4,
                                cartData: {
                                  ...input4.cartData,
                                  inputs: input4.cartData!.inputs.map(
                                    (input5) => {
                                      if (input5.name === "level_id") {
                                        return {
                                          ...input5,
                                          items:
                                            responses[2].data!.data.data.map(
                                              (res) => ({
                                                label: res.level_name,
                                                value: res.id,
                                              })
                                            ),
                                        };
                                      }

                                      return input5;
                                    }
                                  ),
                                },
                              };
                            }

                            return input4;
                          }),
                        };
                      }

                      return input3;
                    }),
                  } as InputType)
              )
            ),
            defaultValues: {
              ...defectForm.defaultValues,
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
                defect_levels: [],
              })),
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
