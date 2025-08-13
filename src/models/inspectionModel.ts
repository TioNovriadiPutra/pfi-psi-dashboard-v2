import { useMutation } from "@tanstack/react-query";

export interface InspectionInput {
  building_id: number;
  report_id: number;
  photograph: string;
  observation: string;
  nature_of_defect: string;
  recommendation: string;
  description: string;
  image_elevation?: string;
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
