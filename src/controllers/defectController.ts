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

    let formData: FormType<DefectInput> = {
      ...defectForm,
    };

    if (!isLoading) {
      if (isError) {
        onError(error!.error!);
      } else {
        formData = {
          ...defectForm,
          inputs: defectForm.inputs.map((input) =>
            input.map((input2) =>
              input2.map(
                (input25) =>
                  ({
                    ...input25,
                    tabData: input25.tabData!.map((input3) => {
                      if (input3.title === "Defect") {
                        return {
                          ...input3,
                          inputs: input3.inputs.map((input4) =>
                            input4.map((input45) => ({
                              ...input45,
                              cartData: {
                                ...input45.cartData!,
                                labels: responses[0].data!.data.elevations.map(
                                  (elevation) => elevation.name
                                ),
                                inputs: input45.cartData!.inputs.map(
                                  (input5) => {
                                    if (input5.name === "defect_type_id") {
                                      return {
                                        ...input5,
                                        items: responses[1].data!.data.data.map(
                                          (res) => ({
                                            label: res.name,
                                            value: res.id,
                                          })
                                        ),
                                      };
                                    } else if (
                                      input5.name === "defect_levels"
                                    ) {
                                      return {
                                        ...input5,
                                        cartData: {
                                          ...input5.cartData,
                                          inputs: input5.cartData!.inputs.map(
                                            (input6) => {
                                              if (input6.name === "level_id") {
                                                return {
                                                  ...input6,
                                                  items:
                                                    responses[2].data!.data.data.map(
                                                      (res) => ({
                                                        label: res.level_name,
                                                        value: res.id,
                                                      })
                                                    ),
                                                };
                                              }

                                              return input6;
                                            }
                                          ),
                                        },
                                      };
                                    }

                                    return input5;
                                  }
                                ),
                              },
                            }))
                          ),
                        };
                      }

                      return input3;
                    }),
                  } as InputType)
              )
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
        };
      }
    }

    return {
      formData,
      isLoading,
    };
  };

  return {
    useGetDefectFormService,
    addDefectService: (body: any) => addDefectMutation.mutate(body),
  };
};

export default useDefectController;
