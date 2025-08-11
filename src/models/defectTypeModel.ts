import useHelper from "@hooks/useHelper";
import {
  addDefectType,
  deleteDefectType,
  getDefectTypeDetail,
  getDefectTypes,
  updateDefectType,
} from "@services/defectTypeService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@utils/config/client";
import { generateEncryption } from "@utils/helper/generator";

export interface DefectTypeInput {
  name: string;
}

export interface DefectTypeDTO extends DefectTypeInput {
  id: number;
  created_at: string;
}

const useDefectTypeModel = () => {
  const { confirmationModal, nav, onMutate, onSettled, onError, onSuccess } =
    useHelper();

  const useGetDefectTypes = () =>
    useQuery({
      queryKey: ["getDefectTypes"],
      queryFn: () => getDefectTypes(),
    });

  const useAddDefectType = () =>
    useMutation({
      mutationKey: ["addDefectType"],
      mutationFn: (body: DefectTypeInput) => addDefectType(body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/master");
        queryClient.invalidateQueries({ queryKey: ["getDefectTypes"] });
        onSuccess(res.message);
      },
    });

  const useGetDefectTypeEdit = () =>
    useMutation({
      mutationKey: ["getDefectTypeEdit"],
      mutationFn: (name: string) => getDefectTypeDetail(name),
      onMutate: () => onMutate("modal"),
      onSettled: () => onSettled("modal"),
      onError,
      onSuccess: (res) => {
        const defaultValues: DefectTypeInput = {
          name: res.data.name,
        };

        nav(
          `/master/defect-form?data=${encodeURIComponent(
            generateEncryption(JSON.stringify(defaultValues))
          )}`
        );
      },
    });

  const useUpdateDefectType = () =>
    useMutation({
      mutationKey: ["updateDefectType"],
      mutationFn: (data: { name: string; body: DefectTypeInput }) =>
        updateDefectType(data.name, data.body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/master");
        queryClient.invalidateQueries({ queryKey: ["getDefectTypes"] });
        onSuccess(res.message);
      },
    });

  const useDeleteDefectType = () =>
    useMutation({
      mutationKey: ["deleteDefectType"],
      mutationFn: (name: string) => deleteDefectType(name),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError: (err) => {
        confirmationModal.hideModal();
        onError(err);
      },
      onSuccess: (res) => {
        confirmationModal.hideModal();
        queryClient.invalidateQueries({ queryKey: ["deleteDefectType"] });
        onSuccess(res.message);
      },
    });

  return {
    useGetDefectTypes,
    useAddDefectType,
    useGetDefectTypeEdit,
    useUpdateDefectType,
    useDeleteDefectType,
  };
};

export default useDefectTypeModel;
