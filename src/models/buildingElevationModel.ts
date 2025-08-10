export interface BuildingElevationInput {
  name: string;
  description?: string;
  orientation_degrees: string;
}

export interface BuildingElevationDTO {
  id: number;
  name: string;
  description: string | null;
  orientation_degrees: number;
  created_at: string;
}
