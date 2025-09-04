import type { DropdownType } from "@interfaces/formInterface";
import { useMutation } from "@tanstack/react-query";

export interface InspectionInput {
  level_start?: DropdownType;
  level_end?: DropdownType;
  building_id: number;
  report_id: number;
  observation: DropdownType;
  nature_of_defect: DropdownType;
  recommendation: DropdownType;
  description: string;
  image_defect?: string;
}

export interface InspectionDTO {
  id: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  is_deleted: boolean;
}

const useInspectionModel = () => {
  const useAddInspection = () =>
    useMutation({
      mutationKey: ["addInspection"],
    });

  return {
    useAddInspection,
  };
};

export default useInspectionModel;
