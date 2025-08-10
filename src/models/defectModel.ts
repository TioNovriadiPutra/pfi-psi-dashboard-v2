import useHelper from "@hooks/useHelper";
import type { DropdownType } from "@interfaces/formInterface";
import { getBuildingDetail } from "@services/buildingService";
import { useMutation } from "@tanstack/react-query";
import { generateEncryption } from "@utils/helper/generator";
import { useNavigate } from "react-router";
import type { ReportInput } from "./reportModel";

export interface DefectDataInput {
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
  const nav = useNavigate();

  const { onMutate, onSettled, onError } = useHelper();

  const useGetDefectForm = () =>
    useMutation({
      mutationKey: ["getDefectForm"],
      mutationFn: (id: number) => getBuildingDetail(id),
      onMutate: () => onMutate("modal"),
      onSettled: () => onSettled("modal"),
      onError,
      onSuccess: (res) => {
        nav(
          `/building/defect-form?form=${encodeURIComponent(
            generateEncryption(
              JSON.stringify({
                defects: res.data.elevations.map((elevation) => ({
                  title: elevation.name,
                })),
              })
            )
          )}`
        );
      },
    });

  return {
    useGetDefectForm,
  };
};

export default useDefectModel;
