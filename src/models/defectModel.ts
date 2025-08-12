import type { DropdownType } from "@interfaces/formInterface";
import { getBuildingDetail } from "@services/buildingService";
import { useMutation, useQueries } from "@tanstack/react-query";
import type { ReportInput } from "./reportModel";
import { getDefectTypes } from "@services/defectTypeService";
import { addDefect } from "@services/defectService";
import useHelper from "@hooks/useHelper";

export interface DefectDataInput {
  name: string;
  observation: string;
  couse: string;
  recommendation: string;
  timeframe: string;
  remedial: string;
  image_elevation: string;
  image_detail: string;
  defect_type_id: DropdownType | null;
}

export interface DefectReqInput extends DefectDataInput {
  building_id: number;
  location: string;
}

export interface DefectInput {
  defects: DefectDataInput[];
  report: ReportInput;
}

export interface DefectDTO {
  id: number;
  building_id: number;
  observation: string;
  couse: string;
  recommendation: string;
  timeframe: string;
  remedial: string;
  image_elevation: string;
  image_detail: string;
  defect_type_id: DropdownType | null;
}

const useDefectModel = () => {
  const { nav, onMutate, onSettled, onError, onSuccess } = useHelper();

  const useGetDefectForm = (id: number) =>
    useQueries({
      queries: [
        {
          queryKey: ["getDefectForm"],
          queryFn: () => getBuildingDetail(id),
        },
        {
          queryKey: ["getDefectDropdown"],
          queryFn: () => getDefectTypes(),
        },
      ],
    });

  const useAddDefect = () =>
    useMutation({
      mutationKey: ["addDefect"],
      mutationFn: (body: DefectReqInput[]) => addDefect(body),
      onMutate: () => onMutate("button"),
      onSettled: () => onSettled("button"),
      onError,
      onSuccess: (res) => {
        nav("/building");
        onSuccess(res.message);
      },
    });

  return {
    useGetDefectForm,
    useAddDefect,
  };
};

export default useDefectModel;
