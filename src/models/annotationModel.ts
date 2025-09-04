import useHelper from "@hooks/useHelper";
import type { DropdownType } from "@interfaces/formInterface";
import { getAnnotations } from "@services/annotationService";
import { useQuery } from "@tanstack/react-query";

export interface AnnotationData {
  type: "square" | "text" | "line";
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
}

export interface AnnotationInput {
  projectName: string;
  image: string;
  category?: DropdownType;
  description?: string;
  annotations: AnnotationData[];
}

export interface AnnotationDTO extends Omit<AnnotationInput, "category"> {
  id: number;
  category: string;
  created_at: string;
}

const useAnnotationModel = () => {
  const { pagination } = useHelper();

  const useGetAnnotations = () =>
    useQuery({
      queryKey: ["getAnnotations", pagination.page],
      queryFn: () => getAnnotations(pagination.page, pagination.items_per_page),
    });

  return {
    useGetAnnotations,
  };
};

export default useAnnotationModel;
