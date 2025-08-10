import useHelper from "@hooks/useHelper";
import {
  addBuildingType,
  deleteBuildingType,
  getBuildingTypeDetail,
  updateBuildingType,
} from "@services/buildingTypeService";
import { useConfirmationModal } from "@stores/modalStore";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@utils/config/client";
import { generateEncryption } from "@utils/helper/generator";

export interface BuildingTypeInput {
  name: string;
  description?: string;
}

export interface BuildingTypeDTO {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}

const useBuildingTypeModel = () => {
  const hideConfirmationModal = useConfirmationModal(
    (state) => state.hideModal
  );

  const { nav, onMutate, onSettled, onError, onSuccess } = useHelper();

  const useAddBuildingType = () =>
    useMutation({
      mutationKey: ["addBuildingType"],
      mutationFn: (body: BuildingTypeInput) => addBuildingType(body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/building");
        queryClient.invalidateQueries({ queryKey: ["getBuildingTypes"] });
        onSuccess(res.message);
      },
    });

  const useGetBuildingTypeEdit = () =>
    useMutation({
      mutationKey: ["getBuildingTypeEdit"],
      mutationFn: (name: string) => getBuildingTypeDetail(name),
      onMutate: () => onMutate("modal"),
      onSettled: () => onSettled("modal"),
      onError,
      onSuccess: (res) => {
        const defaultValues: BuildingTypeInput = {
          name: res.data.name,
          description: res.data.description ?? "",
        };

        nav(
          `/building/type-form?data=${encodeURIComponent(
            generateEncryption(JSON.stringify(defaultValues))
          )}`
        );
      },
    });

  const useUpdateBuildingType = () =>
    useMutation({
      mutationKey: ["updateBuildingType"],
      mutationFn: (data: { name: string; body: BuildingTypeInput }) =>
        updateBuildingType(data.name, data.body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/building");
        queryClient.invalidateQueries({ queryKey: ["getBuildingTypes"] });
        onSuccess(res.message);
      },
    });

  const useDeleteBuildingType = () =>
    useMutation({
      mutationKey: ["deleteBuildingType"],
      mutationFn: (name: string) => deleteBuildingType(name),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (err) => {
        hideConfirmationModal();
        onError(err);
      },
      onSuccess: (res) => {
        hideConfirmationModal();
        queryClient.invalidateQueries({ queryKey: ["getBuildingTypes"] });
        onSuccess(res.message);
      },
    });

  return {
    useAddBuildingType,
    useGetBuildingTypeEdit,
    useUpdateBuildingType,
    useDeleteBuildingType,
  };
};

export default useBuildingTypeModel;
