import useHelper from "@hooks/useHelper";
import type { FetchDataType } from "@interfaces/pageInterface";
import useBuildingModel, { type BuildingInput } from "@models/buildingModel";
import { paginationHandler } from "@utils/helper/responseHandler";
import moment from "moment";
import useBuildingTypeController from "./buildingTypeController";
import { useConfirmationModal } from "@stores/modalStore";
import type { DropdownType, FormType } from "@interfaces/formInterface";
import { buildingForm } from "@utils/constant/formConst";
import { BsBuildingGear } from "react-icons/bs";
import { useNavigate } from "react-router";
import { generateEncryption } from "@utils/helper/generator";

const useBuildingController = () => {
  const nav = useNavigate();

  const showConfirmationModal = useConfirmationModal(
    (state) => state.showModal
  );

  const {
    useGetBuildings,
    useGetBuildingFormDropdown,
    useGetBuildingDetail,
    useAddBuilding,
    useDeleteBuilding,
  } = useBuildingModel();

  const { getBuildingTypeEditService, deleteBuildingTypeService } =
    useBuildingTypeController();

  const { onError } = useHelper();

  const addBuildingMutation = useAddBuilding();
  const getBuildingDetailMutation = useGetBuildingDetail();
  const deleteBuildingMutation = useDeleteBuilding();

  const useGetBuildingsService = () => {
    const responses = useGetBuildings();

    const isLoading = responses.some((response) => response.isLoading);
    const isError = responses.some((response) => response.isError);
    const error = responses.find((response) => response.error !== undefined);

    let finalData: FetchDataType[] = [];

    if (!isLoading) {
      if (isError) {
        onError(error!.error!);
      } else {
        const buildingRes = responses[0].data!;
        const buildingTypeRes = responses[1].data!;

        finalData = [
          {
            pagination: paginationHandler(
              buildingRes.data.page,
              buildingRes.data.items_per_page,
              buildingRes.data.total_count
            ),
            finalData: buildingRes.data.data.map((item) => ({
              id: item.id,
              row: [
                { flex: "flex-2", type: "text", label: item.name },
                { flex: "flex-2", type: "text", label: item.address },
                {
                  flex: "flex-1",
                  type: "text",
                  label: item.year_built.toString(),
                },
                {
                  flex: "flex-1",
                  type: "text",
                  label: item.area_sq_meters.toString(),
                },
                {
                  flex: "flex-1",
                  type: "text",
                  label: item.levels_count.toString(),
                },
                {
                  flex: "flex-1",
                  type: "text",
                  label: item.sides_count.toString(),
                },
                {
                  flex: "flex-1",
                  type: "text",
                  label: item.status_construction?.toString() ?? "-",
                },
                {
                  flex: "flex-1",
                  type: "text",
                  label: item.construction_start_date
                    ? moment(
                        item.construction_start_date.replace("Z", "")
                      ).format("ddd, DD MMM YYYY")
                    : "-",
                },
                {
                  flex: "flex-1",
                  type: "text",
                  label: item.construction_end_date
                    ? moment(
                        item.construction_end_date.replace("Z", "")
                      ).format("ddd, DD MMM YYYY")
                    : "-",
                },
              ],
              functions: [
                {
                  type: "custom",
                  icon: BsBuildingGear,
                  label: "Defect",
                  onClick: () =>
                    nav(
                      `/building/defect-form?form=${encodeURIComponent(
                        generateEncryption(item.id.toString())
                      )}`
                    ),
                },
                {
                  type: "detail",
                  onClick: () => getBuildingDetailMutation.mutate(item.id),
                },
                {
                  type: "edit",
                  onClick: () => console.log("Edit"),
                },
                {
                  type: "delete",
                  onClick: () =>
                    showConfirmationModal({
                      title: "Delete Building",
                      description: `Are you sure you want to delete |"${item.name}"| building? This action cannot be undo!`,
                      onConfirm: () => deleteBuildingMutation.mutate(item.name),
                    }),
                },
              ],
            })),
          },
          {
            pagination: paginationHandler(
              buildingTypeRes.data.page,
              buildingTypeRes.data.items_per_page,
              buildingTypeRes.data.total_count
            ),
            finalData: buildingTypeRes.data.data.map((item) => ({
              id: item.id,
              row: [
                { flex: "flex-2", type: "text", label: item.name },
                {
                  flex: "flex-2",
                  type: "text",
                  label: item.description ?? "-",
                },
              ],
              functions: [
                {
                  type: "edit",
                  onClick: () => getBuildingTypeEditService(item.name),
                },
                {
                  type: "delete",
                  onClick: () =>
                    showConfirmationModal({
                      title: "Delete Building Type",
                      description: `Are you sure you want to delete |"${item.name}"| type? This action cannot be undo!`,
                      onConfirm: () => deleteBuildingTypeService(item.name),
                    }),
                },
              ],
            })),
          },
        ];
      }
    }

    return {
      finalData,
      isLoading,
    };
  };

  const useGetBuildingFormDropdownService = () => {
    const responses = useGetBuildingFormDropdown();

    const isLoading = responses.some((response) => response.isLoading);
    const isError = responses.some((response) => response.isError);
    const error = responses.find((response) => response.error !== undefined);

    let formData: FormType<BuildingInput> = {
      ...buildingForm,
    };

    if (!isLoading) {
      if (isError) {
        onError(error!.error!);
      } else {
        formData = {
          ...buildingForm,
          inputs: buildingForm.inputs.map((input1) =>
            input1.map((input2) =>
              input2.map((input3) => ({
                ...input3,
                tabData: input3.tabData!.map((input4) => {
                  if (input4.title === "Detail") {
                    return {
                      ...input4,
                      inputs: input4.inputs.map((input5) =>
                        input5.map((input6) => {
                          if (input6.name === "building_type") {
                            return {
                              ...input6,
                              items: responses[0].data!.data.data.map(
                                (item) =>
                                  ({
                                    label: item.name,
                                    value: item.id,
                                  } as DropdownType)
                              ),
                            };
                          } else if (input6.name === "project_id") {
                            return {
                              ...input6,
                              items: responses[1].data!.data.data.map(
                                (item) =>
                                  ({
                                    label: item.name,
                                    value: item.id,
                                  } as DropdownType)
                              ),
                            };
                          }

                          return input6;
                        })
                      ),
                    };
                  }

                  return input4;
                }),
              }))
            )
          ),
        };
      }
    }

    return {
      formData,
      isLoading,
    };
  };

  return {
    useGetBuildingsService,
    useGetBuildingFormDropdownService,
    addBuildingService: (body: any) => addBuildingMutation.mutate(body),
  };
};

export default useBuildingController;
