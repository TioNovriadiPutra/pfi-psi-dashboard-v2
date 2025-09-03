import type { DropdownType } from "@interfaces/formInterface";

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

const useAnnotationModel = () => {};

export default useAnnotationModel;
