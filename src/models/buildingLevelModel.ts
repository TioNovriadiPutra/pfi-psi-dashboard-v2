export interface BuildingLevelInput {
  level_name: string;
  primary_usage?: string | null;
  description?: string | null;
}

export interface BuildingLevelDTO {
  id: number;
  level_name: string;
  primary_usage: string | null;
  description: string | null;
  building_id: number;
}
