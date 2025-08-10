import { getDefectTypes } from "@services/defectTypeService";
import { useQuery } from "@tanstack/react-query";

export interface DefectTypeInput {
  name: string;
}

export interface DefectTypeDTO extends DefectTypeInput {
  id: number;
  created_at: string;
}

const useDefectTypeModel = () => {
  const useGetDefectTypes = () =>
    useQuery({
      queryKey: ["getDefectTypes"],
      queryFn: () => getDefectTypes(),
    });

  return {
    useGetDefectTypes,
  };
};

export default useDefectTypeModel;
